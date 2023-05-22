import React from "react";
import Button from "@mui/material/Button";
import classes from "./HomePage.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AllPublishedWebsites from "./AllPublishedWebsites";
import { Container, Flex, Title } from "@mantine/core";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className={classes.Header}>
        <img
          style={{ width: "600px" }}
          src="https://res.cloudinary.com/djlewzcd5/image/upload/v1676282511/93959b56-3bd0-4da2-8232-ef7e482e134e_ow0jmz.png"
          alt="logo"
        />
        <div className={classes.HeaderContent}>
          <h1>Create your first site</h1>
          <h3>
            You're on your way to creating your first professional website.
          </h3>
          <Button
            style={{
              backgroundColor: "#40AFC0",
              marginTop: "10px",
              width: "fit-content",
              color: "white",
            }}
            variant="contained"
            onClick={() => navigate("/dashboard")}
          >
            START NOW
          </Button>
        </div>
      </div>

      <Container size="75vw">
        <Flex
          mt="xl"
          mb="xl"
          justify="space-between"
          mih={50}
          style={{ padding: "20px", borderRadius: "20px" }}
          bg="#FBF8F1"
        >
          <Title fw={400} order={2}>
            Websites Built Through Ucraft
          </Title>
        </Flex>
        <div className="charts">
          <AllPublishedWebsites />
        </div>
      </Container>
      <Container size="75vw">
        <Flex
          mt="xl"
          mb="xl"
          justify="space-between"
          mih={50}
          style={{ padding: "20px", borderRadius: "20px" }}
          bg="#FBF8F1"
        >
          <Title fw={400} order={2}>
            Key Features
          </Title>
        </Flex>
      </Container>
      <div className={classes.Main}>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <center>
              <CardMedia
                sx={{ maxWidth: 200, padding: "20px" }}
                component="img"
                image="https://res.cloudinary.com/djlewzcd5/image/upload/v1676287591/man_bhgds2.png"
                alt="green iguana"
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  What is uCraft?
                </Typography>
                <Typography
                  sx={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "left",
                  }}
                  variant="body"
                  color="text.secondary"
                >
                  ucraft is a website to help you easily create small/medium
                  websites and simple web stores.Various beautiful website
                  blocks, templates help you to start easily.
                </Typography>
              </CardContent>
            </center>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 345, justifyContent: "center" }}>
          <CardActionArea>
            <center>
              <CardMedia
                component="img"
                sx={{ maxWidth: 200, padding: "20px" }}
                image="https://res.cloudinary.com/djlewzcd5/image/upload/v1676287598/heart_1_yijyew.png"
                alt="green iguana"
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Why uCraft
                </Typography>
                <Typography
                  sx={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "left",
                  }}
                  variant="body"
                  color="text.secondary"
                >
                  Key differences from mainstream website builders:
                  Minimalistic, extremely easy-to-use interface, familiar
                  payment methods,reasonable prices
                </Typography>
              </CardContent>
            </center>
          </CardActionArea>
        </Card>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <center>
              <CardMedia
                component="img"
                sx={{ maxWidth: 200, padding: "20px" }}
                image="https://res.cloudinary.com/djlewzcd5/image/upload/v1676287591/man_bhgds2.png"
                alt="green iguana"
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  For whom?
                </Typography>
                <Typography
                  sx={{
                    padding: "20px",
                    display: "flex",
                    justifyContent: "left",
                  }}
                  variant="body"
                  color="text.secondary"
                >
                  uCarft is perfect for non-techies who are not familiar with
                  the intricacies of web design and prefer to be a part of
                  no-code revolution
                </Typography>
              </CardContent>
            </center>
          </CardActionArea>
        </Card>
      </div>

      <div className={classes.Footer}>
        <h1>How uCraft works?</h1>
        <div className={classes.card}>
          <div className={classes.cardContent}>
            <h3>Drag and Drop blocks</h3>
            <p>
              Start with creating a new website and picking up a template.Then
              expand the blocks panel with the big red "plus" button in the
              lower right corner and start dragging the blocks.
            </p>
          </div>

          <img src="https://res.cloudinary.com/djlewzcd5/image/upload/v1676290457/Screenshot_2023-02-13_171350_f2aas5.png" />
        </div>

        <div className={classes.card}>
          <div className={classes.cardContent}>
            <h3>It's easy and simple</h3>
            <p>
              Cut down the development time with drag-and-drop website builder.
              Drag-n-drop the blocks into the page, edit content inline and
              publish - no technical skills required
            </p>
          </div>

          <img src="https://res.cloudinary.com/djlewzcd5/image/upload/v1676290457/Screenshot_2023-02-13_171350_f2aas5.png" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
//https://res.cloudinary.com/djlewzcd5/image/upload/v1676282511/93959b56-3bd0-4da2-8232-ef7e482e134e_ow0jmz.png
