import {
  createStyles,
  Card,
  Group,
  Text,
  Avatar,
  Badge,
  rem,
  Flex,
} from "@mantine/core";
import axios from "axios";
import { useState, useEffect } from "react";
import { useLocalStorageState } from "ahooks";
import { getWebsiteData } from "../../../../../src/utilityFunctions/websiteDataController";
import { getTemplateId } from "../../../../../src/utilityFunctions/TemplateIdController";
import { Button } from "@material-ui/core";


const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs} ${theme.spacing.lg}`,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}));

export function ViewAppointment({ doctor, day, status, slot, patientName }) {
  const { classes, theme } = useStyles();


  const [ templateId,setTemplateId] = useState()

  

  const [appointmentData, setAppointmentData] = useState([]);


  const fetchAppointments = async () => {
    const Template = await getTemplateId();
    console.log(Template);
    const response = await getWebsiteData(Template.templateId);
    console.log(response);
    console.log('ABOVE IS RES')


    let templateid = response.websiteData.templateId
    setTemplateId(templateid);
    console.log("templateid us: "+ templateid)



    try {
      console.log(templateid+ "THIS IS IDd");
      //645faec0efc31bb14ca8c89e
      const response = await axios.post('http://localhost:8800/api/doctor/getappointmentstoadmin', {
        TEMPLATEID: templateid
        // TEMPLATEID: '646b7e4f54142732f882a07c'
      });
      setAppointmentData(response.data);
      console.log("this is apps got")
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {

    fetchAppointments();
  }, []);
  
  const handleCompleted = async (appointmentid) => {
    try {
      const response = await axios.put('http://localhost:8800/api/doctor/doctorcompletesappointment',{appointmentid});
      const updatedAppointment = response.data;
      const updatedAppointments =  appointmentData.map((appointment) => {
        if (appointment._id === updatedAppointment._id) {
          return updatedAppointment;
        } else {
          return appointment;
        }
      });
      setAppointmentData(updatedAppointments);
      fetchAppointments();
    } catch (error) {
      console.error(error);
    }
  }

  console.log(appointmentData)
  return (
    <>
      { appointmentData && appointmentData.length > 0 ? (
        appointmentData.map((appointment, index) => (
    
          <Card
            // style={{ width: "650px", marginBottom:'25px'}}
            style={{ marginBottom:'25px',marginLeft:'-10%', marginRight:'15%'}}
            withBorder
            padding="sm"
            radius="md"
            className={classes.card}
            key={index}
          >
            <Flex style={{backgroundColor:"#EDFAF8", paddingBottom:'12px'}} justify="space-between">
              <Group spacing="xl" mt="lg">
                <Avatar
                  src="https://res.cloudinary.com/djlewzcd5/image/upload/v1683976266/pexels-pixabay-220453_eak891.jpg"
                  radius="sm"
                />
                <div>
                  <Text style={{fontSize:'24px'}} fw={500}>Dr. {appointment.DoctorName}</Text>
                  <Text style={{fontSize:'18px'}}  fz="xs" c="dimmed">
                    {appointment.Day} - {appointment.Time}
                  </Text>
                </div>
              </Group>
              <Badge style={{fontSize:'12px', marginRight:'5px'}} mt="lg" color="blue">
                {appointment.status}

                
              </Badge>
              
            </Flex>
  
            <Card.Section className={classes.footer}>
              <Text style={{fontSize:'22px'}} fw={500}>Patients Info</Text>
              <Text style={{fontSize:'18px'}} fw={300} fz="sm" mt="md">
                {/* Research indicates that staying physically active can help prevent or
                delay certain diseases, including some cancers, heart disease and
                diabetes, and also relieve depression and improve mood. Inactivity often
                accompanies advancing age, but it doesn't have to. Check with your local
                churches or synagogues, senior centers, and shopping malls for exercise
                and walking programs. Like exercise, your eating habits are often not
                good if you live and eat alone. It's important for successful aging to
                eat foods rich in nutrients and avoid the empty calories in candy and
                sweets */}
                {appointment.description}
              </Text>
              <Flex justify="space-between">
                <Group spacing="xl" mt="lg">
                <Text style={{fontSize:'24px'}} fw={500}>{appointment.PatientName}</Text>
                  <div style={{display:'flex'}}>

                    <Text style={{fontSize:'18px'}} fz="xs" c="dimmed">
                      18 years - female
                    </Text>

                  </div>
                </Group>
                <Text style={{fontSize:'18px'}} mt="lg" fz="sm" c="dimmed">
                  {appointment.sessionType}
                </Text>
              </Flex>
            </Card.Section>
            {appointment.status === 'pending' && <Card.Section  withBorder className={classes.footer} style={{display:'flex', justifyContent:'center', AlignItems:'center', backgroundColor:"#EDFAF8"}}>
            {appointment.status === 'pending' ? <Badge style={{fontSize:'16px', marginTop:'10px', marginBottom:'10px'}} onClick={()=>handleCompleted(appointment._id)}>Complete Appointment</Badge> :null }

            </Card.Section>}
          </Card>
        ))
      ) : (
        <div>
          {appointmentData.message === "No appointments found" ? (
            "No appointments Booked"
          ) : (
            "Loading..."
          )}
        </div>
      )}
    </>
  );
  
}
