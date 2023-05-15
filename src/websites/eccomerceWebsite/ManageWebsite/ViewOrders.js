import { useEffect, useState } from "react";
import { Flex } from "@mantine/core";
import { useLocalStorageState } from "ahooks";
import axios from "axios";
import { Card, Group, Text, Image, SimpleGrid } from "@mantine/core";

export function ViewOrders() {
  const [orders, setOrders] = useState([]);
  const [templateId, setTemplateId] = useLocalStorageState("templateId");
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    if (
      templateId === "001" ||
      templateId === "002" ||
      templateId === "003" ||
      templateId === "004"
    )
      return;
    try {
      const response = await axios.get(
        `http://localhost:8800/api/admin/getOrders/${templateId}`
      );

      //   setData();
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex wrap="wrap" gap="md">
      {orders?.map((order) => (
        <Order
          totalprice={order.totalprice}
          paymentmethod={order.paymentmethod}
          address={order.address}
          products={order.products}
        />
      ))}
    </Flex>
  );
}

function Order({ totalprice, paymentmethod, address, products }) {
  return (
    <Card style={{ width: "500px" }} withBorder shadow="sm" radius="md">
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text color="dimmed" fz="sm" weight={300}>
            Total Price
          </Text>
          <Text color="dimmed" fz="sm" weight={300}>
            Payment Method
          </Text>
        </Group>
        <Group position="apart">
          <Text fz="xl" weight={500}>
            {totalprice}$
          </Text>
          <Text fz="md" weight={400}>
            {paymentmethod}
          </Text>
        </Group>
        <Text color="dimmed" fz="sm" weight={300}>
          Address
        </Text>

        <Text fz="md" weight={400}>
          {address}
        </Text>
      </Card.Section>

      <Card.Section inheritPadding mt="sm" pb="md">
        <SimpleGrid cols={3}>
          {products?.map((product) => (
            <Image
              width={100}
              height={100}
              src={product?.images[0]}
              key={product._id}
              radius="sm"
            />
          ))}
        </SimpleGrid>
      </Card.Section>
    </Card>
  );
}
