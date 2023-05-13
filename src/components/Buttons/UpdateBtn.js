import * as React from "react";
import { Button } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import UpdateIcon from "@mui/icons-material/Update";
import { UpdateTemplate } from "../../utilityFunctions/helperFunctions";
import { useParams } from "react-router-dom";

import { useLocalStorageState } from "ahooks";
const UpdateBtn = () => {
  // const { id } = useParams();
  const [id] = useLocalStorageState("templateId", "");
  // const [template] = useLocalStorageState("template", "");

  const updateTemplate = async () => {
    let template = JSON.parse(localStorage.getItem("template"));
    console.log("template", template);

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
      console.log(response);

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
        variant="subtle"
        color="gray"
        onClick={updateTemplate}
        leftIcon={<UpdateIcon size="1rem" />}
      >
        Update Template
      </Button>
    </>
  );
};

export default UpdateBtn;
