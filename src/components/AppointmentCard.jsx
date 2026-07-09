import { observer, inject } from 'mobx-react'
import {Component} from 'react'
import { Card, Text, Button, Group, Stack, Badge } from '@mantine/core';
class AppointmentCard extends Component {
    render() {
        const { appointment } = this.props;
        return (
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
                <Group justify="space-between" align="flex-start" wrap="nowrap">
                    {/* Appointment Details Section */}
                    <Stack gap="xs">
                        <Group gap="xs">
                            <Text fw={700} size="lg" c="blue.9">
                                Appointment Id : {appointment.appointment_id}
                            </Text>
                            <Badge color="blue" variant="light">
                                Confirmed
                            </Badge>
                        </Group>

                        <Text size="sm" c="dimmed">
                            <strong>Date:</strong> {appointment.date}
                        </Text>
                        <Text size="sm" c="dimmed">
                            <strong>Time:</strong> {appointment.time}
                        </Text>
                        <Text size="sm" c="dimmed">
                            <strong>Location:</strong> {appointment.location}
                        </Text>
                    </Stack>

                    {/* Action Buttons Section */}
                    <Stack gap="xs" style={{ minWidth: '160px' }}>
                        <Button 
                            variant="light" 
                            color="blue" 
                            fullWidth
                        >
                            ⏰ Precede (Earlier)
                        </Button>
                        <Button 
                            variant="light" 
                            color="gray" 
                            fullWidth
                        >
                            ⏳ Postpone (Later)
                        </Button>
                    </Stack>
                </Group>
            </Card>
        );
    }
}
export default observer(AppointmentCard);