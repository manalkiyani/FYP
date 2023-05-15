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


const ViewerViewAppointments = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const patientId = searchParams.get('patient_id');
    const [doctors, setDoctors] = useState([]);

    const [appointments, setAppointments] = useState([]);



    const getDoctorName = (doctorId) => {
        
        const doctor = doctors.find((doctor) => doctor._id === doctorId);
        return doctor ? doctor.name: 'Unknown';
    };

    const getDoctorDepartment = (doctorId) => {
        
      const doctor = doctors.find((doctor) => doctor._id === doctorId);
      return doctor ? doctor.department: 'Unknown';
  };

  const getDoctorGender = (doctorId) => {
        
    const doctor = doctors.find((doctor) => doctor._id === doctorId);
    return doctor ? doctor.gender: 'Unknown';
};

const getDoctorQualification = (doctorId) => {
        
  const doctor = doctors.find((doctor) => doctor._id === doctorId);
  return doctor ? doctor.latestQualification: 'Unknown';
};


  
    useEffect(() => {

        fetchDoctors();
      axios.post('http://localhost:8800/api/doctor/getappointmentstoviewer', {
          patientId
        })
        .then(response => {
          setAppointments(response.data);

        })
        .catch(error => {
          console.log(error);
        });
    }, [patientId]);


  const fetchDoctors = () => {
    axios.get("http://localhost:8800/api/doctor/getalldoctors").then((res) => {
      setDoctors(res.data);
      console.log(res.data + "This is doctors data");

    });
  };
  
    return(

      <>

<>
      <h1 style={{marginBottom:'50px'}}>THIS IS NAVBAR SPACE</h1>
    
    {appointments.map((appointment, index) => (
    


<div style={{ display: 'flex', width: '100%', height: '100vh', justifyContent:'center', marginBottom:'-250px' }}>


      <div label="left" style={{  marginTop:'15px', borderBottomLeftRadius: '100px', borderBottomRightRadius: '100px', width: '65%' }}>
      <Divider sx={{ 
          width: '100%', 
          margin: '16px 0', 
          borderBottom: '1px  black'
        }} />
<div label = "left-content" style={{display:'flex'}}>


<div style={{marginLeft:'20px', marginTop:'25px'}} label="content">
<Text style={{fontSize:'35px'}} fw={600}>{getDoctorName(appointment.doctorid)}</Text>
<Text style={{ fontSize:'16px'}} fw={800} fz="sm" >
<MedicalInformationIcon style={{width:'20px', marginTop:'-6px'}} />
<span style={{marginLeft:'6px'}}>{getDoctorDepartment(appointment.doctorid)}</span>
&nbsp;&nbsp; - &nbsp;&nbsp;
{/* <span>Age {doctor.age}</span> */}
<span>Age 33</span>
&nbsp;&nbsp; - &nbsp;&nbsp;
<span>{getDoctorGender(appointment.doctorid)}</span>
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
<WorkspacePremiumOutlinedIcon style={{marginRight: '5px'}}></WorkspacePremiumOutlinedIcon> Qualification: {getDoctorQualification(appointment.doctorid)}

</Text>
<Text variant="body1" sx={{ display: 'flex', alignItems: 'center',marginTop:'20px'}} fw={600} >
{/* <CalendarMonthOutlinedIcon style={{marginRight: '5px'}}></CalendarMonthOutlinedIcon> {formattedDate} */}

</Text>
</div>
</div>
<Divider sx={{ 
          width: '100%', 
          margin: '16px 0', 
          borderBottom: '1px  black'
        }} />
</div>
    

      <div label="right" style={{ border:'1px solid black', height:'36vh', width:'40vh', display: 'flex', justifyContent: 'center', marginTop:'31px' }}>
      <Card >
      <CardContent sx={{ marginTop:'-16px'}}>
  
        <Text fw={600}  variant="body1" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', fontSize:'18px' ,textTransform: 'uppercase'}}>
  Details
        </Text>
        <Divider sx={{ width: '100%', margin: '16px 0' }} />



        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column',textTransform: 'uppercase' }}>
          <CalendarMonthOutlinedIcon sx={{ color: 'blue', marginRight: '8px' }} /> {appointment.Day}
        </Typography>
        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        {appointment.Time}
        </Typography>
        <Divider sx={{ width: '100%', margin: '16px 0' }} />
        <Text fw={600}  variant="body1" sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', fontSize:'18px' ,textTransform: 'uppercase'}}>
{appointment.status}
        </Text>


    
                      

         
  
      
      </CardContent>
      
    </Card>
    
    

</div>


    </div>
    ))}
    



    </>
    



      </>
    );
};

export default ViewerViewAppointments;
