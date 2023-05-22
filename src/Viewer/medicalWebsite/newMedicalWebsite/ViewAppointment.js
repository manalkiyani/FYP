import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
  rem,
  Flex,
} from "@mantine/core";
import { useState, useEffect } from "react";
import axios from "axios";
import { getTemplateId } from "../../../utilityFunctions/TemplateIdController";
import { getWebsiteData } from "../../../utilityFunctions/websiteDataController";

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

// export async function CheckAppointment({ doctor, day, status, slot, patientName }) {
  export function CheckAppointment  ({ doctor, day, status, slot, patientName })  {


  const { classes, theme } = useStyles();


//   const patient = localStorage.getItem('viewer')
//   const patientObj = JSON.parse(patient);
//  const patientId = patientObj._id;
//  const patientId = patientObj._id;
const [viewerId, setViewerId] = useState('')



  

  const [doctors, setDoctors] = useState([]);

  const [appointments, setAppointments] = useState([]);


  const getDoctorName = (doctorId) => {
      
      const doctor = doctors.find((doctor) => doctor?._id === doctorId);
      return doctor ? doctor.name: 'Unknown';
  };
  const getDoctorImage = (doctorId) => {
    const doctor = doctors.find((doctor) => doctor._id === doctorId);
    return doctor && doctor.image !== "" ? doctor.image : "https://res.cloudinary.com/djlewzcd5/image/upload/v1683976266/pexels-pixabay-220453_eak891.jpg";
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
  // Asynchronous logic...
  const fetchData = async () => {
    try {
      const template = await getTemplateId();
      console.log(template);
      const response = await getWebsiteData(template.templateId);
      setViewerId(response.websiteData.viewerId);
      const patientId = response.websiteData.viewerId;

      fetchDoctors();
      const appointmentsResponse = await axios.post(
        'http://localhost:8800/api/doctor/getappointmentstoviewer',
        { patientId }
      );
      setAppointments(appointmentsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);


const fetchDoctors = () => {
  axios.get("http://localhost:8800/api/doctor/getalldoctors").then((res) => {
    setDoctors(res.data);
    console.log(res.data + "This is doctors data");

  });
};


  return (

    <>
        {appointments.map((appointment, index) => (

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
            src={getDoctorImage(appointment.doctorid)}
            radius="sm"
          />
          <div>
            <Text fw={500}>Dr. {getDoctorName(appointment.doctorid)}</Text>
            <Text fz="xs" c="dimmed">
              {appointment.Day}
            </Text>
          </div>
        </Group>
        <Badge mt="lg" color="red">
          {appointment.status}
        </Badge>
      </Flex>

      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text  fz="sm" >
            {appointment.Time}
            
          </Text>
          <Text fz="sm" c="dimmed" >
              {appointment.sessionType}
            </Text>
        </Group>
      </Card.Section>
    </Card>
        ))}
    </>
  );
}
