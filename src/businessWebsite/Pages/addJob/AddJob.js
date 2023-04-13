import React, { useState } from "react";
import styles from "./AddJob.module.css";
import job1 from "../../../assets/business/job1.jpg";
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
const AddJob = () => {
  //save data
  const [Title, setTitle] = useState("");
  const [Type, setType] = useState("");
  const [Location, setLocation] = useState("");
  const [Qualification, setQualification] = useState("");
  const [Deadline, setDeadline] = useState("");
  const [StartDate, setStartDate] = useState("");
  const [Description, setDescription] = useState("");
  const [ShowPayBy, setShowPayBy] = React.useState("Range");
  const [Range, setRange] = useState({ min: "", max: "" });
  const [StartingAmount, setStartingAmount] = useState("");
  const [MaximumAmount, setMaximumAmount] = useState("");
  const [ExactAmount, setExactAmount] = useState("");
  const [detailsFile, setDetailsFile] = useState("");

  const quillRef = React.useRef(null);
  const [desc, setdesc] = useState(null);

  const { classes } = inputStyles();

  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const saveInformation = () => {
    console.log("saveInformation");
    console.log(StartingAmount);
    console.log(MaximumAmount);
    nextStep();
    











  };
  return (
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
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Select
              mt="md"
              mb={15}
              withinPortal
              data={[
                "Full-time",
                "Part-time",
                "Temporary",
                "Intern",
                "Contract",
              ]}
              value={Type}
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
              value={Location}
              onChange={(e) => setLocation(e.target.value)}
              radius="xl"
              size="md"
              data={["InOffice", "Remote", "Both"]}
            />

            <DatePickerInput
              mt="md"
              popoverProps={{ withinPortal: true }}
              label="Application deadline"
              classNames={classes}
              clearable={false}
              required
              value={Deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
            <DatePickerInput
              mt="md"
              popoverProps={{ withinPortal: true }}
              label="Expected Start Date"
              classNames={classes}
              clearable={false}
              value={StartDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <Text className={classes.text} mt="sm" mb={10}>
              Minimum Qualification
            </Text>
            <SegmentedControl
              radius="xl"
              size="md"
              data={[
                "Associate",
                "Masters",
                "Bachelors",
                "Ph.D",
                "Pursuing Degree",
              ]}
              value={Qualification}
              onChange={(e) => setQualification(e.target.value)}
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
              value={ShowPayBy}
              onChange={setShowPayBy}
            />

            <SalaryChoice
              setExactAmount={setExactAmount}
              setMaximumAmount={setMaximumAmount}
              setStartingAmount={setStartingAmount}
              setRange={setRange}
              classes={classes}
              option={ShowPayBy}
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
              placeholder="Pick file"
              label="Upload a PDf or Docx file"
              withAsterisk
              mb={20}
              classNames={classes}
            />
            <div style={{ height: "50vh" }}>
              <ReactQuill
                ref={quillRef}
                placeholder={
                  "  Describe the responsibilities of this job, required work experience,skills, or education"
                }
                style={{ height: "90%" }}
                theme="snow"
                value={Description}
                onChange={setDescription}
                modules={modules}
              />
            </div>
          </div>
          <Group position="center" mt="xl">
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            <Button color="cyan" onClick={saveInformation}>
              Submit Now
            </Button>
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
  );
};

export default AddJob;
