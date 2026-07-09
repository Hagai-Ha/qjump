import { observer, inject } from 'mobx-react'
import {Component} from 'react'
class AppointmentCard extends Component {
    render() {
        const { appointment } = this.props;
        return (
            <div className="appointment-card">
                <h3>{appointment.doctorName}</h3>
                <p>Date: {appointment.appointmentDate}</p>
                <p>Time: {appointment.appointmentTime}</p>
                <p>Location: {appointment.appointmentLocation}</p>
            </div>
        );
    }
}
export default observer(AppointmentCard);