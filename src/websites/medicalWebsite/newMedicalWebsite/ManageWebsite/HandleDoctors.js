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
import axios from "axios";
import { useEffect, useState } from "react";

import Add from "@mui/icons-material/ControlPointOutlined";
import { Toaster, toast } from "react-hot-toast";
import { DoctorCard } from "../DoctorCard";

import { useLocalStorageState } from "ahooks";

import AddDoctor from "./AddDoctorPage/AddDoctor";


const HandleDoctors = () => {
  const [addDoctor, setAddDoctor] = React.useState(false);
  const [editId, setEditId] = React.useState(null);
  const [operation, setOperation] = React.useState("add");
  const [productIds, setProductIds] = React.useState([]);
  const [template] = useLocalStorageState("template", "");
  const [doctors, setDoctors] = useState(null);


 
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

  const getDoctors = async (doctorIds) => {
    try {
      const response = await axios.post(
        `http://localhost:8800/api/doctor/get`,{
          doctorIds
        }
      );
      console.log(response)
      setDoctors(response.data.Doctors);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDoctors(template.data.doctors);

  }, []);

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

      <Container size="90vw">
      {doctors &&
        doctors.map((doctor) => {
         return <DoctorCard
         id={doctor._id}
            image={doctor.image}
            title={doctor.name}
            department={doctor.department}
            qualification={doctor.latestQualification}
            experience={doctor.experience}
            address={doctor.address}
            availability={doctor.availability}
            description = {doctor.description}
            gender = {doctor.gender}

          />;
        })}
    </Container>

        {/* <Products
          handleEditProduct={handleEditProduct}
          productIds={productIds}
        /> */}


      </Flex>
    </>
  );
};

export default HandleDoctors;
