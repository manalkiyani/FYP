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
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ViewJob from "../../../Viewer/BusinessWebsite/Pages/ViewJobs/ViewJob";
import { businessTemplate } from "../../../TemplatesData/businessTemplate";
import { getTemplateData } from "../../../utilityFunctions/axiosFunctions";
import Add from "@mui/icons-material/ControlPointOutlined";
import HandleJob from "./HandleJob";
import { Toaster, toast } from "react-hot-toast";
import AddJob from "../Pages/addJob/AddJob";
import { useLocalStorageState } from "ahooks";

const HandleJobs = () => {
  const [jobs, setJobs] = React.useState([]);
  const [addJob, setAddJob] = React.useState(false);
  const [template, setTemplate] = useLocalStorageState("template", "");

  const { id } = useParams();

  const getJobs = async (jobIds) => {
    const res = await axios.post("http://localhost:8800/api/jobs/get", {
      jobIds,
    });
    setJobs(res.data.jobs);

    console.log(res.data);
  };

  const DeleteJob = async (jobId) => {
    const response = await axios.delete(
      `http://localhost:8800/api/jobs/${jobId}`
    );
    if (response.status === 200) {
      toast.success("Job Deleted Successfully");
      getJobs(template.data.jobs);
    } else {
      toast.error("An error occured , Try Again later");
    }
    console.log(response);
  };
  useEffect(() => {
    getJobs(template.data.jobs);
  }, [addJob]);

  // "Full-time",
  //               "Part-time",
  //               "Temporary",
  //               "Intern",
  //               "Contract",
  //               "InOffice", "Remote"

  //                 "Associate",
  //               "Masters",
  //               "Bachelors",
  //               "Ph.D",
  //               "Pursuing Degree"

  // const handleDegreeSearch = (value) => {
  //   console.log(value);
  // };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      {!addJob && (
        <Flex justify="flex-end">
          <Button
            onClick={() => setAddJob(true)}
            variant="default"
            leftIcon={<Add size="1rem" />}
          >
            ADD NEW
          </Button>
        </Flex>
      )}

      {addJob && <AddJob setAddJob={setAddJob} />}
      <Space h="lg" />
      <Flex
        mih={50}
        style={{ padding: "20px", borderRadius: "20px" }}
        bg="#FBF8F1"
      >
        <Text fw={500} fz="xl">
          Posted Jobs
        </Text>
      </Flex>
      <Space h="lg" />
      <Flex direction="column">
        {jobs.map((job) => (
          <HandleJob DeleteJob={DeleteJob} key={job._id} job={job} />
        ))}
      </Flex>
    </>
  );
};

export default HandleJobs;
