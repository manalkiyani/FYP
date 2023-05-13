import {
  createStyles,
  Card,
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

export function ViewAppointment({ doctor, day, status, slot, patientName }) {
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
           Monday -  7:30 AM to 8:30AM
            </Text>
          </div>
        </Group>
        <Badge mt="lg" color="red">
          {"Booked"}
        </Badge>
      </Flex>
      

      <Card.Section className={classes.footer}>
           <Text fw={500}>Patients Info</Text>
           <Text fw={300} fz="sm" mt="md">
        Research indicates that staying physically active can help prevent or
        delay certain diseases, including some cancers, heart disease and
        diabetes, and also relieve depression and improve mood. Inactivity often
        accompanies advancing age, but it doesn't have to. Check with your local
        churches or synagogues, senior centers, and shopping malls for exercise
        and walking programs. Like exercise, your eating habits are often not
        good if you live and eat alone. It's important for successful aging to
        eat foods rich in nutrients and avoid the empty calories in candy and
        sweets
      </Text>
            <Flex justify="space-between">
        <Group spacing="xl" mt="lg">
         
          <div>
            <Text fw={500}>Churchil Gardelnowl</Text>
            <Text fz="xs" c="dimmed">
            18 years - female
            </Text>
          </div>
          
        </Group>
         <Text mt="lg" fz="sm" c="dimmed">
            Video Call
          </Text>
        </Flex>
       
       
      </Card.Section>
    </Card>
  );
}
