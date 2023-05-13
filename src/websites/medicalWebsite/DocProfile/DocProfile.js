import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import { CardContent, Typography,  } from '@mui/material';
import { CheckCircleOutline, Security, WorkspacePremium } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';


import {
  Avatar,
  Container,
  Divider,
  Grid,
  Space,
  Title,
  createStyles,
  Tabs,
  Flex,
  Card,
  Text,
  Group,
  rem,
  Badge,
  Center,
  Button,
} from "@mantine/core";
import { FiberManualRecord } from "@mui/icons-material";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    marginBottom: theme.spacing.lg,
  },
  Container: {
    paddingLeft: "20rem",
    paddingRight: "20rem",
    paddingTop: "2rem",
  },

  imageSection: {
    padding: theme.spacing.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  label: {
    marginBottom: theme.spacing.xs,
    lineHeight: 1,
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    letterSpacing: rem(-0.25),
    textTransform: "uppercase",
  },

  section: {
    padding: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));
const ViewerDocProfile = () => {
  const { classes } = useStyles();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const doctor = JSON.parse(decodeURIComponent(searchParams.get("doctor")));
  const patient = JSON.parse(decodeURIComponent(searchParams.get("patient")));
  const [selectedDay, setSelectedDay] = useState(null);
  const [slots, setSlots] = useState([]);

  const handleDayClick = (day) => {
    const dayOfWeek = day.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    setSelectedDay(day);
    console.log("this is day of week"+ dayOfWeek)
  
    // Check if slots for the selected day are already fetched
    if (slots.length > 0) {
      setSlots([]);
    }
  
    // Make an Axios request to the backend to get the slots data
    axios.get(`http://localhost:8800/api/doctor/getslots/${doctor._id}/${dayOfWeek}`)
      .then(response => {
        setSlots(response.data);
        console.log(response.data);
        console.log("slots data above");
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSlotClick = (slot) => {
    console.log(slot);
    console.log('this is slot above')
    const {id, start, end , day } = slot;
    console.log(doctor.availability.monday)
    console.log('this is selected day below')
  
  
    console.log(selectedDay)
    console.log('this is selected day above')
    
    const { start: dayStart, end: dayEnd } = doctor.availability[selectedDay.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()];
    const combinedTime = `${start}-${end}`;
    const doctorObj = encodeURIComponent(JSON.stringify(doctor));
    const patientObj = encodeURIComponent(JSON.stringify(patient));
    const url = `/bookappointmentpage?day=${selectedDay}&time=${combinedTime}&dayStart=${dayStart}&dayEnd=${dayEnd}&dayofApp=${day}&slotid=${id}&doctor=${doctorObj}&patient=${patientObj}`;
     window.location.href = url;
  };
  

  const today = new Date();
  let nextWeekday = new Date(today);
  nextWeekday.setDate(nextWeekday.getDate() + 1); // get tomorrow
  const daysToShow = [nextWeekday, new Date(nextWeekday.getTime() + 24 * 60 * 60 * 1000)]; // next two weekdays

  

  return (
  <div style={{marginTop:'-120px', marginLeft:'60px'}}>

<div style={{ display: 'flex', width: '100%', height: '100vh', alignItems:'center' }}>
<div label="left" style={{ borderBottomLeftRadius: '100px', borderBottomRightRadius: '100px', width: '65%' }}>

  <div label = "left-content" style={{display:'flex'}}>
<Avatar style={{width:'150px', height: '200px'}} radius='20px' src={doctor.image} alt="it's me" />

<div style={{marginLeft:'20px', marginTop:'-25px'}} label="content">
<Text style={{fontSize:'65px'}} fw={600}>{doctor.name}</Text>
<Text style={{marginTop:'-10px', fontSize:'16px'}} fw={800} fz="sm" >
<MedicalInformationIcon style={{width:'20px', marginTop:'-6px', color:'gray'}} />
<span style={{marginLeft:'6px'}}>{doctor.department}</span>
&nbsp;&nbsp; - &nbsp;&nbsp;
{/* <span>Age {doctor.age}</span> */}
<span>Age 33</span>
&nbsp;&nbsp; - &nbsp;&nbsp;
<span>{doctor.gender}</span>
</Text> 



{/* <Text style={{fontSize:'16px'}} >{doctor.description}</Text> */}
<Text variant="body1" sx={{ display: 'flex', alignItems: 'center',marginTop:'20px'}} fw={600} >
  <LocationOnIcon sx={{ color: 'gray', marginRight: '5px' }}  />
  {/* {doctor.address} */}
  Oak Street Health Canarsie
8923 Flatlands Ave
Brooklyn, NY 11236
</Text>
<Text variant="body1" sx={{ display: 'flex', alignItems: 'center',marginTop:'20px'}} fw={600} >
 <WorkspacePremiumOutlinedIcon style={{color: 'gray',marginRight: '5px'}}></WorkspacePremiumOutlinedIcon> Qualification: {doctor.latestQualification}

</Text>



</div>


</div>

</div>

<div style={{ height: `${Math.max(30 * slots.length, 50)}vh`, width: '20vw', display: 'flex' }}>
  <div label="right" style={{ border:'1px solid black', width: '100%', display: 'flex', justifyContent: 'center'}}>
    <Card sx={{ backgroundColor: '#fff' }}>
      <CardContent>
        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <CheckCircleOutline sx={{ color: 'green', marginRight: '8px' }} /> Accepting new patients
        </Typography>
        <Divider sx={{ width: '100%', margin: '16px 0' }} />

        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <Security sx={{ color: 'blue', marginRight: '8px' }} /> Call us to securely 
        </Typography>
        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        book an appointment
        </Typography>
        <Divider sx={{ width: '100%', margin: '16px 0' }} />
       
      </CardContent>
    </Card>
    
  </div>
</div>
</div>

<div style={{ marginTop:'-200px', width:'50%'}} >
<Text style={{fontSize:'16px'}} fw={600} >Dr. Karen McLeod-Deleaney, MD is an internal medicine specialist in Brooklyn, NY and has over 28 years of experience in the medical field. They graduated from STATE UNIVERSITY OF NEW YORK / HEALTH SCIENCE CENTER AT STONY BROOK in 1994. Their office accepts new patients.</Text>
</div>

</div>


  




  );
};

export default ViewerDocProfile;
