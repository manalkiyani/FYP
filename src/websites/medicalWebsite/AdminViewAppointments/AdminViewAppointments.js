import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Button, CardContent, Typography,  } from '@mui/material';
import { CheckCircleOutline, Security, WorkspacePremium } from '@mui/icons-material';
import QueryBuilderOutlinedIcon from '@mui/icons-material/QueryBuilderOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';


import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import {

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

const AdminViewAppointments = () => {
    const TEMPLATEID = '64466439e08c4f5f864bceac'

    const [appointmentData, setAppointmentData] = useState([]);

    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const response = await axios.post('http://localhost:8800/api/doctor/getappointmentstoadmin', {
            TEMPLATEID
          });
          setAppointmentData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchAppointments();
    }, [appointmentData]);

    const handleCompleted = async (appointmentid) => {
      try {
        const response = await axios.put('http://localhost:8800/api/doctor/doctorcompletesappointment',{appointmentid});
        const updatedAppointment = response.data;
        const updatedAppointments = appointmentData.map((appointment) => {
          if (appointment._id === updatedAppointment._id) {
            return updatedAppointment;
          } else {
            return appointment;
          }
        });
        setAppointmentData(updatedAppointments);
      } catch (error) {
        console.error(error);
      }
    }

    return(


      <>
      <h1 style={{marginBottom:'50px'}}>THIS IS NAVBAR SPACE</h1>
    
    {appointmentData.map((appointment, index) => (
    


<div style={{ display: 'flex', width: '100%', height: '100vh', justifyContent:'center', marginBottom:'-250px' }}>


      <div label="left" style={{ borderBottomLeftRadius: '100px', borderBottomRightRadius: '100px', width: '65%' }}>

<div label = "left-content" style={{display:'flex'}}>


<div style={{marginLeft:'20px', marginTop:'25px'}} label="content">
<Text style={{fontSize:'35px'}} fw={600}>{appointment.DoctorName}</Text>
<Text style={{ fontSize:'16px'}} fw={800} fz="sm" >
<MedicalInformationIcon style={{width:'20px', marginTop:'-6px'}} />
<span style={{marginLeft:'6px'}}>{appointment.Department}</span>
&nbsp;&nbsp; - &nbsp;&nbsp;
{/* <span>Age {doctor.age}</span> */}
<span>Age 33</span>
&nbsp;&nbsp; - &nbsp;&nbsp;
<span>{appointment.DoctorGender}</span>
</Text> 



{/* <Text style={{fontSize:'16px'}} >{doctor.description}</Text> */}
<Text variant="body1" sx={{ display: 'flex', alignItems: 'center',marginTop:'20px'}} fw={600} >
<LocationOnIcon sx={{ color: 'red', marginRight: '5px' }}  />
{/* {appointment.DoctorAddress} */}
Oak Street Health Canarsie
8923 Flatlands Ave
Brooklyn, NY 11236
</Text>
<Text variant="body1" sx={{ display: 'flex', alignItems: 'center',marginTop:'20px'}} fw={600} >
<WorkspacePremiumOutlinedIcon style={{marginRight: '5px'}}></WorkspacePremiumOutlinedIcon> Qualification: {appointment.DoctorQualification}

</Text>
<Text variant="body1" sx={{ display: 'flex', alignItems: 'center',marginTop:'20px'}} fw={600} >
{/* <CalendarMonthOutlinedIcon style={{marginRight: '5px'}}></CalendarMonthOutlinedIcon> {formattedDate} */}

</Text>
</div>
</div>
</div>
    

      <div label="right" style={{ border:'1px solid black', height:'57vh', width:'40vh', display: 'flex', justifyContent: 'center', marginTop:'-35px' }}>
      <Card >
      <CardContent sx={{ marginTop:'-25px'}}>
  
        <Text fw={600}  variant="body1" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', fontSize:'20px' }}>
           {appointment.PatientName}
        </Text>
        <Divider sx={{ width: '100%', margin: '16px 0' }} />

        <p> Patient: {appointment.PatientName}</p>
                <p> Patient Contact: {appointment.ContactInfo}</p>
                <p>Day: {appointment.Day}</p>
                <p>Time: {appointment.Time}</p>

        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <CalendarMonthOutlinedIcon sx={{ color: 'blue', marginRight: '8px' }} /> {appointment.Day}
        </Typography>
        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {appointment.Time}
        </Typography>

        <Divider sx={{ width: '100%', margin: '16px 0' }} />
  
        <Button style={{color:'white', marginLeft:'20px', marginTop:'2px'}} onClick={()=>handleCompleted(appointment._id)} variant="contained">Completed</Button>

      
      </CardContent>
      
    </Card>
    
    

</div>


    </div>
    ))}
    
    </>
    
      );
    };
    
export default AdminViewAppointments;
