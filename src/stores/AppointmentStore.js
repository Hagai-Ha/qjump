import { makeAutoObservable, runInAction} from "mobx";
import { supabase } from "../data/supabaseClient";

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
    async submitPostponeRequest(startDate, endDate) {
        if (!this.selectedAppointmentForPostpone) return;

        runInAction(() => {
            this.loading = true;
        });

        try {
            const appointment = this.selectedAppointmentForPostpone;

            const { error } = await supabase
                .from('postpone_requests')
                .insert([
                    {
                        appointment_id: appointment.appointment_id,
                        start_date: startDate,
                        end_date: endDate,
                        locations: appointment.location,
                        user_id: appointment.user_id,
                    }
                ]);

            if (error) throw error;

            alert("Postpone request submitted successfully!");
            
            // Close the modal upon success
            runInAction(() => {
                this.closePostponeModal();
            });
        } catch (err) {
            console.error("Error inserting postpone request:", err);
            alert("Failed to submit postpone request.");
        } finally {
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}
export const appointmentStore = new AppointmentStore();