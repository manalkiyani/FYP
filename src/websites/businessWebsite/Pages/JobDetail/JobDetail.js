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
  Badge,
  Center,
  Button,
} from "@mantine/core";
import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../../utilityFunctions/helperFunctions";
import { Link } from "@mui/material";
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    marginBottom: theme.spacing.lg,
  },
  Container: {
    paddingLeft: "20rem",
    paddingRight: "20rem",
    paddingTop: "2rem",
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: "uppercase",
  },
  link: {
    display: "block",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: rem(3),
    paddingBottom: rem(3),

    "&:hover": {
      textDecoration: "underline",
    },
  },

  section: {
    padding: theme.spacing.md,
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));
const JobDetail = () => {
  const { jobId } = useParams();
  const [job, setJob] = React.useState({});
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const getJob = async () => {
    const response = await axios.get(`http://localhost:8800/api/jobs/${jobId}`);

    if (response.status === 200) {
      setJob(response.data.job);
      console.log(response);
    }
    const job = response.data.job;
    job?.startDate && setStartDate(formatDate(job?.startDate));
    job?.deadline && setEndDate(formatDate(job?.deadline));
  };
  useEffect(() => {
    getJob();
    console.log(jobId);
  }, []);

  const { classes } = useStyles();
  return (
    <Container
      bg="#FBFBFB"
      className={classes.Container}
      size="300rem"
      padding="xl"
      mih="100vh"
    >
      <Flex justify="flex-start" direction="column">
        <Card mih="100vh" withBorder radius="md" className={classes.card}>
          <Group position="apart" mb="xl" mt="md">
            <div>
              <Text fw={500}>{job?.title}</Text>

              <Text fz="xs" c="dimmed">
                {job?.employmentType} , {job?.location}
              </Text>
            </div>

         
          </Group>
          <Divider />
          <Card.Section className={classes.section}>
            <Flex justify="space-between">
              <div>
                <Text fz="sm" c="dimmed" className={classes.label}>
                  Basic Requirements
                </Text>

                <Group spacing={8} mb={-8}>
                  <Center>
                    <Text size="xs">{job?.minimumQualification}</Text>
                  </Center>
                  <Badge color="red" size="lg">
                    {endDate} -end date
                  </Badge>
                </Group>
              </div>

              <div>
                {job?.minimumAmount && (
                  <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                    {job.minimumAmount}$
                  </Text>
                )}
                {job?.exactAmount && (
                  <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                    {job.exactAmount}$
                  </Text>
                )}
                {job?.startingAmount && (
                  <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                    {job.startingAmount}$
                  </Text>
                )}
                {job?.range && (
                  <Text fz="xl" fw={600} sx={{ lineHeight: 1 }}>
                    {job.range.min}$ - {job.range.max}$
                  </Text>
                )}
                <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
                  per month
                </Text>
              </div>
            </Flex>
          </Card.Section>

          <Card.Section className={classes.section}>
            <Text fz="sm">
              Click on the link below to know more about the job
            </Text>
            {/* <a fz="sm" c="dimmed">
     
            </a> */}
            <Text
              fz="sm"
              component="a"
              target="_blank"
              href={job?.descriptionFile}
              className={classes.link}
            >
              {job?.descriptionFile}
            </Text>

            <Divider mt="md" />
          </Card.Section>
          <Card.Section className={classes.section}>
            <div
              style={{
                margin: "15px",
                marginTop: "10px",
                textAlign: "justify",
              }}
              dangerouslySetInnerHTML={{ __html: job?.description }}
            ></div>
          </Card.Section>
        </Card>
      </Flex>
    </Container>
  );
};

export default JobDetail;
