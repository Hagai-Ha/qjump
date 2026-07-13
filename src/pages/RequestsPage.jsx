import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { postponeRequestsStore } from '../stores/PostponeRequestsStore';
import { precedeRequestsStore } from '../stores/PrecedeRequestsStore';
import { observer } from 'mobx-react-lite';
import RequestCard from '../components/RequestCard';
import { Container, Title, Text, Stack, Paper, Group, ThemeIcon } from "@mantine/core";
import { Loader, Center} from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';


const RequestsPage = () => {
  const { patientId } = useParams();
  useEffect(() => {
      postponeRequestsStore.fetchPatientRequests(patientId);
      precedeRequestsStore.fetchPatientRequests(patientId);
  }, [patientId]);
  return (
    <div className="page">
      <Container id="requests-container" size="sm" py="xl">
          
          {/* Postpone Requests */}

          <div className="postpone-requests">
            {/* Header Section */}
            <Paper p="md" mb="lg" radius="md" bg="blue.0">
                <Title order={1} size="h2" c="blue.9">
                    My Requests to Reschedule Later
                </Title>
                <Text size="sm" c="blue.7" mt={4}>
                    View and manage your requests to reschedule later
                </Text>
            </Paper>

            {/* Read the global loading state directly from MobX */}
            {postponeRequestsStore.loading ? (
                <Center py="xl">
                    <Stack align="center" gap="xs">
                        <Loader size="lg" type="dots" />
                        <Text c="dimmed" size="sm">Loading your requests...</Text>
                    </Stack>
                </Center>
            ) : (
                <Stack gap="md">
                    {postponeRequestsStore.requests.length === 0 ? (
                        <Paper withBorder p="xl" radius="md" style={{ textAlign: 'center' }}>
                            <Text c="dimmed">No reschedule requests found.</Text>
                        </Paper>
                    ) : (
                      postponeRequestsStore.requests.map((request) => (
                            <RequestCard 
                                key={request.request_id} 
                                request={request} 
                                type="postpone"
                            />
                        ))
                    )}

                </Stack>
            )}
          </div>


          {/* Advance Requests */}

          <div className="advance-requests">
            {/* Header Section */}
            <Paper p="md" mb="lg" radius="md" bg="blue.0">
                <Title order={1} size="h2" c="blue.9">
                    My Requests to Reschedule Earlier
                </Title>
                <Text size="sm" c="blue.7" mt={4}>
                    View and manage your requests to reschedule earlier
                </Text>
            </Paper>

            {/* Read the global loading state directly from MobX */}
            {precedeRequestsStore.loading ? (
                <Center py="xl">
                    <Stack align="center" gap="xs">
                        <Loader size="lg" type="dots" />
                        <Text c="dimmed" size="sm">Loading your requests...</Text>
                    </Stack>
                </Center>
            ) : (
                <Stack gap="md">
                    {precedeRequestsStore.requests.length === 0 ? (
                        <Paper withBorder p="xl" radius="md" style={{ textAlign: 'center' }}>
                            <Text c="dimmed">No reschedule requests found.</Text>
                        </Paper>
                    ) : (
                      precedeRequestsStore.requests.map((request) => (
                            <RequestCard 
                                key={request.request_id} 
                                request={request} 
                                type="precede"
                            />
                        ))
                    )}

                </Stack>
            )}
          </div>

      </Container>
    </div>
  );
}

export default observer(RequestsPage);
