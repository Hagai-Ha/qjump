import React from "react";
import { Container, Title, Text, Stack, Paper, Group, ThemeIcon } from "@mantine/core";

const steps = [
  {
    number: 1,
    title: "Log in with your HMO credentials",
    description: "Access your account securely using the same details you use with your HMO.",
  },
  {
    number: 2,
    title: "View your upcoming appointments",
    description: "See all your scheduled appointments in one place on your dashboard.",
  },
  {
    number: 3,
    title: "Request to precede or postpone",
    description: "Ask for an earlier slot, or postpone an appointment that doesn't work for you.",
  },
  {
    number: 4,
    title: "Get matched automatically",
    description: "Qjump anonymously matches you with another patient looking for the opposite swap.",
  },
];

function HowItWorks() {
  return (
    <Container size="sm" py="xl">
        <Title order={1} ta="center" mb="xs">
          How It Works
        </Title>
        <Text c="dimmed" ta="center" mb="xl">
          Get treated sooner, reschedule better — here's how Qjump helps you manage your appointments.
        </Text>

        <Stack gap="md">
          {steps.map((step) => (
            <Paper key={step.number} withBorder p="md" radius="md">
              <Group align="flex-start" wrap="nowrap">
                <ThemeIcon size={36} radius="xl" color="orange">
                  {step.number}
                </ThemeIcon>
                <div>
                  <Text fw={700}>{step.title}</Text>
                  <Text size="sm" c="dimmed">
                    {step.description}
                  </Text>
                </div>
              </Group>
            </Paper>
          ))}
        </Stack>
    </Container>
  );
}

export default HowItWorks;
