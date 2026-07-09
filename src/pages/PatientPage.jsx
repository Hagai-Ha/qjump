import appointments from './dummyAppointments.json' //will be changed to a fetch request to the backend to get the patient appointments
export default function PatientPage() {
    return (
        <>
            <div>
                <h1>Patient Page</h1>{/*will be changed to patient component with patient info*/}
            </div>
            <div className="appointments-list">
                {/* list with the patiant appointments*/}
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment.appointmentId}>
                            {appointment.doctorName} - {appointment.appointmentDate} at {appointment.appointmentTime} located in{appointment.appointmentLocation}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}