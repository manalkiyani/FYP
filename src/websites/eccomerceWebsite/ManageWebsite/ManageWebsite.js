import { Container, ScrollArea, Space, Tabs, Text } from "@mantine/core";
import React from "react";
import Products from "../pages/ProductsPage";
import { useLocalStorageState } from "ahooks";
import HandleProducts from "./HandleProducts";
import CategoriesManagement from "./CategoriesManagement";
import { ViewOrders } from "./ViewOrders";
import { Messages } from "../../CommonComponnets/Messages";

const ManageEcommerceWebsite = () => {
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
        defaultValue="Products"
      >
        {/* Tabs  */}
        <Tabs.List>
          <Tabs.Tab value="Products">Products</Tabs.Tab>
          <Tabs.Tab value="Categories">Categories</Tabs.Tab>
          <Tabs.Tab value="Orders"> Orders</Tabs.Tab>
          <Tabs.Tab value="Messages">Messages</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Products" pt="sm">
          <HandleProducts />
        </Tabs.Panel>
        <Tabs.Panel value="Categories" pt="sm">
          <CategoriesManagement />
        </Tabs.Panel>

        <Tabs.Panel value="Orders" pt="sm">
          <ViewOrders />
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

export default ManageEcommerceWebsite;
