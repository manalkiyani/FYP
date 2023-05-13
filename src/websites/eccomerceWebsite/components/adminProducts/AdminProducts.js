import { useEffect, useState } from "react";

import { Container, Flex, Space } from "@mantine/core";
import { getListOfProducts } from "../../../../utilityFunctions/axiosFunctions";
import { Product } from "../../ManageWebsite/ViewProduct/ProductCard";

function AdminProducts({ productIds }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, [productIds]);

  const getProducts = async () => {
    const products = await getListOfProducts(productIds);
    console.log("in admin products",products)
    setProducts(products);
  };

  return (
    <>
    <Space h="xl"/>
      <Container px="xs" mt="xl" size="90vw">
        <Flex mb="xl" wrap="wrap">
          {products &&
            products.map((product) => {
              return (
                <Product
                view="none"
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  images={product.images}
                />
              );
            })}
        </Flex>
      </Container>
    </>
  );
}
export default AdminProducts;
