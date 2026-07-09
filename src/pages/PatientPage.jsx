import React from 'react';
import { appointmentStore } from '../stores/AppointmentStore';
import { observer } from 'mobx-react-lite';
import AppointmentCard from '../components/AppointmentCard';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Title, Stack, Loader, Center, Text, Paper } from '@mantine/core';
const PatientPage = () => {
    const { patientId } = useParams();
    useEffect(() => {
        appointmentStore.fetchPatientAppointments(patientId); 
    }, [patientId]);
    return (
        <Container size="sm" py="xl">
            {/* Header Section */}
            <Paper p="md" mb="lg" radius="md" bg="blue.0">
                <Title order={1} size="h2" c="blue.9">
                    Patient Dashboard
                </Title>
                <Text size="sm" c="blue.7" mt={4}>
                    View and manage your upcoming schedule
                </Text>
            </Paper>

            {/* Read the global loading state directly from MobX */}
            {appointmentStore.loading ? (
                <Center py="xl">
                    <Stack align="center" gap="xs">
                        <Loader size="lg" type="dots" />
                        <Text c="dimmed" size="sm">Loading your appointments...</Text>
                    </Stack>
                </Center>
            ) : (
                <Stack gap="md">
                    {appointmentStore.appointments.length === 0 ? (
                        <Paper withBorder p="xl" radius="md" style={{ textAlign: 'center' }}>
                            <Text c="dimmed">No upcoming appointments found.</Text>
                        </Paper>
                    ) : (
                        appointmentStore.appointments.map((appointment) => (
                            <AppointmentCard 
                                key={appointment.appointment_id} 
                                appointment={appointment} 
                            />
                        ))
                    )}
                </Stack>
            )}
        </Container>
    );
}
export default observer(PatientPage);