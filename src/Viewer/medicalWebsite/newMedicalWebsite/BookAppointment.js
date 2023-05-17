import {
  Button,
  Container,
  Divider,
  Flex,
  Group,
  NumberInput,
  Select,
  Space,
  Text,
  TextInput,
  Textarea,
  Title,
  createStyles,
  rem,
} from "@mantine/core";
import { useLocalStorageState } from "ahooks";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
const inputStyles = createStyles((theme) => ({
  container: {
    width: rem(350),
  },
  root: {
    position: "relative",
  },
  time: {
    height: rem(35),
    border: "1px solid #ccc",
    width: rem(150),

    marginBottom: rem(16),
  },

  input: {
    height: rem(50),
    paddingTop: rem(18),
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
  },
  text: {
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: `calc(${theme.spacing.sm} / 2)`,
    zIndex: 1,
    fontWeight: 500,
  },
}));
const BookAppointment = () => {
  const [name, setName] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [slotid, setSlotId] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [day, setDay] = useState("");
  const { doctorId } = useParams();

  const [combinedTime, setCombinedTime] = useState("");
  const viewer = localStorage.getItem("viewer");
  const viewerObj = JSON.parse(viewer);
  const viewerId = viewerObj._id;
  const [templateId, setTemplateId] = useLocalStorageState("templateId", "");

  const navigate = useNavigate();

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  /***************************
   *
   *
   *
   *
   *
   *
   *
   * *****************************
   */

  const handleConfirmAppointment = async () => {
    if (name ==="" ||sessionType ==="" ||gender === "" ||age==="" ||slotid===""||description==="")
    {
      toast.error("please fill all the fields")
      return
    }
    try {
      // Update the slot to be booked
      const res = await axios.patch(
        `http://localhost:8800/api/doctor/changeisbookedstatus/${slotid}`,
        {
          isBooked: true,
        }
      );

      // Save the appointment details
      console.log(
        "This is data: " +
          doctorId +
          " " +
          viewerId +
          " " +
          slotid +
          " " +
          day +
          " " +
          combinedTime
      );
      const appointmentRes = await axios
        .post(`http://localhost:8800/api/doctor/bookappointment`, {
          doctorid: doctorId,
          patientid: viewerId,
          slot: slotid,
          Day: day,
          Time: combinedTime,
          name,
          sessionType,
          email,
          gender,
          description,
          age,
        })
        .then(async (appointmentRes) => {
          let appointmentId = appointmentRes.data._id;
          console.log("this is appointment id" + appointmentId);
          try {
            const response = await axios.put(
              "http://localhost:8800/api/doctor/appointmentidtotemplate",
              { appointmentId, templateId: templateId }
            );
          } catch (error) {
            console.log(error);
          }

          toast.success("Appointment Booked Successfully");
          navigate(-1);
        });
    } catch (err) {
      toast.success("System is currently busy , please try again later");
      console.log(err);
    }
  };

  const [slots, setSlots] = useState([]);

  const handleDayClick = (selectedDay) => {
    setDay(selectedDay);
    const dayOfWeek = selectedDay.toLowerCase();

    // Check if slots for the selected day are already fetched
    if (slots.length > 0) {
      setSlots([]);
    }

    // Make an Axios request to the backend to get the slots data
    axios
      .get(`http://localhost:8800/api/doctor/getslots/${doctorId}/${dayOfWeek}`)
      .then((response) => {
        setSlots(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSlotClick = (slot) => {
    const { id, start, end, day } = slot;
    setSlotId(id);
    const combinedTimeStartAndEnd = `${start}-${end}`;
    setCombinedTime(combinedTimeStartAndEnd);
  };

  /***************************
   *
   *
   *
   *
   *
   *
   *
   * *****************************
   */

  console.log("doctorId", doctorId);

  const { classes } = inputStyles();
  return (
    <>
    <Toaster position="top-center" />
     <Container size="80rem">
      <Divider my="sm" />
      <Title order={3}>Book An Appointment</Title>
      <Divider my="sm" />
      <Space h="xl" />
      <div>
        <Group spacing="xs" grow>
          <TextInput
            label="Patient Full Name"
            placeholder="Joseffine Luther "
            classNames={classes}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Select
            mt="md"
            mb={15}
            withinPortal
            data={["Home", "Clinic", "Video Call", "Phone Call"]}
            value={sessionType}
            onChange={setSessionType}
            placeholder="Pick one"
            label="Session Type"
            classNames={classes}
            required
          />
        </Group>

        <Group spacing="xs" grow>
          <TextInput
            label="Contatc Email"
            placeholder="johnny@gmail.com"
            classNames={classes}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Select
            mt="md"
            mb={15}
            withinPortal
            data={["Male", "Female", "Custom"]}
            value={gender}
            onChange={setGender}
            placeholder="Pick one"
            label="Gender"
            classNames={classes}
            required
          />
        </Group>
        <Group spacing="xs" grow>
          <Textarea
            placeholder="Describe your medical concern in 200 words or less"
            label="Your primary medical concern"
            variant="filled"
            withAsterisk
            minRows={4}
            value={description}
            onChange={handleDescriptionChange}
          />
          <NumberInput
            defaultValue={18}
            placeholder="18 years"
            label="Age (years)"
            withAsterisk
            value={age}
            onChange={setAge}
          />
        </Group>
      </div>
      <Select
        mt="md"
        mb={15}
        withinPortal
        data={["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]}
        value={day}
        onChange={(selectedDay) => handleDayClick(selectedDay)}
        placeholder="Pick one"
        label="Day"
        classNames={classes}
        required
      />

      <Text mb="sm" withAsterisk fz="sm">
        {" "}
        Choose a Slot
      </Text>

      <Flex wra="wrap">
        {slots.map((slot) => {
          const { start, end } = slot;
          return (
            <Button
              onClick={() => handleSlotClick(slot)}
              mr="sm"
              radius="xl"
              variant="default"
            >
              {start} - {end}
            </Button>
          );
        })}
      </Flex>
      <Space h="xl" />
      <Group position="center" mt="xl">
        <Button variant="default">Cancel</Button>
        <Button onClick={handleConfirmAppointment} color="cyan">
          Book Now
        </Button>
      </Group>
    </Container>
    </>
   
  );
};

export default BookAppointment;
