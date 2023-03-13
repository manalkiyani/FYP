import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { getUser, getUsername } from "../../utilityFunctions/authFunctions";

export default function Profile() {
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    getUserData()
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getUserData = async () => {
    const token = await getUsername();
    console.log(token);
    const { data } = await getUser({ username: token.username });
    console.log(data);
    return data; // Return the data retrieved from the API
  };

  return (
    <Card
      sx={{
        display: "flex",
        margin: "40px 60px ",
        padding: "30px",
        width: "70%",
        justifyContent: "space-around",
      }}
    >
      <Grid container spacing={1}>
        <Grid item md={4}>
          <CardMedia
            style={{ borderRadius: "50%" }}
            component="img"
            sx={{ width: 200 }}
            image="https://res.cloudinary.com/djlewzcd5/image/upload/v1670359345/istockphoto-1177339095-170667a_qnpg6m.jpg"
            alt="Profile picture"
          />
        </Grid>
        <Grid item md={3}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {user.username}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                {user.accountStatus}
              </Typography>
            </CardContent>
          </Box>
        </Grid>

        <Divider
          orientation="vertical"
          flexItem
          style={{ backgroundColor: "#40AFC0", fontWeight: "bold" }}
        />

        <Grid item md={3}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                {user.activePlan}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                Mac Miller
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
