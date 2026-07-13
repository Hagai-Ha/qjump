import React from "react";
import { Container, Title, Text, Stack, Paper, Group, ThemeIcon, Badge } from "@mantine/core";

const clinics = [
  {
    name: "Downtown Clinic",
    address: "1399 E 78th St, New York, NY 10075",
    hours: "Sun–Thu, 8:00–18:00",
    phone: "(212) 555-0142",
  },
  {
    name: "Westside Medical Center",
    address: "482 W 24th St, New York, NY 10011",
    hours: "Sun–Thu, 8:00–20:00",
    phone: "(212) 555-0198",
  },
  {
    name: "Brooklyn Family Clinic",
    address: "77 Court St, Brooklyn, NY 11201",
    hours: "Sun–Fri, 9:00–17:00",
    phone: "(718) 555-0173",
  },
];

function Clinics() {
  return (
    <Container size="sm" py="xl">
        <Title order={1} ta="center" mb="xs">
          Clinics
        </Title>
        <Text c="dimmed" ta="center" mb="xl">
          Find a Qjump-affiliated clinic near you.
        </Text>

        <Stack gap="md">
          {clinics.map((clinic) => (
            <Paper key={clinic.name} withBorder p="md" radius="md">
              <Group align="flex-start" wrap="nowrap">
                <ThemeIcon size={36} radius="xl" variant="light" color="orange">
                  🏥
                </ThemeIcon>
                <div style={{ flex: 1 }}>
                  <Group justify="space-between" wrap="nowrap">
                    <Text fw={700}>{clinic.name}</Text>
                    <Badge color="green" variant="light">
                      Open
                    </Badge>
                  </Group>
                  <Text size="sm" c="dimmed" mt={4}>
                    {clinic.address}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {clinic.hours}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {clinic.phone}
                  </Text>
                </div>
              </Group>
            </Paper>
          ))}
        </Stack>
    </Container>
  );
}

export default Clinics;
