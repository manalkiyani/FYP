import { Container, ScrollArea, Space, Tabs, Text } from "@mantine/core";
import React from "react";
import ApplicationDetail from "../Pages/Applications/ApplicationDetail";
import HandleJobs from "../handleJob/HandleJobs";

export const ManageWebsite = () => {
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
        defaultValue="jobs"
      >
        {/* Tabs  */}
        <Tabs.List>
          <Tabs.Tab value="jobs">Jobs</Tabs.Tab>
          <Tabs.Tab value="applications"> Applications</Tabs.Tab>
          <Tabs.Tab value="messages">Messages</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="jobs" pt="sm">
          <HandleJobs />
        </Tabs.Panel>

        <Tabs.Panel value="applications" pt="sm">
          <ApplicationDetail />
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="sm">
          <Space h="xl" />

          <Space h="xl" />
          <Text fw={500} mb="md" mt="lg" order={4}>
            Optional Message
          </Text>
          <Text fz="sm">message</Text>
        </Tabs.Panel>
      </Tabs>
    </Container>
  );
};

export default ManageWebsite;
