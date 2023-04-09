import {
  Divider,
  Flex,
  Group,
  Space,
  Text,
  TextInput,
  Title,
  createStyles,
  rem,
  Container,
  Checkbox,
  Button,
  Textarea,
} from "@mantine/core";
import React from "react";
import DropImage from "./DropImage";
import { DatePickerInput } from "@mantine/dates";
import AddIcon from "@mui/icons-material/AddOutlined";
const inputStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    width: "100%",
    height: rem(30),
    paddingTop: rem(18),
    marginBottom: "2rem",
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
  innerContainer: {
    paddingTop: "2rem",
    paddingBottom: "1rem",
    width: "100%",
    borderRadius: "20px",
  },
}));
const ApplyJob = () => {
  const { classes } = inputStyles();
  return (
    <Container>
      <Flex direction="column">
        {/* image */}
        <Container className={classes.innerContainer}>
          <Title color="#464F57" order={3}>
            Easy Apply
          </Title>
          <Text fz="md">
            Choose an option to autocomplete your application. You can still
            fill your profile manually.
          </Text>
          <Space h="md" />
          <DropImage />
        </Container>

        <Divider my="sm" />
        {/* personal info */}
        <Container className={classes.innerContainer}>
          <Title color="#464F57" order={3}>
            Personal Information
          </Title>
          <Space h="md" />
          <Container
            className={classes.innerContainer}
            radius="xl"
            px="lg"
            bg="#FBFBFB"
          >
            <Group position="center" spacing="md" grow>
              <TextInput label="First Name" classNames={classes} required />
              <TextInput label="Last Name" classNames={classes} required />
            </Group>

            <Group position="center" spacing="md" grow>
              <TextInput label="Email" classNames={classes} required />
              <TextInput label="Phone" classNames={classes} required />
            </Group>
            <TextInput
              label="Place of residence"
              classNames={classes}
              required
            />
          </Container>
        </Container>
        <Divider my="sm" />
        {/* experience */}
        <Container className={classes.innerContainer}>
          <Flex justify="space-between">
            <Title color="#464F57" order={3}>
              Experience
            </Title>

            <Button
              leftIcon={<AddIcon />}
              size="xs"
              color="cyan"
              variant="outline"
              radius="lg"
            >
              Add
            </Button>
          </Flex>
          <Space h="md" />

          <Experience />
        </Container>
        <Divider my="sm" />
        {/* education */}
        <Container className={classes.innerContainer}>
          <Flex justify="space-between">
            <Title color="#464F57" order={3}>
              Education
            </Title>

            <Button
              leftIcon={<AddIcon />}
              size="xs"
              color="cyan"
              variant="outline"
              radius="lg"
            >
              Add
            </Button>
          </Flex>
          <Space h="md" />

          <Education />
        </Container>
        <Divider my="sm" />
        {/* web */}
        <Container className={classes.innerContainer}>
          <Title color="#464F57" order={3}>
            On the Web
          </Title>
          <Space h="md" />
          <Group position="center" spacing="md" grow>
            <TextInput label="Linked In" classNames={classes} />
            <TextInput label="Twitter" classNames={classes} />
          </Group>

          <Group position="center" spacing="md" grow>
            <TextInput label="Facebook" classNames={classes} />
            <TextInput label="Website" classNames={classes} />
          </Group>
        </Container>
        <Divider my="sm" />
        {/* hiring manager */}
        <Container className={classes.innerContainer}>
          <Title color="#464F57" order={3}>
            Message to Hiring Manager
          </Title>
          <Space h="md" />
          <Textarea description="Let the company know about your interest working there" />
        </Container>
        <Divider my="sm" />
        <Space h="xl" />
        <Flex justify="flex-end">
          <Button size="sm" color="cyan" radius="lg">
            Submit
          </Button>
        </Flex>
        <Space h="xl" />
      </Flex>
    </Container>
  );
};

export default ApplyJob;

const Experience = () => {
  const [workHere, setWorkHere] = React.useState(false);
  const { classes } = inputStyles();
  return (
    <Container
      className={classes.innerContainer}
      radius="xl"
      px="lg"
      bg="#FBFBFB"
    >
      <Group position="center" spacing="md" grow>
        <TextInput label="Title" classNames={classes} required />
        <TextInput label="Company" classNames={classes} required />
      </Group>
      <TextInput label="Office Location" classNames={classes} required />
      <TextInput label="Description" classNames={classes} />
      <Group position="center" spacing="md" grow>
        <DatePickerInput
          popoverProps={{ withinPortal: true }}
          label="From"
          className={classes}
          clearable={false}
          required
        />
        <DatePickerInput
          popoverProps={{ withinPortal: true }}
          label="To"
          clearable={false}
          className={classes}
          required
          disabled={workHere}
        />
      </Group>
      <Space h="md" />
      <Checkbox
        label="I currently work here"
        onChange={() => setWorkHere(!workHere)}
      />
      <Space h="xl" />
      <Flex justify="flex-end">
        <Group>
          <Button size="xs" color="cyan" variant="outline">
            Cancel
          </Button>
          <Button size="xs" color="cyan">
            Save
          </Button>
        </Group>
      </Flex>
    </Container>
  );
};
const Education = () => {
  const [studyHere, setStudyHere] = React.useState(false);
  const { classes } = inputStyles();
  return (
    <Container
      className={classes.innerContainer}
      radius="xl"
      px="lg"
      bg="#FBFBFB"
    >
      <TextInput label="Institute" classNames={classes} required />
      <Group position="center" spacing="md" grow>
        <TextInput label="Major" classNames={classes} />
        <TextInput label="Degree" classNames={classes} />
      </Group>
      <TextInput label="School Location" classNames={classes} />
      <TextInput label="Description" classNames={classes} />
      <Group position="center" spacing="md" grow>
        <DatePickerInput
          popoverProps={{ withinPortal: true }}
          label="From"
          className={classes}
          clearable={false}
          required
        />
        <DatePickerInput
          popoverProps={{ withinPortal: true }}
          label="To"
          clearable={false}
          className={classes}
          required
          disabled={studyHere}
        />
      </Group>
      <Space h="md" />
      <Checkbox
        label="I currently attend"
        onChange={() => setStudyHere(!studyHere)}
      />
      <Space h="xl" />
      <Flex justify="flex-end">
        <Group>
          <Button size="xs" color="cyan" variant="outline">
            Cancel
          </Button>
          <Button size="xs" color="cyan">
            Save
          </Button>
        </Group>
      </Flex>
    </Container>
  );
};
