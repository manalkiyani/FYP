import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  rem,
  Flex,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

export function CheckAppointment({ doctor, day, status, slot, patientName }) {
  const { classes, theme } = useStyles();

  return (
    <Card
      style={{ width: "650px" }}
      withBorder
      padding="sm"
      radius="md"
      className={classes.card}
    >
      <Flex justify="space-between">
        <Group spacing="xl" mt="lg">
          <Avatar
            src="https://res.cloudinary.com/djlewzcd5/image/upload/v1683976266/pexels-pixabay-220453_eak891.jpg"
            radius="sm"
          />
          <div>
            <Text fw={500}>Dr. Elsa Gardelnowl</Text>
            <Text fz="xs" c="dimmed">
              Monday
            </Text>
          </div>
        </Group>
        <Badge mt="lg" color="red">
          {"Booked"}
        </Badge>
      </Flex>

      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text  fz="sm" >
            7:30 AM to 8:30AM 
            
          </Text>
          <Text fz="sm" c="dimmed" >
              Video Call
            </Text>
        </Group>
      </Card.Section>
    </Card>
  );
}
