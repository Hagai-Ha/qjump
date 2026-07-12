import { makeAutoObservable, runInAction} from "mobx";
import { supabase } from "../data/supabaseClient"; // Uncomment this when your supabaseClient file is ready!

class AppointmentStore {
    appointments = [];
    loading = false;
    selectedAppointmentForPostpone = null;
    selectedAppointmentForPrecede = null;
    constructor() {
        makeAutoObservable(this);
    }
    openPostponeModal(appointment) {
        this.selectedAppointmentForPostpone = appointment;
    }
    closePostponeModal() {
        this.selectedAppointmentForPostpone = null;
    }
    openPrecedeModal(appointment) {
        this.selectedAppointmentForPrecede = appointment;
    }
    closePrecedeModal() {
        this.selectedAppointmentForPrecede = null;
    }
    async fetchPatientAppointments(patient_id) {
        runInAction(() => {
            this.loading = true;
        });
        try{
            const parsedPatientId = parseInt(patient_id, 10);
            const { data, error } = await supabase
                .from('appointments')
                .select('*')
                .eq('patient_id', parsedPatientId);
            
            if(error) throw error;
            runInAction(() => {
                this.appointments = data || [];
            });
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