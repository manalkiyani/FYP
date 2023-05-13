
import toast, { Toaster } from "react-hot-toast";

import { useEffect, useState } from "react";
 
import { useLocalStorageState } from "ahooks";
import { Product } from "../ManageWebsite/ViewProduct/ProductCard";
import { getListOfProducts } from "../../../utilityFunctions/axiosFunctions";
import { Flex } from "@mantine/core";
import axios from "axios";
import ConfirmDeleteDialog from "../../../components/ConfirmDeleteDialog";

function Products({ productIds, handleEditProduct }) {
 
  const [template, setTemplate] = useLocalStorageState("template", "");

  const [products, setProducts] = useState([]);
  const [openDialogue, setOpenDialogue] = useState(false);
  const [deleteId, setDeleteId] = useState();

  useEffect(() => {
    getProducts();
  }, [productIds]);

  const getProducts = async () => {
    const products = await getListOfProducts(productIds);
    setProducts(products);
  };
  const delProduct = async () => {
    axios
      .delete(`http://localhost:8800/api/products/delproduct/${deleteId}`)
      .then(function (response) {
        setTemplate({
          ...template,

          data: {
            products: products.filter((productId) => productId !== deleteId),
          },
        });

        toast.success("Product Deleted Successfully");
        setProducts(products.filter((product) => product._id !== deleteId));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleOpenDialogue = () => {
    console.log("in handleOpenDialogue");
    setOpenDialogue(true);
  };

  const handleCloseDialogue = () => {
    setOpenDialogue(false);
  };

  return (
    <>
      <ConfirmDeleteDialog
        text="product"
        open={openDialogue}
        onClose={handleCloseDialogue}
        onConfirm={delProduct}
      />

      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div>
        {/* <ProductCard productIds={productIds1}></ProductCard> */}

        <Flex mb="xl" wrap="wrap">
          {products &&
            products.map((product) => {
              return (
                <Product
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  description={product.description}
                  images={product.images}
                  handleOpenDialogue={handleOpenDialogue}
                  setDeleteId={setDeleteId}
                  handleEditProduct={handleEditProduct}
                />
              );
            })}
        </Flex>
      </div>
    </>
  );
}
export default Products;
