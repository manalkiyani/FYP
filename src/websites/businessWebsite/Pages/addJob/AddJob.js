import React, { useState, useEffect } from "react";
import styles from "./AddJob.module.css";
import axios from "axios";
import SalaryChoice from "./SalaryChoice";

import {
  Text,
  createStyles,
  rem,
  Select,
  TextInput,
  SegmentedControl,
  Button,
  FileInput,
  Stepper,
  Group,
} from "@mantine/core";
import ReactQuill from "react-quill";
import { DatePickerInput } from "@mantine/dates";
import { uploadImage } from "../../../../utilityFunctions/imageUpload";
import { Toaster, toast } from "react-hot-toast";
import { useLocalStorageState } from "ahooks";

const inputStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: rem(50),
    paddingTop: rem(18),
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
  text: {
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
    fontWeight: 500,
  },
}));
const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ list: "ordered" }, { list: "bullet" }],
      // text direction

      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
    ],
  },
};
const AddJob = ({ setDisplayAdd, setDisplayEdit, job, show }) => {
  //save data
  const [jobId, setJobId] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [qualification, setQualification] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [showPayBy, setShowPayBy] = React.useState("Range");
  // const [range, setRange] = useState({ min: "", max: "" });
  const [minRange, setMinRange] = useState("");
  const [maxRange, setMaxRange] = useState("");
  const [salaryPeriod, setSalaryPeriod] = useState("");
  const [startingAmount, setStartingAmount] = useState("");
  const [maximumAmount, setMaximumAmount] = useState("");
  const [exactAmount, setExactAmount] = useState("");
  const [file, setFile] = useState("");
  const quillRef = React.useRef(null);
  const [template, setTemplate] = useLocalStorageState("template", "");
  const [newFile, setNewFile] = useState("");
  ////////////////////////////////////////////////////////////////

  const { classes } = inputStyles();
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  useEffect(() => {
    console.log(job);
    if (job) {
      setJobId(job._id);
      setTitle(job.title);
      setType(job.employmentType);
      setLocation(job.location);
      setQualification(job.minimumQualification);

      setDescription(job.description);
      setShowPayBy(job.showPayBy);
      setMinRange(job.range?.min);
      setMaxRange(job.range?.max);

      setStartingAmount(job?.startingAmount);
      setMaximumAmount(job?.maximumAmount);
      setExactAmount(job?.exactAmount);
      setFile(job.descriptionFile);
      setNewFile(job.descriptionFile);
    }
  }, [job]);

  const addJob = async () => {
    if (
      title === "" ||
      location === "" ||
      qualification === "" ||
      deadline === "" ||
      description === "" ||
      showPayBy === "" ||
      file === ""
    ) {
      toast.error("Please fill all the required fields");
      return;
    }

    const fileLink = await uploadImage(file);
    console.log(fileLink);

    let response = await axios.post("http://localhost:8800/api/jobs/", {
      title,
      employmentType: type,
      location,
      deadline,
      startDate,
      minimumQualification: qualification,
      showPayBy,
      range: { min: minRange, max: maxRange, period: salaryPeriod },
      startingAmount,
      maximumAmount,
      exactAmount,
      description,
      descriptionFile: fileLink,
    });

    console.log(response.data.jobId);
    if (response.status === 201) {
      setTemplate({
        ...template,
        data: {
          jobs: [...template?.data?.jobs, response.data.jobId],
        },
      });
      toast.success("Job added successfully");

      setDisplayAdd(false);
      nextStep();
    } else {
      toast.error("Please fill all the required fields");
    }
  };

  const EditJob = async () => {
    if (
      title === "" ||
      location === "" ||
      qualification === "" ||
      deadline === "" ||
      description === "" ||
      showPayBy === "" ||
      file === ""
    ) {
      toast.error("Please fill all the required fields");
      return;
    }

    try {
      let fileLink = file
      if (file !== newFile) {
        fileLink = await uploadImage(file);
        console.log(fileLink);
      }

      let response = await axios.post(
        `http://localhost:8800/api/jobs/${jobId}`,
        {
          title,
          employmentType: type,
          location,
          deadline,
          startDate,
          minimumQualification: qualification,
          showPayBy,
          range: { min: minRange, max: maxRange, period: salaryPeriod },
          startingAmount,
          maximumAmount,
          exactAmount,
          description,
          descriptionFile: fileLink,
        }
      );
      if (response.status === 201) {
        toast.success("Job updated successfully");

        setDisplayEdit(false);
      } else {
        toast.error("Please fill all the required fields");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <div className={styles.container}>
        <Stepper
          color="cyan"
          mt={20}
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
        >
          <Stepper.Step
            label="First step"
            description="Provide basic information"
          >
            <div className={styles.titleContainer}>
              <h5 className={styles.title}>Provide basic information</h5>
              {/* <img className={styles.headerImage} src={job1} alt="girlOnLaptop" /> */}
            </div>
            <div className={styles.contentContainer}>
              <TextInput
                label="Job Title"
                placeholder="Front End Developer"
                classNames={classes}
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Select
                mt="md"
                mb={15}
                data={[
                  "Full-time",
                  "Part-time",
                  "Temporary",
                  "Intern",
                  "Contract",
                ]}
                value={type}
                onChange={setType}
                placeholder="Pick one"
                label="Employment type"
                classNames={classes}
                required
              />
              <Text className={classes.text} mt="sm" mb={10}>
                Location
              </Text>
              <SegmentedControl
                value={location}
                onChange={setLocation}
                radius="xl"
                size="sm"
                data={["InOffice", "Remote", "Both"]}
              />

              <DatePickerInput
                mt="md"
                popoverProps={{ withinPortal: true }}
                label="Application deadline"
                classNames={classes}
                clearable={false}
                required
                value={deadline}
                onChange={setDeadline}
              />
              <DatePickerInput
                mt="md"
                popoverProps={{ withinPortal: true }}
                label="Expected Start Date"
                classNames={classes}
                clearable={false}
                value={startDate}
                onChange={setStartDate}
              />

              <Text className={classes.text} mt="sm" mb={10}>
                Minimum Qualification
              </Text>
              <SegmentedControl
                radius="xl"
                size="sm"
                data={[
                  "Associate",
                  "Masters",
                  "Bachelors",
                  "Ph.D",
                  "Pursuing Degree",
                ]}
                value={qualification}
                onChange={setQualification}
              />
            </div>
            <Group position="center" mt="xl">
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep} color="cyan">
                Next Step
              </Button>
            </Group>
          </Stepper.Step>
          <Stepper.Step label="Second step" description="Add Compensation">
            <div className={styles.titleContainer}>
              <h5 className={styles.title}>Add Compensation</h5>
              {/* <img className={styles.headerImage} src={job1} alt="girlOnLaptop" /> */}
            </div>

            <div className={styles.contentContainer}>
              <Text className={classes.text} mb={10}>
                Expected Salary
              </Text>
              <Select
                mt="md"
                data={[
                  "Range",
                  "Starting amount",
                  "Maximum amount",
                  "Exact amount",
                ]}
                placeholder="Pick one"
                label="Show Pay by"
                classNames={classes}
                required
                value={showPayBy}
                onChange={setShowPayBy}
              />

              <SalaryChoice
                exactAmount={exactAmount}
                setExactAmount={setExactAmount}
                startingAmount={startingAmount}
                setMaximumAmount={setMaximumAmount}
                maximumAmount={maximumAmount}
                setStartingAmount={setStartingAmount}
                minRange={minRange}
                // setRange={setRange}
                setMinRange={setMinRange}
                maxRange={maxRange}
                setMaxRange={setMaxRange}
                setSalaryPeriod={setSalaryPeriod}
                classes={classes}
                option={showPayBy}
              />
            </div>
            <Group position="center" mt="xl">
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
              <Button onClick={nextStep} color="cyan">
                Next Step
              </Button>
            </Group>
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Describe the job">
            <div className={styles.titleContainer}>
              <h5 className={styles.title}>Describe the job</h5>
              {/* <img className={styles.headerImage} src={job1} alt="girlOnLaptop" /> */}
            </div>
            <div className={styles.contentContainer}>
              <Text className={classes.text} withAsterisk mt="sm" mb={10}>
                Job Description
              </Text>
              <FileInput
                value={file}
                onChange={setFile}
                placeholder="Pick file"
                label="Upload a PDf or Docx file"
                withAsterisk
                mb={20}
                classNames={classes}
              />
              <div style={{ height: "50vh" }}>
                <TextInput
                  placeholder={
                    "  Describe the responsibilities of this job, required work experience,skills, or education"
                  }
                  classNames={classes}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {/* <ReactQuill
                  ref={quillRef}
                  placeholder={
                    "  Describe the responsibilities of this job, required work experience,skills, or education"
                  }
                  style={{ height: "90%" }}
                  theme="snow"
                  
                  modules={modules}
                /> */}
              </div>
            </div>
            <Group position="center" mt="xl">
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
              {show === "add" ? (
                <Button color="cyan" onClick={addJob}>
                  Submit Now
                </Button>
              ) : (
                <Button color="cyan" onClick={EditJob}>
                  Update Now
                </Button>
              )}
            </Group>
          </Stepper.Step>
          <Stepper.Completed>
            <div className={styles.titleContainer}>
              <h5>Job has been posted Successfully </h5>
            </div>
          </Stepper.Completed>
        </Stepper>

        {/* basic information */}
      </div>
    </>
  );
};

export default AddJob;
