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
} from "@mantine/core";

import EmailIcon from "@mui/icons-material/EmailOutlined";
import PinIcon from "@mui/icons-material/PersonPinCircleOutlined";
import PhoneIcon from "@mui/icons-material/LocalPhoneOutlined";
import React, { useState } from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

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
    borderRight: "1px solid #E5E5E5",
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
  const { classes } = inputStyles();
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
              <Container>
                <ContactDetails
                  title="Email"
                  desc="manalkiyani687@gmail"
                  Icon={EmailIcon}
                />

                <ContactDetails
                  title="Email"
                  desc="manalkiyani687@gmail"
                  Icon={EmailIcon}
                />

                <ContactDetails
                  title="Email"
                  desc="manalkiyani687@gmail"
                  Icon={EmailIcon}
                />
                <ContactDetails
                  title="Email"
                  desc="manalkiyani687@gmail"
                  Icon={EmailIcon}
                />
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
                  width: "40%",
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
                    src="https://res.cloudinary.com/djlewzcd5/image/upload/v1680546172/qzabhaixwlgsodp7x8p0.jpg"
                    alt="it's me"
                  />
                  <Title fw={600} className={classes.title} order={3}>
                    Leopard Camphill
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
                    { label: "Interview", value: "interview" },

                    { label: "accept", value: "accepted" },

                    { label: "Further Review", value: "further" },
                    { label: "Not a Fit", value: "notFit" },
                    { label: "Reject", value: "rejected" },
                  ]}
                />

                <Text fw={500} mb="md" mt="lg" order={6}>
                  Leave a Note
                </Text>
                <Textarea
                  autosize
                  description="Write notes here about the candidate and their application."
                />
                <Space h="md" />
                <Text fw={500} mb="md" mt="lg" order={6}>
                  Contact Details
                </Text>
                <ContactDetails
                  title="Email"
                  desc="manalkiyani687@gmail"
                  Icon={EmailIcon}
                />
                <ContactDetails
                  title="Phone"
                  desc="0333-509-2759"
                  Icon={PhoneIcon}
                />
                <ContactDetails
                  title="Address"
                  desc="Islamabad I-8/4"
                  Icon={PinIcon}
                />
              </Container>

              <Container
                style={{
                  minHeight: "900px",
                  width: "60%",
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
                    <ResumeViewer resumeUrl="https://www.africau.edu/images/default/sample.pdf" />
                  </Tabs.Panel>

                  <Tabs.Panel value="experience" pt="sm">
                    <ScrollArea h={800}>
                      {/*Experience */}
                      <Text fw={500} mb="md" mt="lg" order={4}>
                        Experience
                      </Text>
                      <Experience
                        dates={[
                          { title: "Start Date", value: "2019-01-01" },
                          { title: "End Date", value: "2019-01-01" },
                        ]}
                        title="Software Engineer"
                        company="Google"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        location="Mountain View, CA"
                      />
                      <Experience
                        dates={[
                          { title: "Start Date", value: "2019-01-01" },
                          { title: "End Date", value: "2019-01-01" },
                        ]}
                        title="Software Engineer"
                        company="Google"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        location="Mountain View, CA"
                      />

                      <Space h="xl" />

                      {/*Education */}
                      <Text fw={500} mb="md" mt="lg" order={4}>
                        Education
                      </Text>
                      <Education
                        Institute="Leopard Camphill"
                        Major="Computer Science"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                        location="Islamabad I-8/4"
                        dates={[
                          { title: "Start Date", value: "2019-01-01" },
                          { title: "End Date", value: "2019-01-01" },
                        ]}
                      />
                    </ScrollArea>
                  </Tabs.Panel>

                  <Tabs.Panel value="web" pt="sm">
                    <Space h="xl" />
                    <WebLinks
                      links={[
                        { title: "Github", link: "https://github.com/" },
                        { title: "LinkedIn", link: "https://LinkedIn.com/" },
                        { title: "Facebook", link: "https://Facebook.com/" },
                        { title: "Twitter", link: "https://Twitter.com/" },
                        { title: "Website", link: "https://Website.com/" },
                      ]}
                    />

                    <Space h="xl" />
                    <Text fw={500} mb="md" mt="lg" order={4}>
                      Optional Message
                    </Text>
                    <Text fz="sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Text>
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
  const docs = [
    { uri: require("../../../../resumes/myCV.pdf") }, // Local File
  ];

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

  const items = dates.map((date) => (
    <div key={date.title}>
      <Text size="xs" color="dimmed">
        {date.title}
      </Text>
      <Text weight={500} size="sm">
        {date.value}
      </Text>
    </div>
  ));

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

  const items = dates.map((date) => (
    <div key={date.title}>
      <Text size="xs" color="dimmed">
        {date.title}
      </Text>
      <Text weight={500} size="sm">
        {date.value}
      </Text>
    </div>
  ));

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