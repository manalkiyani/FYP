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


  const [ templateId,setTemplateId] = useLocalStorageState("templateId")

  

  const [appointmentData, setAppointmentData] = useState([]);

  useEffect(() => {
    


    const fetchAppointments = async () => {


      const Template = await getTemplateId();
    console.log(Template)
    const response = await getWebsiteData(Template.templateId);
   


      try {
        const response = await axios.post('http://localhost:8800/api/doctor/getappointmentstoadmin', {
          TEMPLATEID: templateId
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
  return (
    <>

    {appointmentData.map((appointment, index) => (

    <Card
      style={{ width: "650px" }}
      withBorder
      padding="sm"
      radius="md"
      className={classes.card}
    >
      <Flex justify="space-between">
        <Group spacing="xl" mt="lg">
          <Avatar
            src="https://res.cloudinary.com/djlewzcd5/image/upload/v1683976266/pexels-pixabay-220453_eak891.jpg"
            radius="sm"
          />
          <div>
            <Text fw={500}>Dr. {appointment.DoctorName}</Text>
            <Text fz="xs" c="dimmed">
            {appointment.Day} -  {appointment.Time}
            </Text>
          </div>
        </Group>
        <Badge mt="lg" color="red">
         {appointment.status}
        </Badge>
      </Flex>
      

      <Card.Section className={classes.footer}>
           <Text fw={500}>Patients Info</Text>
           <Text fw={300} fz="sm" mt="md">
        Research indicates that staying physically active can help prevent or
        delay certain diseases, including some cancers, heart disease and
        diabetes, and also relieve depression and improve mood. Inactivity often
        accompanies advancing age, but it doesn't have to. Check with your local
        churches or synagogues, senior centers, and shopping malls for exercise
        and walking programs. Like exercise, your eating habits are often not
        good if you live and eat alone. It's important for successful aging to
        eat foods rich in nutrients and avoid the empty calories in candy and
        sweets
      </Text>
            <Flex justify="space-between">
        <Group spacing="xl" mt="lg">
         
          <div>
            <Text fw={500}>{appointment.PatientName}</Text>
            <Text fz="xs" c="dimmed">
            18 years - female
            </Text>
          </div>
          
        </Group>
         <Text mt="lg" fz="sm" c="dimmed">
            {appointment.sessionType}
          </Text>
        </Flex>
       
       
      </Card.Section>
    </Card>
        ))}
         </>
  );
}
