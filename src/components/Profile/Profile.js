import * as React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export default function Profile() {
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")); //so user isnt logged out when page is refreshed so save user data in local storage
    console.log(userData);
    setUser(userData);
  }, []);

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
            component="img"
            sx={{ width: 200 }}
            image="https://res.cloudinary.com/djlewzcd5/image/upload/v1670359345/istockphoto-1177339095-170667a_qnpg6m.jpg"
            alt="Profile picture"
          />
        </Grid>
        <Grid item md={3}>
          <Box sx={{ display: "flex", flexDirection: "column" }} >
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

        <Divider orientation="vertical" flexItem sx={{ borderRightWidth: 5 }} />

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
