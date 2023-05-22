import {
  Divider,
  Flex,
  Group,
  Space,
  Text,
  TextInput,
  Title,
  createStyles,
  rem,
  Container,
  Checkbox,
  Button,
  Textarea,
  ThemeIcon,
} from "@mantine/core";
import { v4 as uuid } from "uuid";
import React, { useEffect, useState } from "react";
import DropImage from "./DropImage";
import { DatePickerInput } from "@mantine/dates";
import AddIcon from "@mui/icons-material/AddOutlined";

import Icon from "@mui/icons-material/AccountBalance";
import BusinessIcon from "@mui/icons-material/Business";
import { useParams } from "react-router-dom";
import axios from "axios";
import { uploadImage } from "../../../../utilityFunctions/imageUpload";
import toast, { Toaster } from "react-hot-toast";


const inputStyles = createStyles((theme) => ({
  icon: {
    color: theme.colors.gray[7],
    backgroundColor: theme.colors.gray[2],
  },
  root: {
    position: "relative",
  },

  input: {
    width: "100%",
    height: rem(30),
    paddingTop: rem(18),
    marginBottom: "2rem",
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
  innerContainer: {
    paddingTop: "2rem",
    paddingBottom: "1rem",
    width: "100%",
    borderRadius: "20px",
    marginTop: "15px",
  },

  innerestContainer: {
    marginTop: "15px",
  },
}));
const ApplyJob = () => {
  const { classes } = inputStyles();

  //data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [education, setEducation] = useState([]);
  //  {
  //     key: uuid(),
  //     institute: "",
  //     degree: "",
  //     major: "",
  //     startDate: "",
  //     endDate: "",
  //     description: "",
  //     grade: "",
  //   }
  const [experience, setExperience] = useState([]);
  //  {
  //     key: uuid(),
  //     company: "",
  //     title: "",
  //     startDate: "",
  //     endDate: "",
  //     description: "",
  //     location: "",
  //   }
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [website, setWebsite] = useState("");

  const [message, setMessage] = useState("");
  const [resume, setResume] = useState("");

  //education
  const [institute, setInstitute] = useState("");
  const [degree, setDegree] = useState("");
  const [major, setMajor] = useState("");
  const [sstartDate, ssetStartDate] = useState();
  const [eendDate, ssetEndDate] = useState();
  const [ddescription, ssetDescription] = useState("");
  const [grade, setGrade] = useState("");

  //experience
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const { jobId } = useParams();
  const handleSubmit = async () => {
    console.log("jobId", jobId);
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      phone === "" ||
      address === "" ||
      education.length === 0 ||
      experience.length === 0 ||
      resume === ""
    ) {
      console.log(
        firstName,
        lastName,
        email,
        phone,
        address,
        education,
        experience,
        resume
      );
      toast.error("Please fill all the required fields");
      return;
    }

    const link = await uploadImage(resume);
    console.log(
        firstName,
        lastName,
        email,
        phone,
        address,
        education,
        experience,
        resume
      );
try{
 const response = await axios.post("http://localhost:8800/api/applications/apply", {
      firstName,
      lastName,
      email,
      phone,
      address,
      education,
      experience,
      twitter,
      facebook,
      linkedIn, 
      website,
      message,
      resume: link || '',
      jobId,
    });
    if (response.status === 201) {
      toast.success("Your application has been submitted");
    }
    console.log(response)
}
catch(error){
console.log(error)
}
   
  };

  const addEducation = () => {
    console.log(institute);
    setEducation([
      ...education,
      {
        key: uuid(),
        institute,
        degree,
        major,

        startDate: sstartDate,
        endDate: eendDate,
        description: ddescription,
        grade,
      },
    ]);
  };
  const addExperience = () => {
    setExperience([
      ...experience,
      {
        key: uuid(),
        company,
        title,
        startDate,
        endDate,
        description,
        location,
      },
    ]);
  };

  const deleteEducation = (key) => {
    const newEducation = education.filter((item) => item.key !== key);
    setEducation(newEducation);
  };
  const deleteExperience = (key) => {
    const newExperience = experience.filter((item) => item.key !== key);
    setExperience(newExperience);
  };

  useEffect(() => {
    console.log("resume", resume);
  }, [resume]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Container>
        <Flex direction="column">
          {/* image */}
          <Container className={classes.innerContainer}>
            <Title color="#464F57" order={3}>
              Easy Apply
            </Title>
            <Text fz="md">Fill your job application</Text>
            <Space h="md" />
            <DropImage resume={resume} setResume={setResume} />
          </Container>

          <Divider my="sm" />
          {/* personal info */}
          <Container className={classes.innerContainer}>
            <Title color="#464F57" order={3}>
              Personal Information
            </Title>
            <Space h="md" />
            <Container
              className={classes.innerContainer}
              radius="xl"
              px="lg"
              bg="#FBFBFB"
            >
              <Group position="center" spacing="md" grow>
                <TextInput
                  label="First Name"
                  classNames={classes}
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <TextInput
                  label="Last Name"
                  classNames={classes}
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Group>

              <Group position="center" spacing="md" grow>
                <TextInput
                  label="Email"
                  classNames={classes}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextInput
                  label="Phone"
                  classNames={classes}
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Group>
              <TextInput
                label="Place of residence"
                classNames={classes}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Container>
          </Container>
          <Divider my="sm" />
          {/* experience */}
          <Container className={classes.innerContainer}>
            <Flex justify="space-between">
              <Title color="#464F57" order={3}>
                Experience
              </Title>
              {/*View Experience */}
            </Flex>
            <Space h="md" />
            {experience.map((exp) => {
              return (
                <ViewExperience
                  key={exp.key}
                  id={exp.key}
                  title={exp.title}
                  deleteExperience={deleteExperience}
                />
              );
            })}
            <Space h="md" />
            {/* <Experience /> */}
            <Experience
              company={company}
              setCompany={setCompany}
              title={title}
              setTitle={setTitle}
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              description={description}
              setDescription={setDescription}
              location={location}
              setLocation={setLocation}
              addExperience={addExperience}
            />
          </Container>
          <Divider my="sm" />
          {/* education */}

          <Container className={classes.innerContainer}>
            <Flex justify="space-between">
              <Title color="#464F57" order={3}>
                Education
              </Title>

              {/* <Button
              leftIcon={<AddIcon />}
              size="xs"
              color="cyan"
              variant="outline"
              radius="lg"
            >
              Add
            </Button> */}
            </Flex>
            <Space h="md" />
            {education.map((edu) => {
              return (
                <ViewEducation
                  key={edu.key}
                  id={edu.key}
                  institute={edu.institute}
                  deleteEducation={deleteEducation}
                />
              );
            })}
            <Space h="md" />

            <Education
              institute={institute}
              setInstitute={setInstitute}
              degree={degree}
              setDegree={setDegree}
              major={major}
              setMajor={setMajor}
              sstartDate={sstartDate}
              ssetStartDate={ssetStartDate}
              eendDate={eendDate}
              ssetEndDate={ssetEndDate}
              ddescription={ddescription}
              ssetDescription={ssetDescription}
              grade={grade}
              setGrade={setGrade}
              addEducation={addEducation}
            />
          </Container>
          <Divider my="sm" />
          {/* web */}
          <Container className={classes.innerContainer}>
            <Title color="#464F57" order={3}>
              On the Web
            </Title>
            <Space h="md" />
            <Group position="center" spacing="md" grow>
              <TextInput
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
                label="Linked In"
                classNames={classes}
              />
              <TextInput
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                label="Twitter"
                classNames={classes}
              />
            </Group>

            <Group position="center" spacing="md" grow>
              <TextInput
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                label="Facebook"
                classNames={classes}
              />
              <TextInput
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                label="Website"
                classNames={classes}
              />
            </Group>
          </Container>
          <Divider my="sm" />
          {/* hiring manager */}
          <Container className={classes.innerContainer}>
            <Title color="#464F57" order={3}>
              Message to Hiring Manager
            </Title>
            <Space h="md" />
            <Textarea
              // onChange={setMessage}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              description="Let the company know about your interest working there"
              autosize
              minRows={4}
            />
          </Container>
          <Divider my="sm" />
          <Space h="xl" />
          <Flex justify="flex-end">
            <Button onClick={handleSubmit} size="sm" color="cyan" radius="lg">
              Submit
            </Button>
          </Flex>
          <Space h="xl" />
        </Flex>
      </Container>
    </>
  );
};

export default ApplyJob;

const Experience = ({
  company,
  setCompany,
  title,
  setTitle,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  description,
  setDescription,
  location,
  setLocation,
  addExperience,
}) => {
  const [workHere, setWorkHere] = React.useState(false);

  const settingEndDate = () => {
    if (!workHere) {
      setEndDate(null);
    }
    setWorkHere(!workHere);
  };

  const checkInput = () => {
    if (company && title && startDate && location) {
      addExperience();
    } else {
      toast.error("Please fill the required fields");
    }
  };

  const { classes } = inputStyles();
  return (
    <Container
      className={classes.innerContainer}
      radius="xl"
      px="lg"
      bg="#FBFBFB"
    >
      <Group position="center" spacing="md" grow>
        <TextInput
          onChange={(e) => setTitle(e.target.value)}
          label="Title"
          classNames={classes}
          required
          value={title}
        />
        <TextInput
          label="Company"
          classNames={classes}
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
      </Group>
      <TextInput
        label="Office Location"
        classNames={classes}
        required
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <TextInput
        onChange={(e) => setDescription(e.target.value)}
        label="Description"
        classNames={classes}
        value={description}
      />

      <Group position="center" spacing="md" grow>
        <DatePickerInput
          popoverProps={{ withinPortal: true }}
          label="From"
          className={classes}
          clearable={false}
          required
          value={startDate}
          onChange={setStartDate}
        />
        <DatePickerInput
          popoverProps={{ withinPortal: true }}
          label="To"
          clearable={false}
          className={classes}
          required
          disabled={workHere}
          value={endDate}
          onChange={setEndDate}
        />
      </Group>
      <Space h="md" />
      <Checkbox label="I currently work here" onChange={settingEndDate} />
      <Space h="xl" />
      <Flex justify="flex-end">
        <Group>
          <Button size="xs" color="cyan" variant="outline">
            Cancel
          </Button>
          <Button onClick={checkInput} size="xs" color="cyan">
            Save
          </Button>
        </Group>
      </Flex>
    </Container>
  );
};

const Education = ({
  institute,
  setInstitute,
  degree,
  setDegree,
  major,
  setMajor,
  sstartDate,
  ssetStartDate,
  eendDate,
  ssetEndDate,
  ddescription,
  ssetDescription,
  grade,
  setGrade,
  addEducation,
}) => {
  console.log(typeof setInstitute);
  const [studyHere, setStudyHere] = React.useState(false);
  const { classes } = inputStyles();
  const handleCancel = () => {
    setInstitute("");
    setMajor("");
    setDegree("");
    setGrade("");
    ssetDescription("");
    ssetStartDate(null);
    ssetEndDate(null);
  };
  return (
    <Container
      className={classes.innerContainer}
      radius="xl"
      px="lg"
      bg="#FBFBFB"
    >
      <TextInput
        value={institute}
        onChange={(e) => setInstitute(e.target.value)}
        label="Institute"
        classNames={classes}
        required
      />

      <Group position="center" spacing="md" grow>
        <TextInput
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          label="Major"
          classNames={classes}
        />
        <TextInput
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          label="Degree"
          classNames={classes}
        />
      </Group>
      <TextInput
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        label="Grade"
        classNames={classes}
      />
      <TextInput
        value={ddescription}
        onChange={(e) => ssetDescription(e.target.value)}
        label="Description"
        classNames={classes}
      />
      <Group position="center" spacing="md" grow>
        <DatePickerInput
          popoverProps={{ withinPortal: true }}
          label="From"
          className={classes}
          clearable={false}
          required
          value={sstartDate}
          onChange={ssetStartDate}
        />
        <DatePickerInput
          popoverProps={{ withinPortal: true }}
          label="To"
          clearable={false}
          className={classes}
          required
          disabled={studyHere}
          value={eendDate}
          onChange={ssetEndDate}
        />
      </Group>
      <Space h="md" />
      <Checkbox
        label="I currently attend"
        onChange={() => setStudyHere(!studyHere)}
      />
      <Space h="xl" />
      <Flex justify="flex-end">
        <Group>
          <Button
            onClick={handleCancel}
            size="xs"
            color="cyan"
            variant="outline"
          >
            Cancel
          </Button>
          <Button onClick={addEducation} size="xs" color="cyan">
            Save
          </Button>
        </Group>
      </Flex>
    </Container>
  );
};
const ViewEducation = ({ institute, id, deleteEducation }) => {
  const { classes } = inputStyles();
  return (
    <Container className={classes.innerContainer} radius="xl" px="lg" bg="#fff">
      <Flex justify="space-between">
        <Group>
          <ThemeIcon size={60} radius="xl" className={classes.icon}>
            <Icon size="2rem" />
          </ThemeIcon>
          <Text fz="md">{institute}</Text>
        </Group>
        <Group>
          {/* <Button size="xs" color="cyan" variant="outline">
            Edit
          </Button> */}
          <Button onClick={() => deleteEducation(id)} size="xs" color="cyan">
            Delete
          </Button>
        </Group>
      </Flex>
    </Container>
  );
};
const ViewExperience = ({ title, id, deleteExperience }) => {
  const { classes } = inputStyles();
  return (
    <Container
      className={classes.innerestContainer}
      radius="xl"
      px="lg"
      bg="#fff"
    >
      <Flex justify="space-between">
        <Group>
          <ThemeIcon size={60} radius="xl" className={classes.icon}>
            <BusinessIcon size="2rem" />
          </ThemeIcon>
          <Text fz="md">{title}</Text>
        </Group>
        <Group>
          {/* <Button size="xs" color="cyan" variant="outline">
            Edit
          </Button> */}
          <Button onClick={() => deleteExperience(id)} size="xs" color="cyan">
            Delete
          </Button>
        </Group>
      </Flex>
    </Container>
  );
};
