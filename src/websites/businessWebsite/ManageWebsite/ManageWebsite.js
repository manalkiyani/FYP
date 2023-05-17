import { Container, ScrollArea, Space, Tabs, Text } from "@mantine/core";
import React from "react";
import ApplicationDetail from "../Pages/Applications/ApplicationDetail";
import HandleJobs from "../handleJob/HandleJobs";
import { Messages } from "../../CommonComponnets/Messages";

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
       {/* Tabs  */}
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

export default ManageWebsite;
