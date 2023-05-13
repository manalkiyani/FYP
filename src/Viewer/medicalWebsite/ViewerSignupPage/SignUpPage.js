import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  rem,
  Select,
  createStyles,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: rem(54),
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
}));

export function ViewerSignup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const { classes } = useStyles();
  const handleSubmit = async (e) => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      age === "" ||
      contactInfo === ""
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/api/templates/signup",
        {
          templateId: id,
          username,
          age,
          email,
          contact_info: contactInfo,
          gender,
          password,
        }
      );
      console.log(response.data);
      toast.success("Account created successfully");
      const currentPath = window.location.pathname;
      const parentPath = currentPath.split("/").slice(0, -1).join("/");
      navigate(parentPath + "/viewerLogin");
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        toast.error("Username already exists");
      } else if (error.message === "Request failed with status code 500") {
        toast.error("Email or Username already exists");
      }
      console.log("error", error);
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <Container size={530} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Create an account now
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Create an account now to get started
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="you@gmail.com"
            required
          />

          <TextInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            placeholder="johnsmith"
            required
          />
          <TextInput
            required
            value={age}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            placeholder="18"
            label="Age"
          />
          <TextInput
            required
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            type="number"
            placeholder="0333-833-8333"
            label="Contact Number"
          />

          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Your password"
            required
            mt="md"
          />
          <Select
            mt="md"
            onChange={setGender}
            withinPortal
            data={["Male", "Female"]}
            placeholder="Pick one"
            label="Gender"
            classNames={classes}
          />

          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
          </Group>
          <Button variant="default" onClick={handleSubmit} fullWidth mt="xl">
            Sign Up
          </Button>
        </Paper>
      </Container>
    </>
  );
}
