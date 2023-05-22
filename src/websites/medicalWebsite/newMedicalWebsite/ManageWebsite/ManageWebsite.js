import { Container, ScrollArea, Space, Tabs, Text } from "@mantine/core";
import React from "react";

import { useLocalStorageState } from "ahooks";
import HandleDoctors from "./HandleDoctors";
import { Messages } from "../../../CommonComponnets/Messages";
import { ViewAppointment } from "./ViewAppointment";

const ManageMedicalWebsite = () => {
  return (
    <Container
      style={{
        minHeight: "900px",
        width: "100vw",
      }}
      bg="#fff"
      radius="xl"
    >
      <Tabs
        style={{
          minHeight: "900px",
          width: "65vw",
        }}
        color="cyan"
        variant="outline"
        radius="md"
        defaultValue="Doctors"
      >
        {/* Tabs  */}
        <Tabs.List>
          <Tabs.Tab value="Doctors">Doctors</Tabs.Tab>
          <Tabs.Tab value="Appointments">Appointments</Tabs.Tab>

          <Tabs.Tab value="Messages">Messages</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Doctors" pt="sm">
          <HandleDoctors />
        </Tabs.Panel>
        <Tabs.Panel value="Appointments" pt="sm">
          <ViewAppointment />
        </Tabs.Panel>

        <Tabs.Panel value="Messages" pt="sm">
          <Space h="xl" />

          <Text fw={500} mb="md" mt="lg" order={4}>
            Messages Received
          </Text>
          <Space h="xl" />
          <Messages />
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default ManageMedicalWebsite;
