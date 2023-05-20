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
} from "@mantine/core";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { getTemplateId } from "../../../utilityFunctions/TemplateIdController";
import { addWebsiteData } from "../../../utilityFunctions/websiteDataController";

export function ViewerLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    //fetch template Id from newly created Template Id schema
    const response = await getTemplateId()
    const id = response.templateId

    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/api/templates/login",
        {
          templateId: id,
          username,
          password,
        }
      );
      console.log("successfully logged in");
      console.log(response.data.user);



      // localStorage.setItem("viewer", JSON.stringify(response.data.user));
      // localStorage.setItem("viewerTemplateId", JSON.stringify(id));


      //save logged In users id in the respected place in website Data document
      const saveUserResponse = await addWebsiteData(id,response.data.user._id)
      console.log("saveUserResponse",saveUserResponse)





      const currentPath = window.location.pathname;
      const parentPath = currentPath.split("/").slice(0, -1).join("/");

      navigate(parentPath);
    } catch (error) {
      console.error(
        `Request failed with status code ${error.response.status}: ${error.response.data}`
      );
      
      toast.error("Invalid username or password");
      console.error(error.response.data.message);
    }
  };
  const handleSignupNavigate = () => {
    const currentPath = window.location.pathname;
    const parentPath = currentPath.split("/").slice(0, -1).join("/");
    navigate(parentPath + "/viewerSignup");
  };

  return (
    <>
      <Toaster position="top-center" />
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900,
          })}
        >
          Welcome back!
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor onClick={handleSignupNavigate} size="sm" component="button">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="username"
            placeholder="you@gmail.com"
            required
          />
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Your password"
            required
            mt="md"
          />
          <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
          </Group>
          <Button variant="default" onClick={handleSubmit} fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    </>
  );
}
