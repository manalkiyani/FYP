import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, Flex, Input, useMantineTheme } from "@mantine/core";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { TextField } from "@material-ui/core";

function ViewerLoginPage() {
  const theme = useMantineTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
   
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8800/api/templates/login",
        {
          email,
          password,
          username,
        }
      );
      console.log("successfully logged in");
      navigate("/viewerdoctorspage", { state: response.data.user });
    } catch (error) {
      console.error(
        `Request failed with status code ${error.response.status}: ${error.response.data}`
      );
      console.log("abc");
      console.error(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: `linear-gradient(to right bottom, ${theme.colors.blue[1]}, ${theme.colors.blue[3]})`,
      }}
    >
      <Card
        shadow="lg"
        style={{
          maxWidth: 600,
          height: 400,
          width: "100%",
          padding: theme.spacing.md,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: theme.spacing.md }}>
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            required
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: theme.spacing.sm }}
          />
          <Input
            required
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: theme.spacing.sm }}
          />
          {errorMessage && (
            <div
              style={{
                marginTop: theme.spacing.xs,
                marginBottom: theme.spacing.sm,
                color: theme.colors.red[6],
              }}
            >
              {errorMessage}
            </div>
          )}
          <Button
            type="submit"
            color="#40AFC0"
            fullWidth
            style={{ marginTop: theme.spacing.md }}
          >
            Sign in
          </Button>
        </form>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: theme.spacing.lg,
          }}
        >
          <div>
            <Flex>
              <Button
                variant="link"
                onClick={() => navigate("/viewerregisterpage")}
              >
                Not registered? Sign up
              </Button>
              <Button
                variant="link"
                onClick={() => navigate("/viewerforgotpasswordpage")}
              >
                Forgot password?
              </Button>
            </Flex>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ViewerLoginPage;
