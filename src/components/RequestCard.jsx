import { observer, inject } from 'mobx-react'
import {Component} from 'react'
import {postponeRequestsStore} from '../stores/PostponeRequestsStore'
import { precedeRequestsStore } from '../stores/PrecedeRequestsStore';
import { Card, Text, Button, Group, Stack, Badge, Flex} from '@mantine/core';
class RequestCard extends Component {
    render() {

        const formatDate = (rawDate) => {
            if (!rawDate) return 'N/A';
            const [year, month, day] = rawDate.split('-');
            return `${day}/${month}/${year}`;
        };

        const formatSubmittedAt = (isoString) => {
            if (!isoString) return 'N/A';
            const [datePart, timePart] = isoString.split('T');
            const [year, month, day] = datePart.split('-');
            const timeWithoutSeconds = timePart.slice(0, 5);
            return `${day}/${month}/${year} at ${timeWithoutSeconds}`;
        };


        const { request, type } = this.props;

        // Determine which store action to call based on the 'type' prop
        const handleDelete = () => {
            if (type === 'precede') {
                precedeRequestsStore.deletePatientRequest(request.request_id);
            } else {
                postponeRequestsStore.deletePatientRequest(request.request_id);
            }
        };

        const formattedStartDate = formatDate(request.start_date);
        const formattedEndDate = formatDate(request.end_date);
        const submittedAt = formatSubmittedAt(request.created_at);

        const statusConfig = {
            [0]:  { color: 'orange', text: 'Pending' },
            [-1]: { color: 'gray',   text: 'Unfulfilled' },
            [1]:  { color: 'green',  text: 'Fulfilled' }
        };
        // Get the current badge configuration, or fallback to orange/Pending if missing
        const currentStatus = statusConfig[request.status] || { color: 'orange', text: 'Pending' };

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
                                Request ID: #{request.request_id}
                            </Text>
                            <Badge color={currentStatus.color} variant="light">
                                {currentStatus.text}
                            </Badge>
                        </Group>

                        <Text size="sm" c="gray.7">
                            <strong>Reference Appointment ID:</strong> {request.appointment_id}
                        </Text>

                        <Text size="sm" c="black">
                            <strong>📅 Requested Window:</strong> {formattedStartDate} – {formattedEndDate}
                        </Text>

                        <Text size="xs" c="dimmed" mt={4}>
                            Submitted on: {submittedAt}
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
                            color="red" 
                            fullWidth
                            onClick={handleDelete}
                        >
                            ❌ Delete request
                        </Button>
                    </Flex>
                </Flex>
            </Card>
        );
    }
}
export default observer(RequestCard);