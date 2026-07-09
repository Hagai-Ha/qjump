import { makeAutoObservable, runInAction} from "mobx";
import  dummyAppointments  from "../pages/dummyAppointments";
// import { supabase } from "../supabaseClient"; // Uncomment this when your supabaseClient file is ready!

class AppointmentStore {
    appointments = [];
    loading = false;
    constructor() {
        makeAutoObservable(this);
    }
    async fetchPatientAppointments(patientId) {
        runInAction(() => {
            this.loading = true;
        });
        try{
            //start with a set timout function that will be removed when the API is ready
            await new Promise((resolve) => setTimeout(resolve, 500));
            runInAction(() => {
                this.appointments = dummyAppointments.filter(
                    (appointment) => appointment.patientId === patientId
                );
            });
            // --- LATER: Replace with your real Supabase call ---
            /*
            const { data, error } = await supabase
                .from('appointments')
                .select('*')
                .eq('patient_id', patientId);
            if (data) this.appointments = data;
            */
        }catch(err){
            console.error("Error fetching appointments:", err);
        }finally{
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    
}
export const appointmentStore = new AppointmentStore();