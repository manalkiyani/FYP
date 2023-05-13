import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {AccordionDetails, AccordionSummary, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditDoctorForm from "../EditDoctorForm/EditDoctorForm";


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
  Button

} from "@mantine/core";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";


import ViewDoctorAdmin from "./ViewDoctorAdmin";
import { Divider } from "@material-ui/core";

const DoctorsPage = () => {

  const [open, setOpen] = useState(false);

  const TEMPLATEID = '64466439e08c4f5f864bceac'

 


  const useStyles = createStyles((theme) => ({
    wrapper: {
      minHeight: 600,
      padding: 50,
      display: "flex",
      flexWrap: "wrap",
      justifyContent:'center'
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

      marginRight: theme.spacing.lg,

    },
    gridItem: {
      position: "static",
      margin: `${theme.spacing.sm} 20px ${theme.spacing.sm} ${theme.spacing.sm}`,
    }
    
  }));

  


  const { classes } = useStyles();

  const [doctors, setDoctors] = useState([]);
  const location = useLocation();
  const [selectedDoctor, setSelectedDoctor] = useState(null);

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
  }, [open]);

  const fetchDoctors = () => {
    let apiUrl = 'http://localhost:8800/api/doctor/getalldoctors';
    if (selectedDepartment) {
      apiUrl += `?department=${selectedDepartment}`;
    }
    axios.get(apiUrl).then((res) => {
      setDoctors(res.data);
      console.log(res.data + "This is doctors data");

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


  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleDelete = (docID) => {
    console.log("This is doctor id in handleDelete " + docID);
    axios
      .delete(`http://localhost:8800/api/doctor/deldoctor/${docID}`)
      .then((res) => {
        console.log(res.data + "This is doctors data");


        axios.put("http://localhost:8800/api/doctor/deldoctoridfromtemplate",{TEMPLATEID, doctorid: docID})
        .then((res) => {
          console.log(res.data + "This is doctors data");
          fetchDoctors();
        })

        fetchDoctors();
      })
      .then(function (response) {
        toast.success("Doctor Deleted Successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  return (
    <>


{console.log(JSON.stringify(doctors))}

<Link to={{
  pathname: '/adminviewappointments',
 
}}>
  <Button>View appointments</Button>

</Link>

<div style={{marginTop:' 10px'}}>
        <Link to="/adddoctor">
        <Button>Add Doctor</Button>

        </Link>
      </div>
    <Grid  >
      <Grid.Col



      >
        <Container size="sm" >



        </Container>
      </Grid.Col>


      <Grid className={classes.wrapper}>


  {filteredDoctors.map((doctor) => (
    
    <div style={{ width: '80%', padding: '10px' }}>

      <ViewDoctorAdmin
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      
        key={doctor._id}
        doctor={doctor}
     
        handleAvailabilityClick={handleAvailabilityClick}
        expanded={expanded[doctor._id]}
        selectedDay={selectedDay}
        handleDayChange={handleDayChange}
      />
    </div>
  ))}
          {open && (
          <EditDoctorForm
            setOpen={setOpen}
            doctor={selectedDoctor}
          ></EditDoctorForm>
        )}
</Grid>


    </Grid>
    </>
  );
};

export default DoctorsPage;
