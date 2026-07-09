import React from 'react';
import { appointmentStore } from '../stores/AppointmentStore';
import { observer } from 'mobx-react-lite';
import AppointmentCard from '../components/AppointmentCard';
import { useEffect } from 'react';
const PatientPage = ({ patientId }) => {
    useEffect(() => {
        appointmentStore.fetchPatientAppointments(patientId); // Replace "101" with the actual patient ID
    }, [patientId]);
    return (
        <div className = "patient-page-container">
            <div>
                <h1>Patient Page</h1>{/*will be changed to patient component with patient info*/}
            </div>
            {appointmentStore.loading ? (
                <div className = "loading-spinner">Loading...</div>
            ) : (
                <div className="appointments-list">
                    {appointmentStore.appointments.length === 0 ? (
                        <p>No appointments found.</p>
                    ) : (
                        appointmentStore.appointments.map((appointment) => (
                            <AppointmentCard 
                                key={appointment.appointmentId} 
                                appointment={appointment} 
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
export default observer(PatientPage);