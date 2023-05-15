import {
  createStyles,
  Card,
  Image,
  Avatar,
  Text,
  Group,
  rem,
  Menu,
  ActionIcon,
  Flex,
  Button,
} from "@mantine/core";

import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontWeight: 630,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

export function ViewerDoctorCard({
  image,
  title,
  id,
  view,
  qualification,
  experience,
  department,
}) {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const BookAppointment = () => {
    navigate(`${id}/appointment`);
  };

  return (
    <Card
      style={{ width: "700px", height: "190px" }}
      withBorder
      radius="md"
      p={0}
      className={classes.card}
    >
      <Group noWrap spacing={0}>
        <Image
          onClick={() => navigate(`${id}`)}
          src={image}
          height={190}
          width={160}
        />
        <div className={classes.body}>
          <Flex justify="flex-end">
            <Button variant="default" onClick={BookAppointment}>
              Book Appointment
            </Button>
          </Flex>

          <Text
            onClick={() => navigate(`${id}`)}
            fz={26}
            className={classes.title}
            mt="xs"
            mb="md"
          >
            {/* {title} */} DR. {title}
          </Text>

          <Card.Section style={{ width: "500px" }} className={classes.footer}>
            <div>
              <Text size="xs" color="dimmed">
                Qualification
              </Text>
              <Text weight={500} size="sm">
                {qualification}
              </Text>
            </div>
            <div>
              <Text size="xs" color="dimmed">
                Experience
              </Text>
              <Text weight={500} size="sm">
                {experience} years
              </Text>
            </div>
            <div>
              <Text size="xs" color="dimmed">
                Department
              </Text>
              <Text weight={500} size="sm">
                {department}
              </Text>
            </div>
          </Card.Section>
        </div>
      </Group>
    </Card>
  );
}
