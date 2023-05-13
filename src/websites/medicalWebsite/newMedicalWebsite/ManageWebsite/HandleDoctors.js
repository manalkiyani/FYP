import React from "react";
import {
  Container,
  Title,
  Accordion,
  createStyles,
  rem,
  Flex,
  TextInput,
  Checkbox,
  Grid,
  Text,
  Divider,
  Button,
  Space,
} from "@mantine/core";

import Add from "@mui/icons-material/ControlPointOutlined";
import { Toaster, toast } from "react-hot-toast";

import { useLocalStorageState } from "ahooks";

import AddDoctor from "./AddDoctorPage/AddDoctor";


const HandleDoctors = () => {
  const [addDoctor, setAddDoctor] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [operation, setOperation] = React.useState("add");
  const [productIds, setProductIds] = React.useState([]);
  const [template] = useLocalStorageState("template", "");

  React.useEffect(() => {
    console.log("in effect");
    console.log(template);
    setProductIds(template?.data?.products);
  }, []);

  const handleEditProduct = (id) => {
    console.log(id, "handleEdtiProduct");
    setAddDoctor(true);
    setOperation("edit");
    setEditId(id);
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      {addDoctor && (   
        <AddDoctor
          operation={operation}
          editId={editId}
          setAddDoctor={setAddDoctor}
        />
      )}
      <Space h="lg" />
      <Flex
        justify="space-between"
        mih={50}
        style={{ padding: "20px", borderRadius: "20px" }}
        bg="#FBF8F1"
      >
        <Text fw={400} fz="xl">
          Manage Doctors
        </Text>
        {!addDoctor && (
          <Button
            onClick={() => setAddDoctor(true)}
            variant="default"
            leftIcon={<Add size="1rem" />}
          >
            ADD NEW
          </Button>
        )}
      </Flex>

      <Space h="xl" />
      <Flex direction="column">
        {/* <Products
          handleEditProduct={handleEditProduct}
          productIds={productIds}
        /> */}
      </Flex>
    </>
  );
};

export default HandleDoctors;
