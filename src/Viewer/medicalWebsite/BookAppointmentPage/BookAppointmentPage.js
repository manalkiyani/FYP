import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import { Button, CardContent, Typography,  } from '@mui/material';
import { CheckCircleOutline, Security, WorkspacePremium } from '@mui/icons-material';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';


import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import axios from "axios";
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

} from "@mantine/core";
import { ButtonBase } from "@material-ui/core";

function BookAppointmentPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const doctor = JSON.parse(decodeURIComponent(searchParams.get("doctor")));
  const patient = JSON.parse(decodeURIComponent(searchParams.get("patient")));
  const selectedDay = searchParams.get("day");
  const dayofAppointment = searchParams.get("dayofApp");
  const selectedTime = searchParams.get("time");
  const slotid = searchParams.get("slotid");
  const date = new Date(selectedDay);

  const TEMPLATEID = '64466439e08c4f5f864bceac'

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

  const [isBooked, setIsBooked] = useState(false);

  const handleConfirmAppointment = async () => {
    try {
      // Update the slot to be booked
      const res = await axios.patch(
        `http://localhost:8800/api/doctor/changeisbookedstatus/${slotid}`,
        {
          isBooked: true,
        }
      );
      setIsBooked(true);

      // Save the appointment details
      const appointmentRes = await axios
        .post(`http://localhost:8800/api/doctor/bookappointment`, {
          doctorid: doctor._id,
          patientid: patient._id,
          slot: slotid,
          Day: dayofAppointment,
          Time: selectedTime,
        })
        .then(async (appointmentRes) => {
          let appointmentId = appointmentRes.data._id;
          console.log("this is appointment id" + appointmentId);
          try {
            const response = await axios.put(
              "http://localhost:8800/api/doctor/appointmentidtotemplate",
              { appointmentId, templateId: TEMPLATEID }
            );
            console.log("this is response +" + response.data);
          } catch (error) {
            console.log(error);
          }

          console.log("appointment received");
        });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    
    <>

<div style={{ display: 'flex', width: '100%', height: '100vh', alignItems:'center', justifyContent:'center', marginTop:'-120px' }}>

<Avatar style={{width:'150px', height: '200px'}} radius='20px' src={doctor.image} alt="it's me" />

      <div label='left'>
      <div label="left" style={{ marginTop:'-30px', borderBottomLeftRadius: '100px', borderBottomRightRadius: '100px', width: '65%' }}>

<div label = "left-content" style={{display:'flex'}}>


<div style={{marginLeft:'20px', marginTop:'25px'}} label="content">
<Text style={{fontSize:'35px'}} fw={600}>{doctor.name}</Text>
<Text style={{ fontSize:'16px'}} fw={800} fz="sm" >
<MedicalInformationIcon style={{width:'20px', marginTop:'-6px'}} />
<span style={{marginLeft:'6px'}}>{doctor.department}</span>
&nbsp;&nbsp; - &nbsp;&nbsp;
{/* <span>Age {doctor.age}</span> */}
<span>Age 33</span>
&nbsp;&nbsp; - &nbsp;&nbsp;
<span>{doctor.gender}</span>
</Text> 



{/* <Text style={{fontSize:'16px'}} >{doctor.description}</Text> */}
<Text variant="body1" sx={{ display: 'flex', alignItems: 'center',marginTop:'20px'}} fw={600} >
<LocationOnIcon sx={{ color: 'red', marginRight: '5px' }}  />
{/* {doctor.address} */}
Oak Street Health Canarsie
8923 Flatlands Ave
Brooklyn, NY 11236
</Text>
<Text variant="body1" sx={{ display: 'flex', alignItems: 'center',marginTop:'20px'}} fw={600} >
<WorkspacePremiumOutlinedIcon style={{marginRight: '5px'}}></WorkspacePremiumOutlinedIcon> Qualification: {doctor.latestQualification}

</Text>
<Text variant="body1" sx={{ display: 'flex', alignItems: 'center',marginTop:'20px'}} fw={600} >
{/* <CalendarMonthOutlinedIcon style={{marginRight: '5px'}}></CalendarMonthOutlinedIcon> {formattedDate} */}

</Text>




</div>


</div>

</div>


      </div>

      <div label="right" style={{ border:'1px solid black', display: 'flex', justifyContent: 'center'}}>
      <Card sx={{ backgroundColor: '#fff' }}>
      <CardContent >
  
        <Text fw={600}  variant="body1" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', fontSize:'20px'  }}>
          <CheckCircleOutline sx={{ color: 'green', marginRight: '8px', }} /> Details
        </Text>
        <Divider sx={{ width: '100%', margin: '16px 0' }} />

        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <CalendarMonthOutlinedIcon sx={{ color: 'blue', marginRight: '8px' }} /> {dayofAppointment}
        </Typography>
        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {selectedTime}
        </Typography>
        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {formattedDate}
        </Typography>
        <Divider sx={{ width: '100%', margin: '16px 0' }} />
        <Button style={{color:'white'}} onClick={handleConfirmAppointment} variant="contained">Confirm Appointment</Button>

      
      </CardContent>
    </Card>



</div>


      {/* <h2>Patient name: {patient.name}</h2>

      <p>Appointment Day: {dayofAppointment}</p>
      <p>Time Slot: {selectedTime}</p>
      <p>Location: {doctor.address}</p>
      <p>Contact: {patient.contact_info}</p>
      {isBooked ? (
        <p>Appointment confirmed!</p>
      ) : (
        <button onClick={handleConfirmAppointment}>Confirm Appointment</button>
      )} */}
    </div>
    </>
  );
}

export default BookAppointmentPage;
