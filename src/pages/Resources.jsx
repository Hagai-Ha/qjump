import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Container, Title, Text, Accordion } from "@mantine/core";

const faqs = [
  {
    question: "What is Qjump?",
    answer:
      "Qjump is a service that helps HMO patients reschedule appointments by anonymously matching them with other patients who need the opposite change.",
  },
  {
    question: "How does slot swapping work?",
    answer:
      "If you request an earlier appointment and another patient requests a later one, Qjump automatically swaps your slots so you both get a better fit.",
  },
  {
    question: "Is my information kept private?",
    answer:
      "Yes. Swaps are anonymous — you won't see the other patient's personal details, and they won't see yours.",
  },
  {
    question: "Can I still book a new appointment through Qjump?",
    answer:
      "Not yet. Qjump currently helps you reschedule existing appointments, not book new ones.",
  },
];

function Resources() {
  return (
    <div className="page">
      <Navbar />
      <Container size="sm" py="xl">
        <Title order={1} ta="center" mb="xs">
          Resources
        </Title>
        <Text c="dimmed" ta="center" mb="xl">
          Answers to common questions about using Qjump.
        </Text>

        <Accordion variant="separated">
          {faqs.map((faq) => (
            <Accordion.Item key={faq.question} value={faq.question}>
              <Accordion.Control>{faq.question}</Accordion.Control>
              <Accordion.Panel>{faq.answer}</Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
      <Footer />
    </div>
  );
}

export default Resources;
