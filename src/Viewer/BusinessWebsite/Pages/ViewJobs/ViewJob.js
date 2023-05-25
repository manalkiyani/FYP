import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
  rem,
  Flex,
} from "@mantine/core";
import PersonPinIcon from "@mui/icons-material/PersonPinCircleOutlined";
import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { formatDate } from "../../../../utilityFunctions/helperFunctions";
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

const ViewJob = ({ job, view }) => {
  const [formattedDate, setFormattedDate] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setFormattedDate(formatDate(job?.deadline));
  }, []);
  const { classes } = useStyles();

  return (
    <Card
      style={{ cursor: "pointer", marginBottom:'50px' }}
      withBorder
      radius="md"
      className={classes.card}
    >
      <div style={{backgroundColor:"#EDFAF8", padding:'10px'}}>
      <Group onClick={() => navigate(`${job._id}`)} position="apart" mt="md">
        <div>
          <Text fz="xl" fw={700} onClick={() => navigate(`${job._id}`)}>
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
      </div>

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
            <Salary fz="xs" showPayBy={job?.showPayBy} job={job} />
            <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
              per month
            </Text>
          </div>

          {view ? null : (
            <Button
            style={{backgroundColor:"#EDFAF8"}}
              variant="default"
              onClick={() => navigate(`${job._id}/apply`)}
              color="cyan"
              size="sm"
              radius="xl"
            >
              Apply Now
            </Button>
          )}
        </Flex>
      </Card.Section>
    </Card>
  );
};
export default ViewJob;

export const Salary = ({ showPayBy, job }) => {
  switch (showPayBy) {
    case "Range": {
      return (
        <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
          {job.range.min}$ - {job.range.max}$
        </Text>
      );
    }

    case "Starting amount": {
      return (
        <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
          Starting {job.startingAmount}$
        </Text>
      );
    }

    case "Exact amount": {
      return (
        <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
          {job.exactAmount}$
        </Text>
      );
    }

    case "Maximum amount": {
      return (
        <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
          Maximum {job.maximumAmount}$
        </Text>
      );
    }

    default:
      {
        return <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}></Text>;
      }
      break;
  }
};
