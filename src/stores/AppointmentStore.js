import { makeAutoObservable } from "mobx";
import  dummyAppointments  from "../pages/dummyAppointments";
// import { supabase } from "../supabaseClient"; // Uncomment this when your supabaseClient file is ready!

class AppointmentStore {
    appointments = [];
    loading = false;
    constructor() {
        makeAutoObservable(this);
    }
    async fetchPatientAppointments(patientId) {
        this.loading = true;
        try{
            //start with a set timout function that will be removed when the API is ready
            await new Promise((resolve) => setTimeout(resolve, 500));
            this.appointments = dummyAppointments.filter(
                (app) => app.patientId === patientId
            );
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
            this.loading = false;
        }
    }

    
}
export const appointmentStore = new AppointmentStore();