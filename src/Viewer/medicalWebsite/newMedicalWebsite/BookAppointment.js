import {
  Button,
  Container,
  Divider,
  Flex,
  Group,
  NumberInput,
  Select,
  Space,
  Text,
  TextInput,
  Textarea,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
const inputStyles = createStyles((theme) => ({
  container: {
    width: rem(350),
  },
  root: {
    position: "relative",
  },
  time: {
    height: rem(35),
    border: "1px solid #ccc",
    width: rem(150),

    marginBottom: rem(16),
  },

  input: {
    height: rem(50),
    paddingTop: rem(18),
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
  text: {
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
    fontWeight: 500,
  },
}));
const BookAppointment = () => {
  const [name, setName] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [day, setDay] = useState("");
  const [slots, setSlots] = useState([
    "2:30 AM - 3:00 AM",
    "3:00 AM - 3:30 AM",
    "3:30 AM - 4:00 AM",
  ]);
  const { classes } = inputStyles();
  return (
    <Container size="80rem">

         <Divider my="sm" />
           <Title order={3}>Book An Appointment</Title>
          <Divider my="sm" />
          <Space h="xl"/>
      <div>
        <Group spacing="xs" grow>
          <TextInput
            label="Patient Full Name"
            placeholder="Joseffine Luther "
            classNames={classes}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Select
            mt="md"
            mb={15}
            withinPortal
            data={["Home", "Clinic", "Video Call", "Phone Call"]}
            value={sessionType}
            onChange={setSessionType}
            placeholder="Pick one"
            label="Session Type"
            classNames={classes}
            required
          />
        </Group>

        <Group spacing="xs" grow>
          <TextInput
            label="Contatc Email"
            placeholder="johnny@gmail.com"
            classNames={classes}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Select
            mt="md"
            mb={15}
            withinPortal
            data={["Male", "Female", "Custom"]}
            value={gender}
            onChange={setGender}
            placeholder="Pick one"
            label="Gender"
            classNames={classes}
            required
          />
        </Group>
        <Group spacing="xs" grow>
          <Textarea
            placeholder="Describe your medical concern in 200 words or less"
            label="Your primary medical concern"
            variant="filled"
            withAsterisk
            minRows={4}
            value={description}
            onChange={setDescription}
          />
          <NumberInput
            defaultValue={18}
            placeholder="18 years"
            label="Age (years)"
            withAsterisk
            value={age}
            onChange={setAge}
          />
        </Group>
      </div>
      <Select
        mt="md"
        mb={15}
        withinPortal
        data={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
        value={day}
        onChange={setDay}
        placeholder="Pick one"
        label="Day"
        classNames={classes}
        required
      />
      <Text mb="sm" withAsterisk fz="sm">
        {" "}
        Choose a Slot
      </Text>

      <Flex wra="wrap">
        {slots.map((slot) => {
          return (
            <Button mr="sm" radius="xl" variant="default">
              {slot}
            </Button>
          );
        })}
      </Flex>
      <Space h="xl" />
      <Group position="center" mt="xl">
        <Button variant="default">Cancel</Button>
        <Button color="cyan">Book Now</Button>
      </Group>
    </Container>
  );
};

export default BookAppointment;
