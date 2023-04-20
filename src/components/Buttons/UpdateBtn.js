import * as React from "react";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import UpdateIcon from "@mui/icons-material/Update";
import { UpdateTemplate } from "../../utilityFunctions/helperFunctions";
import { useParams } from "react-router-dom";

import { useLocalStorageState } from "ahooks";
const UpdateBtn = () => {
  const { id } = useParams();
  const [template] = useLocalStorageState("template", {});

  const updateTemplate = async () => {
    console.log(id);

    let response;
    try {
      switch (template.type) {
        case "blog":
          {
            response = await UpdateTemplate(
              template,
              "BlogHomePage",
              "BlogsPage",
              "blogs",
              id
            );
          }
          break;
        case "eccomerce":
          {
            response = await UpdateTemplate(
              template,
              "EccomerceHomePage",
              "ProductsPage",
              "products",
              id
            );
          }
          break;
        case "business":
          {
            response = await UpdateTemplate(
              template,
              "BusinessHomePage",
              "JobsPage",
              "jobs",
              id
            );
          }
          break;
        case "medical":
          {
            response = await UpdateTemplate(
              template,
              "MedicalHomePage",
              "DoctorsPage",
              "doctors",
              id
            );
          }
          break;
      }

      toast.success("Template updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Oops! An error occured. Please try again later");
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Button
        onClick={updateTemplate}
        style={{ position: "sticky", top: 0, zIndex: 1000 }}
        size="medium"
        color="primary"
        startIcon={<UpdateIcon />}
        variant="contained"
      >
        <span>Update Template</span>
      </Button>
    </>
  );
};

export default UpdateBtn;
