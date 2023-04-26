import {
  Avatar,
  Container,
  Divider,
  Grid,
  Space,
  Title,
  createStyles,
  Tabs,
  Flex,
  Card,
  Text,
  Group,
  rem,
  RingProgress,
  SegmentedControl,
  Textarea,
  ScrollArea,
  Accordion,
  TextInput,
  Button,
} from "@mantine/core";

import EmailIcon from "@mui/icons-material/EmailOutlined";
import PinIcon from "@mui/icons-material/PersonPinCircleOutlined";
import PhoneIcon from "@mui/icons-material/LocalPhoneOutlined";
import React, { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import Application from "./Application";
import { getTemplateData } from "../../../../utilityFunctions/axiosFunctions";
import axios from "axios";
import { useParams } from "react-router-dom";
import { businessTemplate } from "../../../../TemplatesData/businessTemplate";
import { formatDate } from "../../../../utilityFunctions/helperFunctions";

const inputStyles = createStyles((theme) => ({
  innerContainer: {
    paddingTop: "2rem",
    marginBottom: "2rem",
    width: "100%",
    borderRadius: "20px",
    minHeight: "90vh",
    border: "1px solid #E5E5E5",
  },
  Container: {
    padding: "2rem 3rem 2rem 3rem",

    maxWidth: "100rem",
  },
  mainContainer: {
    padding: 0,
    overflowX: "hidden",
  },
  noPadding: {
    padding: 0,
  },
  applicationContainer: {
    padding: "30px",
    paddingTop: "100px",
  },
  Item: {
    padding: 0,
  },
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

const ApplicationDetail = () => {
  const { id } = useParams();
  const { classes } = inputStyles();
  const [jobs, setJobs] = useState([]);
  const [jobsCopy, setJobsCopy] = useState([]);
  const [jobIds, setJobIds] = useState([]);
  const [application, setApplication] = useState({});

  const [status, setStatus] = useState("pending");
  const [recruiterRemarks, setRecruiterRemarks] = useState("");

  const getJobIds = async () => {
    console.log("id", id);

    if (id === "004") {
      console.log("here");
      setJobIds(businessTemplate.data.jobs);
      getApplications(businessTemplate.data.jobs);
    } else {
      const Template = await getTemplateData(id);
      if (Template.data?.jobs) {
        setJobIds(Template.data.jobs);

        getApplications(Template.data.jobs);
      }
    }
  };
  const getApplications = async (jobIds) => {
    const response = await axios.post("http://localhost:8800/api/jobs/list", {
      jobIds,
    });
    console.log("response", response);
    if (response.status === 200) {
      console.log("response.data", response.data);
      setJobs(response.data.jobs);
      setJobsCopy(response.data.jobs);
      setApplication(response.data.jobs[0].applications[0]);
    }
  };

  const updateApplication = async () => {
    const response = await axios.post(
      `http://localhost:8800/api/jobs/application/${application._id}`,
      {
        status,
        recruiterRemarks,
      }
    );
    console.log("response", response);
  };

  useEffect(() => {
    getJobIds();
  }, []);

  const filterApplications = (value) => {
    // const value = e.target.value;
    const filteredJobs = jobsCopy.filter((job) => {
      console.log(job);
      return job.title.toLowerCase().includes(value.toLowerCase());
    });
    setJobs(filteredJobs);
  };
  return (
    <Container
      style={{ overflow: "hidden" }}
      className={classes.mainContainer}
      size="100vw"
      bg="#E7E9EB"
    >
      <Grid columns={16}>
        <Grid.Col sm={4} className={classes.noPadding}>
          <ScrollArea h={670}>
            <Container
              style={{
                width: "25%",
                position: "fixed",
                left: 0,
                bottom: 0,
                top: 0,
              }}
              className={classes.applicationContainer}
              bg="#fff"
            >
              <Container
                style={{
                  marginTop: "2rem",
                }}
              >
                <Accordion style={{ marginBottom: "2rem" }} variant="separated">
                  <Accordion.Item value="credit-card">
                    <Accordion.Control>
                      Search for Applications & Jobs
                    </Accordion.Control>
                    <Accordion.Panel>
                      <TextInput
                        placeholder="Software Engineer, Web Developer"
                        required
                        onChange={(e) => filterApplications(e.target.value)}
                      />
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
                {jobs.map((job) =>
                  job.applications.map((application) => {
                    return (
                      <Application
                        setApplication={setApplication}
                        jobTitle={job.title}
                        application={application}
                      />
                    );
                  })
                )}
              </Container>
            </Container>
          </ScrollArea>
        </Grid.Col>

        <Grid.Col className={classes.noPadding} sm={12}>
          <Container className={classes.Container}>
            <Flex>
              <Container
                style={{
                  minHeight: "730px",
                  width: "35%",
                  boxSizing: "border-box",
                }}
                px="xl"
                bg="#fff"
                className={classes.innerContainer}
                radius="xl"
              >
                <Flex
                  mih={60}
                  gap="md"
                  align="center"
                  direction="column"
                  wrap="wrap"
                >
                  <Avatar
                    radius="50px"
                    size="6rem"
                    src="https://res.cloudinary.com/djlewzcd5/image/upload/v1682526249/user-icon-person-icon-client-symbol-profile-icon-vector_qmugnc.webp"
                    alt="it's me"
                  />
                  <Title fw={600} className={classes.title} order={3}>
                    {application?.firstName} {application?.lastName}
                  </Title>
                </Flex>

                <Space h="md" />
                <Divider my="sm" />
                <Text fw={500} mb="lg" mt="lg" order={6}>
                  Review Resume
                </Text>

                <SegmentedControl
                  size="xs"
                  data={[
                    { label: "Hire", value: "hired" },
                    { label: "Pending", value: "pending" },
                    { label: "Interview", value: "interview" },

                    { label: "accept", value: "accepted" },

                    { label: "Further Review", value: "further" },
                    { label: "Not a Fit", value: "notFit" },
                    { label: "Reject", value: "rejected" },
                  ]}
                  value={status}
                  onChange={setStatus}
                />

                <Text fw={500} mb="md" mt="lg" order={6}>
                  Leave a Note
                </Text>
                <Textarea
                  value={recruiterRemarks}
                  onChange={(e) => setRecruiterRemarks(e.target.value)}
                  autosize
                  description="Write notes here about the candidate and their application"
                />
                <Button
                  onClick={updateApplication}
                  color="cyan"
                  radius="xl"
                  size="xs"
                >
                  update
                </Button>
                <Space h="md" />
                <Text fw={500} mb="md" mt="lg" order={6}>
                  Contact Details
                </Text>
                <ContactDetails
                  title="Email"
                  desc={application?.email}
                  Icon={EmailIcon}
                />
                <ContactDetails
                  title="Phone"
                  desc={application?.phone}
                  Icon={PhoneIcon}
                />
                <ContactDetails
                  title="Address"
                  desc={application?.address}
                  Icon={PinIcon}
                />
              </Container>

              <Container
                style={{
                  minHeight: "900px",
                  width: "65%",
                  boxSizing: "border-box",
                }}
                px="xl"
                bg="#fff"
                className={classes.innerContainer}
                radius="xl"
              >
                <Tabs
                  color="cyan"
                  variant="outline"
                  radius="md"
                  defaultValue="resume"
                >
                  {/* Tabs  */}
                  <Tabs.List>
                    <Tabs.Tab value="resume">Resume</Tabs.Tab>
                    <Tabs.Tab value="experience">
                      {" "}
                      Education and Experience
                    </Tabs.Tab>
                    <Tabs.Tab value="web">On the Web</Tabs.Tab>
                  </Tabs.List>

                  <Tabs.Panel value="resume" pt="sm">
                    <ResumeViewer resumeUrl={application?.resume} />
                  </Tabs.Panel>

                  <Tabs.Panel value="experience" pt="sm">
                    <ScrollArea h={800}>
                      {/*Experience */}
                      <Text fw={500} mb="md" mt="lg" order={4}>
                        Experience
                      </Text>
                      {application?.experience?.map((experience) => {
                        return (
                          <Experience
                            key={experience._id}
                            dates={[
                              {
                                title: "Start Date",
                                value: experience.startDate,
                              },
                              { title: "End Date", value: experience.endDate },
                            ]}
                            title={experience.title}
                            company={experience.company}
                            description={experience.description}
                            location={experience.location}
                          />
                        );
                      })}

                      <Space h="xl" />
                      {/*Education */}
                      <Text fw={500} mb="md" mt="lg" order={4}>
                        Education
                      </Text>

                      {application?.education?.map((education) => {
                        return (
                          <Education
                            key={education._id}
                            Institute={education.institute}
                            Major={education.major}
                            description={education.description}
                            location="Islamabad I-8/4"
                            dates={[
                              {
                                title: "Start Date",
                                value: education.startDate,
                              },
                              { title: "End Date", value: education.endDate },
                            ]}
                          />
                        );
                      })}
                    </ScrollArea>
                  </Tabs.Panel>

                  <Tabs.Panel value="web" pt="sm">
                    <Space h="xl" />
                    <WebLinks
                      links={[
                        { title: "LinkedIn", link: application?.linkedIn },
                        { title: "Facebook", link: application?.facebook },
                        { title: "Twitter", link: application?.twitter },
                        { title: "Website", link: application?.website },
                      ]}
                    />

                    <Space h="xl" />
                    <Text fw={500} mb="md" mt="lg" order={4}>
                      Optional Message
                    </Text>
                    <Text fz="sm">{application?.message}</Text>
                  </Tabs.Panel>
                </Tabs>
              </Container>
            </Flex>
          </Container>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default ApplicationDetail;

function ContactDetails({ title, desc, Icon }) {
  const { classes } = inputStyles();
  return (
    <Card mb="md" shadow="xs">
      <Flex align="center" justify="flex-start">
        <Avatar radius="md">
          <Icon size="1.5rem" />
        </Avatar>
        <Space w="xl" />
        <Card.Section>
          <Text fz="sm" fw={700} className={classes.title}>
            {title}
          </Text>

          <Text color="dimmed" size="sm">
            {desc}
          </Text>
        </Card.Section>
      </Flex>
    </Card>
  );
}
//upload on server and give link
function ResumeViewer({ resumeUrl }) {
  const docs = [{ uri: resumeUrl }]; // Modified this line

  return (
    <DocViewer
      style={{ width: 600, height: 850 }}
      pluginRenderers={DocViewerRenderers}
      documents={docs}
    />
  );
}

//Institute = 'Leopard Camphill'
//Major = 'Computer Science'
//description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
//location = 'Islamabad I-8/4'
//dates = [{title: 'Start Date', value: '2019-01-01'}, {title: 'End Date', value: '2019-01-01'}}]

function Education({ Institute, Major, description, grade = "0", dates = [] }) {
  const { classes } = inputStyles();

  const items = dates.map((date) => {
    const newDate = formatDate(date.value);

    return (
      <div key={date.title}>
        <Text size="xs" color="dimmed">
          {date.title}
        </Text>
        <Text weight={500} size="sm">
          {newDate}
        </Text>
      </div>
    );
  });

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Group position="apart" mt="md">
        <Text fz="sm" fw={700} className={classes.title}>
          {Institute}
        </Text>
        <Group spacing={5}>
          <Text fz="md">{Major}</Text>
          <RingProgress size={18} sections={[{ value: 80, color: "blue" }]} />
        </Group>
      </Group>
      <Flex align="center">
        <PinIcon size="1rem" />
        <Space w="xs" />
        <Text mt="sm" mb="md" c="dimmed" fz="xs">
          {grade}
        </Text>
      </Flex>

      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        {description}
      </Text>
      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  );
}

//dates = [{title: 'Start Date', value: '2019-01-01'}, {title: 'End Date', value: '2019-01-01'}}]
//title = 'Software Engineer'
//company = 'Google'
//description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
//location = 'Mountain View, CA'

function Experience({ title, company, description, location, dates = [] }) {
  const { classes } = inputStyles();

  const items = dates.map((date) => {
    const newDate = formatDate(date.value);

    return (
      <div key={date.title}>
        <Text size="xs" color="dimmed">
          {date.title}
        </Text>
        <Text weight={500} size="sm">
          {newDate}
        </Text>
      </div>
    );
  });

  return (
    <Card withBorder padding="lg" className={classes.card}>
      <Group position="apart" mt="md">
        <Text fz="sm" fw={700} className={classes.title}>
          {title}
        </Text>
        <Group spacing={5}>
          <Text fz="md">{company}</Text>
          <RingProgress size={18} sections={[{ value: 80, color: "blue" }]} />
        </Group>
      </Group>
      <Flex align="center">
        <PinIcon size="1rem" />
        <Space w="xs" />
        <Text mt="sm" mb="md" c="dimmed" fz="xs">
          {location}
        </Text>
      </Flex>

      <Text mt="sm" mb="md" c="dimmed" fz="xs">
        {description}
      </Text>
      <Card.Section className={classes.footer}>{items}</Card.Section>
    </Card>
  );
}

function WebLinks({ links }) {
  const { classes } = inputStyles();
  return (
    <Flex align="center" wrap="wrap">
      {links.map((item) => (
        <Card
          key={item.title}
          mr="md"
          miw="300px"
          mb="md"
          shadow="xs"
          component="a"
          target="blank"
          href={item.link}
        >
          <Card.Section px="2rem">
            <Text mt="md" fz="sm" fw={700} className={classes.title}>
              {item.title}
            </Text>

            <Text mb="md" color="dimmed" size="sm">
              {item.link}
            </Text>
          </Card.Section>
        </Card>
      ))}
    </Flex>
  );
}
