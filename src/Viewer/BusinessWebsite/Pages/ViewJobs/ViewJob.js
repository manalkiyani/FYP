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

const ViewJob = ({ job }) => {
  const [formattedDate, setFormattedDate] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setFormattedDate(formatDate(job?.deadline));
  }, []);
  const { classes } = useStyles();

  return (
    <Card
      style={{ cursor: "pointer" }}
      withBorder
      radius="md"
      className={classes.card}
    >
      <Group position="apart" mt="md">
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

      <Card.Section className={classes.section} mt="md">
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

          <Button 
            onClick={() => navigate(`${job._id}/apply`)}
          color="cyan" size="sm" radius="xl">
            Apply Now
          </Button>
        </Flex>
      </Card.Section>
    </Card>
  );
};
export default ViewJob;
