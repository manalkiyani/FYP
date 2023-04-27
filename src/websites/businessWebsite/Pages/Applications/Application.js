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
  Accordion,
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

const Application = ({ application, jobTitle, setApplication }) => {
  const navigate = useNavigate();

  const { classes } = useStyles();

  return (
    <Card
      style={{ cursor: "pointer" }}
      withBorder
      radius="md"
      className={classes.card}
    >
      <Group position="apart" mt="md">
        {/* onClick={() => navigate(`${job._id}`)} */}
        <Text fw={500}>
          {application.firstName} {application.lastName}
        </Text>
        <Center>
          <Text color="dimmed" size="xs">
            AS {jobTitle}
          </Text>
        </Center>
      </Group>
      <Text color="dimmed" size="xs">
        <b> Your remarks </b> {application?.recruiterRemarks}
      </Text>
      <Card.Section mt={20} className={classes.section}>
        <Flex justify="space-between">
          {/* <Text fz="xl" fw={600} sx={{ lineHeight: 1 }}>
           
          </Text> */}
          {application.status === "accepted" ? (
            <Badge color="green" size="lg">
              {application.status}
            </Badge>
          ) : (
            <Badge color="red" size="lg">
              {application.status}
            </Badge>
          )}

          <Button
            onClick={() => setApplication(application)}
            color="cyan"
            size="xs"
            radius="xl"
            variant="default"
          >
            View Now
          </Button>
        </Flex>
      </Card.Section>
    </Card>
  );
};
export default Application;
