import React from "react";
import { Link } from "react-router-dom";
import { Container, Title, Text, Button, Center, Stack } from "@mantine/core";

function NotFound() {
  return (
    <Container style={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Stack align="center" gap="md">
        <Title order={1} style={{ fontSize: "5rem", color: "#e67e22" }}>
          404
        </Title>
        <Text size="lg" c="dimmed" style={{ textAlign: "center" }}>
          Oops! The page you are looking for does not exist.
        </Text>
        <Button 
          component={Link} 
          to="/" 
          variant="filled" 
          color="#333"
          size="md"
        >
          Back to Home
        </Button>
      </Stack>
    </Container>
  );
}

export default NotFound;