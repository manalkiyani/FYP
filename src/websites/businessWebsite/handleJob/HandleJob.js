import {
  Card,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
  rem,
  Flex,
} from "@mantine/core";

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../utilityFunctions/helperFunctions";
import axios from "axios";

import { Toaster, toast } from "react-hot-toast";
import { Salary } from "../../../Viewer/BusinessWebsite/Pages/ViewJobs/ViewJob";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    marginBottom: theme.spacing.lg,
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

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

const HandleJob = ({ job, DeleteJob, handleEditJob }) => {
  const [formattedDate, setFormattedDate] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setFormattedDate(formatDate(job?.deadline));
  }, []);

  const { classes } = useStyles();

  return (
    <>
      <Card
        style={{ cursor: "pointer" }}
        withBorder
        radius="md"
        className={classes.card}
      >
        <Group onClick={() => navigate(`${job._id}`)} position="apart" mt="md">
          <div>
            <Text fw={500} onClick={() => navigate(`${job._id}`)}>
              {job.title}
            </Text>

            <Text fz="xs" c="dimmed">
              {job.employmentType} , {job?.location}
            </Text>
          </div>
          <Badge color="red" size="lg">
            {formattedDate} -end date
          </Badge>
        </Group>

        <Card.Section
          onClick={() => navigate(`${job._id}`)}
          className={classes.section}
          mt="md"
        >
          <Text fz="sm" c="dimmed" className={classes.label}>
            Basic Requirements
          </Text>

          <Group spacing={8} mb={-8}>
            <Center>
              <Text size="xs">{job?.minimumQualification}</Text>
            </Center>
          </Group>
        </Card.Section>

        <Card.Section className={classes.section}>
          <Flex justify="space-between">
            <div>
              <Salary showPayBy={job?.showPayBy} job={job} />
              <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
                per month
              </Text>
            </div>
            <Group>
              <Button
                variant="default"
                onClick={() => handleEditJob(job)}
                style={{ width: "5rem" }}
                color="cyan"
                size="sm"
                radius="xl"
              >
                Edit
              </Button>
              <Button
                variant="default"
                onClick={() => DeleteJob(job._id)}
                color="cyan"
                style={{ width: "5rem" }}
                size="sm"
                radius="xl"
              >
                Delete
              </Button>
            </Group>
          </Flex>
        </Card.Section>
      </Card>
    </>
  );
};
export default HandleJob;
