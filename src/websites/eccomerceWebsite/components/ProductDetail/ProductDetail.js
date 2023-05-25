import {
  Flex,
  createStyles,
  Card,
  Image,
  Avatar,
  Text,
  Group,
  Button,
  SimpleGrid,
  Container,
  Title,
  Space,
  Paper,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import Carousel from "react-material-ui-carousel";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocalStorageState } from "ahooks";
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 600,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.8,
  },

  body: {
    padding: theme.spacing.md,
  },
}));
const ProductDetail = () => {
  const { classes } = useStyles();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProduct();
  }, [productId]);

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8800/api/products/getproduct/${productId}`
      );
      setProduct(response.data.product);
      console.log(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container mt="xl" mb="xl" px="xl" size="80rem">
      <Paper p="md" shadow="md">
        <Flex gap="md" justify="space-around" direction="row" wrap="wrap">
          <Images images={product?.images} />

          <Flex ml="sm" direction="column">
            <div>
              <Text transform="uppercase" color="dimmed" weight={700} size="xs">
                {product?.category}
              </Text>
              <Title order={1} className={classes.title} mt="xs" mb="md">
                {product?.name}
              </Title>
            </div>
            <Text className={classes.title} mt="xs" mb="md">
              COLORS
            </Text>
            <div>
              {product?.colors.map((color) => (
                <Button
                  mr="sm"
                  radius="xl"
                  style={{
                    backgroundColor: color,
                    width: "30px",
                    height: "30px",
                  }}
                ></Button>
              ))}
            </div>
            <Text className={classes.title} mt="xs" mb="md">
              SIZES
            </Text>
            <div>
              {product?.sizes.map((size) => (
                <Button
                  mr="sm"
                  style={{ width: "fit-content", height: "35px" }}
                  radius="lg"
                  variant="default"
                >
                  {size}
                </Button>
              ))}
            </div>
            {/* <Button mt="xl" variant="default">
            BUY NOW
          </Button> */}
          </Flex>
        </Flex>
        <Space h="xl" />
        <Space h="xl" />
        <Title order={3}>Product Description</Title>
        <Space h="xl" />
        <div
          style={{ fontSize: "18px", padding: "30px" }}
          dangerouslySetInnerHTML={{ __html: product?.description }}
        />
      </Paper>
    </Container>
  );
};

export default ProductDetail;
function Images({ images }) {
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  return (
    <>
      <SimpleGrid>
        <Flex direction="column">
          {images?.map((image) => (
            <Image
              mb="sm"
              width={150}
              height={135}
              src={image}
              key={image}
              radius="sm"
            />
          ))}
        </Flex>
      </SimpleGrid>
      <div style={{ width: "350px", height: "300px" }}>
        <Carousel autoPlay={2000}>
          {images?.map((image) => (
            <Image
              style={{ objectFit: "contain" }}
              key={image}
              onClick={(e) => e.preventDefault()}
              src={image}
            />
          ))}
        </Carousel>
      </div>
    </>
  );
}
