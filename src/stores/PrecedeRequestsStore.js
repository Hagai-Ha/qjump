import { makeAutoObservable, runInAction} from "mobx";
import { supabase } from "../data/supabaseClient";

class PrecedeRequestsStore {
    requests = [];
    loading = false;
    
    constructor() {
        makeAutoObservable(this);
    }
    
    async fetchPatientRequests(patient_id) {
        runInAction(() => {
            this.loading = true;
        });
        try{
            const parsedPatientId = parseInt(patient_id, 10);
            const { data, error } = await supabase
                .from('precede_requests')
                .select('*')
                .eq('patient_id', parsedPatientId);
            
            if(error) throw error;
            runInAction(() => {
                this.requests = data || [];
            });
        }catch(err){
            console.error("Error fetching precede requests:", err);
        }finally{
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    async deletePatientRequest(request_id) {
        try {
            // 1. Delete from the Supabase table
            const { error } = await supabase
                .from('precede_requests')
                .delete()
                .eq('request_id', request_id);

            if (error) throw error;

            // 2. Remove from the local MobX state so the card instantly vanishes from the screen
            runInAction(() => {
                this.requests = this.requests.filter(req => req.request_id !== request_id);
            });
            
            console.log(`Successfully deleted precede request #${request_id}`);
        } catch (err) {
            console.error("Error deleting precede request:", err);
        }
    }
    
}
export const precedeRequestsStore = new PrecedeRequestsStore();