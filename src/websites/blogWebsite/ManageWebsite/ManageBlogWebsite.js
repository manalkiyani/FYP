import { Container, Space, Tabs, Text } from "@mantine/core";
import React from "react";
import HandleBlogs from "./HandleBlogs";
import { Messages } from "../../CommonComponnets/Messages";

const ManageBlogWebsite = () => {
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
        defaultValue="Blogs"
      >
        {/* Tabs  */}
        <Tabs.List>
          <Tabs.Tab value="Blogs">Blogs</Tabs.Tab>

          <Tabs.Tab value="Messages">Messages</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Blogs" pt="sm">
          <HandleBlogs />
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

export default ManageBlogWebsite;
