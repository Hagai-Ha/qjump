import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container, Title, Text, Stack, Paper, Group, ThemeIcon } from "@mantine/core";

const contactMethods = [
  {
    icon: "✉️",
    label: "Email",
    value: "support@qjump.com",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "1-800-QJUMP",
  },
  {
    icon: "🕒",
    label: "Hours",
    value: "Sun–Thu, 9:00–17:00",
  },
];

function Support() {
  return (
    <div className="page">
      <Navbar />
      <Container size="sm" py="xl">
        <Title order={1} ta="center" mb="xs">
          Support
        </Title>
        <Text c="dimmed" ta="center" mb="xl">
          Need help? Reach out and our team will get back to you.
        </Text>

        <Stack gap="md">
          {contactMethods.map((method) => (
            <Paper key={method.label} withBorder p="md" radius="md">
              <Group>
                <ThemeIcon size={36} radius="xl" variant="light" color="orange">
                  {method.icon}
                </ThemeIcon>
                <div>
                  <Text fw={700}>{method.label}</Text>
                  <Text size="sm" c="dimmed">
                    {method.value}
                  </Text>
                </div>
              </Group>
            </Paper>
          ))}
        </Stack>
      </Container>
      <Footer />
    </div>
  );
}

export default Support;
