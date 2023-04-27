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

  const departments = [
    'Cardiology',
    'Neurology',
    'Dermatology',
    'Orthopedics',
    'Gastroenterology',
    'Ophthalmology',
    'Endocrinology',
    'Psychiatry',
    'Oncology',
    'Rheumatology',
    'Nephrology',
    'Urology',
    'Pulmonology',
    'Allergy and Immunology',
    'Infectious Disease',
    'Hematology',
    'Physical Medicine and Rehabilitation',
    'Pediatrics',
    'Geriatrics',
    'Emergency Medicine',
  ];



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

  const [searchTerm, setSearchTerm] = useState('');

const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
};

const [selectedDepartment, setSelectedDepartment] = useState('');
const handleDepartmentChange = (event) => {
  setSelectedDepartment(event.target.value);
};


const filteredDoctors = doctors.filter((doctor) =>
  doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  (selectedDepartment === '' || doctor.department === selectedDepartment)
);


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
    let apiUrl = 'http://localhost:8800/api/doctor/getalldoctors';
    if (selectedDepartment) {
      apiUrl += `?department=${selectedDepartment}`;
    }
    axios.get(apiUrl).then((res) => {
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
      Search doctors by name
    </Accordion.Control>
    <Accordion.Panel>
      <TextInput
        placeholder="Doctor's name"
        value={searchTerm}
        onChange={handleSearchChange}
        required
      />
    </Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item className={classes.item} value="department">
    <Accordion.Control>
      <SearchOutlinedIcon />
      Search doctors by department
    </Accordion.Control>
    <Accordion.Panel>
      <FormControl fullWidth>
        <InputLabel id="department-select-label">Department</InputLabel>
        <Select
  labelId="department-select-label"
  id="department-select"
  value={selectedDepartment}
  onChange={handleDepartmentChange}
  label="Department"
>
  <MenuItem value="">All Departments</MenuItem>
  {departments.map((department) => (
    <MenuItem key={department} value={department}>{department}</MenuItem>
  ))}
</Select>

      </FormControl>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion>

        </Container>
      </Grid.Col>
      <Grid.Col span={7}>
        <Flex direction="column">
        {filteredDoctors.map((doctor) => (
  <ViewDoctor doctor={doctor} patient={patient} />
))}

        
        </Flex>
      </Grid.Col>
    </Grid>
    </>
  );
};

export default ViewerDoctorsPage;
