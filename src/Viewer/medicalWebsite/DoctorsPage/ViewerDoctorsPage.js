import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ViewerDoctorsPage.css";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {AccordionDetails, AccordionSummary, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";





import React from "react";
import {
  Container,
  Title,
  Accordion,
  createStyles,
  rem,
  Flex,
  TextInput,
  Checkbox,
  Grid,
  Text,
  Divider,
} from "@mantine/core";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import ViewDoctor from "./ViewDoctor";

const ViewerDoctorsPage = () => {
  const useStyles = createStyles((theme) => ({
    wrapper: {
      minHeight: 600,
      padding: 0,
    },
    mainContainer: {
      padding: `calc(${theme.spacing.xl} * 2)`,
    },
    container: {
      paddingTop: `calc(${theme.spacing.xl} * 2)`,
      paddingBottom: `calc(${theme.spacing.xl} * 2)`,
      width: "100%",
    },

    item: {
      borderRadius: theme.radius.md,
    },
    gridItem: {
      position: "static",
    },
  }));

  const { classes } = useStyles();

  const [doctors, setDoctors] = useState([]);
  const location = useLocation();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [patient, setPatient] = useState(location.state);
  const [selectedDay, setSelectedDay] = useState(null);
  const [expanded, setExpanded] = useState({});
  let docObj = JSON.stringify(doctors)

  const handleAvailabilityClick = (doctorId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [doctorId]: !prevExpanded[doctorId],
    }));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    axios.get("http://localhost:8800/api/doctor/getalldoctors").then((res) => {
      setDoctors(res.data);
      console.log(res.data + "This is doctors data");
      console.log("thisis patient: "+ patient._id)
      setExpanded(
        res.data.reduce((prevExpanded, doctor) => {
          prevExpanded[doctor._id] = false;
          return prevExpanded;
        }, {})
      );
    });
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };



  return (
    <>
{console.log(patient._id)}
{console.log(JSON.stringify(doctors))}

<Link to={{
  pathname: '/viewerviewappointments',
  search: `patient_id=${patient._id}&doctors=${docObj}`
}}>
  <button>VIEW BOOKED APPOINTMENTS</button>
</Link>




    <Grid className={classes.container} justify="space-around">
      <Grid.Col
        className={classes.gridItem}
        position="static"
        padding={0}
        span={3}
      >
        <Container size="sm" className={classes.wrapper}>
          <Accordion variant="separated">
            <Accordion.Item className={classes.item} value="credit-card">
              <Accordion.Control>
                <SearchOutlinedIcon />
                What do you want to do?
              </Accordion.Control>
              <Accordion.Panel>
                <TextInput
                  placeholder="Software Engineer, Web Developer"
                  required
                />
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item className={classes.item} value="skills">
              <Accordion.Control>Skills & Qualifications</Accordion.Control>
              <Accordion.Panel>
                <TextInput
                  placeholder="Computer Programming, Web Development"
                  required
                />
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="another-account">
              <Accordion.Control>Degree</Accordion.Control>
              <Accordion.Panel>
                <Flex wrap="wrap">
                  <Checkbox mr={20} mt={20} label="Associate" />
                  <Checkbox mr={20} mt={20} label="Bachelors" />
                  <Checkbox mr={20} mt={20} label="Masters" />
                  <Checkbox mr={20} mt={20} label="Ph.D" />
                  <Checkbox mr={20} mt={20} label="Pursuing Degree" />
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>

            <Accordion.Item className={classes.item} value="newsletter">
              <Accordion.Control>Employment types</Accordion.Control>
              <Accordion.Panel>
                <Flex wrap="wrap">
                  <Checkbox mr={20} mt={20} label="Full Time" />
                  <Checkbox mr={20} mt={20} label="Part Time" />
                  <Checkbox mr={20} mt={20} label="Contract" />
                  <Checkbox mr={20} mt={20} label="Internship" />
                  <Checkbox mr={20} mt={20} label="Temporary" />
                  <Checkbox mr={20} mt={20} label="In Office" />
                  <Checkbox mr={20} mt={20} label="Remote" />
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Container>
      </Grid.Col>
      <Grid.Col span={7}>
        <Flex direction="column">
        {doctors.map((doctor) => {

          console.log("this is doc obj"+ doctor)
          return(
          <ViewDoctor doctor={doctor} patient ={patient}   />
          )
        })}
        
        </Flex>
      </Grid.Col>
    </Grid>
    </>
  );
};

export default ViewerDoctorsPage;
