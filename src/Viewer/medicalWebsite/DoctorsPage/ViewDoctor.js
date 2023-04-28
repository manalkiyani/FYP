import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';

import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  createStyles,
  Center,
  Button,
  rem,
  Flex,
  Avatar,
} from "@mantine/core";

import { Link } from "react-router-dom";
import PersonPinIcon from "@mui/icons-material/PersonPinCircleOutlined";

import { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Divider, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Calendar } from '@mantine/dates';
import { ChatBubble } from '@mui/icons-material';
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    marginBottom: theme.spacing.lg,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",

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
    textAlign: "center", // Add this line to center align the text

  },

  icon: {
    marginRight: rem(5),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[5],
  },
}));

const ViewDoctor = ({doctor, patient}) => {
  const { classes } = useStyles();
  const [expanded, setExpanded] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [availabilityExpanded, setAvailabilityExpanded] = useState(false);


  const handleAvailabilityClick = (doctorId) => {
    setAvailabilityExpanded(!availabilityExpanded);
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [doctorId]: !prevExpanded[doctorId],
    }));
  };

    const handleDayChange = (event) => {
      setSelectedDay(event.target.value);
      console.log(patient.email)
    };

  return (
    <>
<Divider variant="inset" style={{marginBottom:'25px', borderColor:'#333'}} />


<div style={{display:'flex', justifyContent: 'space-between'}}>
  <div label='left'>

    <div style={{display:'flex'}}>
      <div label ='avatar'>
        <Avatar style={{width:'215px', height: '215px'}} radius='20px' src={doctor.image} alt="it's me" />
      </div>

      <div style={{marginLeft:'15px'}} label='restofdetail'>
        <Text style={{fontSize:'25px'}} fw={600}>{doctor.name}</Text>
        <Text style={{marginTop:'-6px'}} fz="xs" >
          Department: {doctor.department}
        </Text>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '15px' }}>
          <Text style={{fontSize:'15px'}} fw={700} fz="xs" >
            Patients Tell Us:
          </Text>
          <Text style={{marginTop:'6px'}} fz="xs" >
            <CalendarMonthIcon style={{width:'15px'}}></CalendarMonthIcon> Easy Scheduling
          </Text>
          <Text style={{marginTop:'6px'}} fz="xs" >
            <Diversity1Icon style={{width:'15px'}}></Diversity1Icon> Employs friendly staff
          </Text>
          <Text style={{marginTop:'6px', alignSelf: 'flex-start'}} fz="xs" >
            <ChatBubbleOutlineIcon style={{width:'15px'}}></ChatBubbleOutlineIcon> Explains conditions well
          </Text>
          <Text style={{marginTop:'6px'}} fz="sm" >
    <ShareLocationIcon style={{width:'20px'}}></ShareLocationIcon> {doctor.address} 
    </Text>
        </div>
        <div style={{marginTop:'8px'}}>
 
    </div>
 
      </div>
    </div>

  </div>

  <div label='right'>

  <Accordion expanded={availabilityExpanded} onChange={() => handleAvailabilityClick(doctor._id)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="availability-content" id="availability-header">
  <Badge color="green" size="lg" style={{ background: "transparent", boxShadow: "none" }}>Availability</Badge>
</AccordionSummary>

              <AccordionDetails>
                <FormControl fullWidth>
        
                  <Select labelId="day-select-label" id="day-select" value={selectedDay} onChange={handleDayChange}>
                    <MenuItem value="monday">Monday</MenuItem>
                    <MenuItem value="tuesday">Tuesday</MenuItem>
                    <MenuItem value="wednesday">Wednesday</MenuItem>
                    <MenuItem value="thursday">Thursday</MenuItem>
                    <MenuItem value="friday">Friday</MenuItem>

                  </Select>
                </FormControl>
                {selectedDay && (
                  <ul>
                    <li>
                      {doctor.availability[selectedDay].start} -{" "}
                      {doctor.availability[selectedDay].end}
                    </li>
                  </ul>
                )}
              </AccordionDetails>
            </Accordion>

            <div style={{marginTop:'15px'}}>
            {!availabilityExpanded && <Link
      to={`/viewerdocprofile?doctor=${encodeURIComponent(JSON.stringify(doctor))}&patient=${encodeURIComponent(JSON.stringify(patient))}`}
    >
      <Button  color="cyan" size="sm" radius="xl">View Profile</Button>
    </Link>
}
    </div>

  </div>
</div>

    
    </>
  );
};
export default ViewDoctor;
