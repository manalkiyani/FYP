import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';


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
    <Container
      bg="#FBFBFB"
      className={classes.Container}
      size="300rem"
      padding="xl"
      mih="100vh"
    >
      <Flex justify="flex-start" direction="column">
        <Card mih="100vh" withBorder radius="md" className={classes.card}>
          <Group position="apart" mb="xl" mt="md">
            <div>
              <Text fw={500}>{doctor.name}</Text>

              <Text fz="xs" c="dimmed">
              {doctor.gender } , 
                {doctor.department  } , 
                Location comes here 
                {/* {doctor.location} */}
              </Text>
            </div>

          </Group>

          <Card.Section className={classes.section}>
            <Flex justify="space-between">
              <div>
                <Text fz="sm" c="dimmed" className={classes.label}>
                  Available Appointments
                </Text>

                <Group spacing={8} mb={-8}>
      

                    <ul>
                      {daysToShow.map((day) => (
                      <li key={day.toDateString()} onClick={() => handleDayClick(day)}>
                      {day.toLocaleDateString('en-US', { weekday: 'long' })}: {doctor.availability[day.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()]?.start} - {doctor.availability[day.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase()]?.end}
                      </li>
                      ))}
                      </ul>
                    {selectedDay && (
                    <ul>
                  {slots.map((slot) => {
                  const { start, end } = slot;
                    return (
                  <li key={`${selectedDay}-${slot}`}>
                  <button onClick={() => handleSlotClick(slot)}>
                  <Badge color="red" size="lg">
                  {start} - {end}
                  </Badge>
                </button>
                </li>
                );
                })}
                </ul>
              )}
                </Group>
              </div>

              <div>
                <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                  $168.00
                </Text>
                <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }} mt={3}>
                  per appointment
                </Text>
              </div>
            </Flex>
          </Card.Section>
        </Card>
      </Flex>
    </Container>
  );
};

export default ViewerDocProfile;
