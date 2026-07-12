import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Button, Group, Stack, TextInput, Text } from '@mantine/core';
import { appointmentStore } from '../stores/AppointmentStore';

const PostponeModal = () => {
    const appointment = appointmentStore.selectedAppointmentForPostpone;

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [error, setError] = useState('');

    if (!appointment) return null;
    const handleStartDateChange = (e) => {
        const value = e.target.value;
        setStartDate(value);
        setError(''); // Clear errors when user corrects inputs
        // Extra functionality: If a start date is chosen and it's after the end date, clear invalid end date so there wouldnt be an error
        if (endDate && new Date(value) >= new Date(endDate)) {
            setEndDate('');
        }
    };

    const handleEndDateChange = (e) => {
        const value = e.target.value;
        setEndDate(value);
        setError('');
        // Extra functionality: If a end date is chosen and it's before the start date, clear invalid start date so there wouldnt be an error
        if (startDate && new Date(value) <= new Date(startDate)) {
            setStartDate('');
        }
    };

    const handleValidation = async (e) => {
        e.preventDefault();
        setError('');

        if (!startDate || !endDate) {
            setError('Please fill in both fields.');
            return;
        }

        const appointmentDate = new Date(appointment.date);
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start < appointmentDate) {
            setError('Start date cannot be earlier than the current appointment date.');
            return;
        }
        if (end < appointmentDate) {
            setError('Last date must be strictly after the appointment date.');
            return;
        }
        if (start >= end) {
            setError('Start date must be before the final date.');
            return;
        }

       await appointmentStore.submitPostponeRequest(startDate, endDate);
    };

    return (
        <Modal
            opened={!!appointment}
            onClose={() => appointmentStore.closePostponeModal()}
            title={`Postpone Appointment #${appointment.appointment_id}`}
            centered
        >
            <form onSubmit={handleValidation}>
                <Stack gap="md">
                    <Text size="sm" c="dimmed">
                        Original Date: <strong>{appointment.date}</strong>
                    </Text>

                    <TextInput
                        label="Postpone From (Start Date)"
                        type="date"
                        min={appointment.date}
                        value={startDate}
                        onChange={handleStartDateChange} // Clean function reference
                        required
                    />

                    <TextInput
                        label="Postpone Until (Last Date)"
                        type="date"
                        // Smarter functionality: min date is dynamically restricted by the chosen startDate
                        min={startDate || appointment.date} 
                        value={endDate}
                        onChange={handleEndDateChange} // Clean function reference
                        required
                    />

                    {error && (
                        <Text c="red" size="sm" fw={500}>
                            ⚠️ {error}
                        </Text>
                    )}

                    <Group justify="flex-end" mt="md">
                        <Button variant="subtle" color="gray" onClick={() => appointmentStore.closePostponeModal()}>
                            Cancel
                        </Button>
                        <Button type="submit" color="blue">
                            Check Dates
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
};

export default observer(PostponeModal);