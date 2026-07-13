import { observer, inject } from 'mobx-react'
import {Component} from 'react'
import {appointmentStore} from '../stores/AppointmentStore'
import { Card, Text, Button, Group, Stack, Badge, Flex} from '@mantine/core';
class AppointmentCard extends Component {
    render() {
        //add date with slashes and revert it to be dd/mm/yyyy
        const dateWithSlash = this.props.appointment.date.replace(/-/g, '/');
        const [year, month, day] = dateWithSlash.split('/');
        //add a calander emoji
        const formattedDate = `📅 ${day}/${month}/${year}`
        const timeWithoutSeconds = this.props.appointment.time.split(':').slice(0, 2).join(':');
        //add a clock emoji to the time
        const formattedTime = `⏰ ${timeWithoutSeconds}`;
        const { appointment } = this.props;
        return (
            <Card shadow="sm" padding="lg" radius="md" withBorder style={{ width: '100%' }}>
                <Flex
                    direction={{ base: 'column', sm: 'row' }}
                    justify="space-between"
                    align={{ base: 'stretch', sm: 'flex-start' }}
                    gap="md"
                >
                    <Stack gap="xs">
                        <Group gap="xs">
                            <Text fw={700} size="lg" c="Black">
                                Clinic: {appointment.clinician}
                            </Text>
                            <Badge color="blue" variant="light">
                                Confirmed
                            </Badge>
                        </Group>

                        <Text size="sm" c="Black">
                            <strong>Date:</strong> {formattedDate}
                        </Text>
                        <Text size="sm" c="Black">
                            <strong>Time:</strong> {formattedTime}
                        </Text>
                        <Text size="sm" c="Black">
                            <strong>Location:</strong> {`📍 ${appointment.location}`}
                        </Text>
                    </Stack>

                    {/* Action Buttons Section */}
                    <Flex 
                        direction={{ base: 'row', sm: 'column' }} 
                        gap="xs" 
                        style={{ minWidth: '160px' }}
                    >
                        <Button 
                            variant="light" 
                            color="blue" 
                            fullWidth
                            onClick={() => {appointmentStore.openPrecedeModal(appointment)}}
                        >
                            ⏰ Precede (Earlier)
                        </Button>
                        <Button 
                            variant="light" 
                            color="gray" 
                            fullWidth
                            onClick={() => {appointmentStore.openPostponeModal(appointment)}}
                        >
                            ⏳ Postpone (Later)
                        </Button>
                    </Flex>
                </Flex>
            </Card>
        );
    }
}
export default observer(AppointmentCard);