import React, { useState } from "react";


import axios from "axios";

import {
  Text,
  createStyles,
  rem,
  Select,
  TextInput,
  SegmentedControl,
  Button,
  FileInput,
  Stepper,
  Group,
  Avatar,
  NumberInput,
  Space,
} from "@mantine/core";
import ReactQuill from "react-quill";
import { uploadImage } from "../../../utilityFunctions/imageUpload";
import { useLocalStorageState } from "ahooks";
import { Toaster, toast } from "react-hot-toast";

const inputStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },
  time:{
      height: rem(35),
      border:'1px solid #ccc',
      width:rem(150),
     
       marginBottom:rem(16)

      
   
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
const modules = {
  toolbar: {
    container: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ list: "ordered" }, { list: "bullet" }],
      // text direction

      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
    ],
  },
};
const EditDoctorForm = ({setOpen, id1,  title1, department1,
  address1,
  experience1,
  availability1,
  description1,
  gender1,
  qualification1
}) => {
  const [template, setTemplate] = useLocalStorageState("template", "");

  //save data
  const [id, setId] = useState(id1);
  const [name, setName] = useState(title1);
  const [gender, setGender] = useState(gender1);
  const [department, setDepartment] = useState(department1);
  const [latestQualification, setLatestQualification] = useState(qualification1);
  const [description, setDescription] = useState(description1);
  const [experienceInMonths, setExperienceInMonths] = useState(Number(experience1));
  const [address, setAddress] = useState(address1);
  // const [availability, setAvailability] = useState({});
  const [availability, setAvailability] = useState(availability1);
  const [doctorId, setDoctorId] = useState();
  const [slots, setSlots] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  });

  const splitTimeRange = (start, end) => {
    const slots = [];
    let current = new Date(`2022-01-01T${start}:00`);
    const endSlot = new Date(`2022-01-01T${end}:00`);
    while (current < endSlot) {
      const slotStart = current.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      current.setMinutes(current.getMinutes() + 30);
      const slotEnd = current.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      slots.push(`${slotStart}-${slotEnd}`);
    }
    return slots;
  };

  const handleSubmit =async(event)  => {
    event.preventDefault();

    const updatedDoctor = {
        name,
        gender,
        department,
        availability,
        description,
        address

      };

      try {
        const response = await axios.put(`http://localhost:8800/api/doctor/editdoctor/${id}`, updatedDoctor);
        console.log(response.data);
        setOpen(false);
      } catch (error) {
        console.log(error);
      }

    
  };

  const addSlotsToDatabase = async (doctorId) => {
    try {
      const days = Object.keys(slots);
      const slotIds = {};
      for (let i = 0; i < days.length; i++) {
        const day = days[i];
        const daySlots = slots[day];
        slotIds[day] = [];
        for (let j = 0; j < daySlots.length; j++) {
          const slot = daySlots[j];
          const [startTime, endTime] = slot.split("-");
          const slotData = {
            day,
            startTime,
            endTime,
          };
          const { data } = await axios.post(
            "http://localhost:8800/api/doctor/addslots",
            slotData
          );
          slotIds[day].push(data._id);
        }
      }
      console.log(slotIds);

      alert("Slots added successfully!");

      console.log(doctorId + "this is doc id in hook");
      axios
        .put("http://localhost:8800/api/doctor/addslotsidindoctor", {
          doctorId,
          slotIds,
        })
        .then((res) => {
          alert("Slots in doctor added!");
        })
        .catch((error) => {
          console.error(error);
          alert("Error adding slots in doctor.");
        });

      setSlots({
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
      });
    } catch (error) {
      console.error(error);
      alert("Error adding slots. Please try again later.");
    }
  };

  const handleAvailabilityChange = (day, value) => {
    setAvailability((prevAvailability) => ({
      ...prevAvailability,
      [day]: value,
    }));
    setSlots((prevSlots) => ({
      ...prevSlots,
      [day]: value ? splitTimeRange(value.start, value.end) : [],
    }));
  };

  const quillRef = React.useRef(null);

  const { classes } = inputStyles();

  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const saveInformation = () => {
    nextStep();
  };
  const [image, setImage] = useState(null);
  const [displayImage, setDisplayImage] = useState(null);

  const fileChange = (e) => {
    const newImage = e.target.files[0];

    if (newImage) {
      setImage(newImage);
      setDisplayImage(URL.createObjectURL(newImage));
    }
  };

  return (
    <>
    <Toaster position="top-center" />
     <div >
      <Stepper
        color="cyan"
        mt={20}
        active={active}
        onStepClick={setActive}
        breakpoint="sm"
      >
        <Stepper.Step
          label="First step"
          description="Provide basic information"
        >
        
          <div >
            <Group>
              <Avatar
                style={{
                  width: "150px",
                  height: "150px",
                  marginBottom: "10px",
                }}
                radius="xl"
                src={displayImage}
                alt="it's me"
              />

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  style={{ marginRight: "10px", width: "20px", height: "20px" }}
                  className="writeIcon"
                  alt=""
                  src="https://res.cloudinary.com/djlewzcd5/image/upload/v1670250225/plus_2_qak15o.png"
                />{" "}
                Add Image
                <input
                  multiple
                  className="input"
                  type="file"
                  name="file"
                  onChange={fileChange}
                ></input>
              </label>
            </Group>
            <Group spacing="xs" grow>
              <TextInput
                label="Doctor Name"
                placeholder="Dr. Jeffrey"
                classNames={classes}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Select
                mt="md"
                mb={15}
                withinPortal
                data={[
                  "Cardiology",
                  "Neurology",
                  "Dermatology",
                  "Orthopedics",
                  "Gastroenterology",
                  "Ophthalmology",
                  "Endocrinology",
                  "Psychiatry",
                  "Oncology",
                  "Rheumatology",
                  "Nephrology",
                  "Urology",
                  "Pulmonology",
                  "Allergy and Immunology",
                  "Infectious Disease",
                  "Hematology",
                  "Physical Medicine and Rehabilitation",
                  "Pediatrics",
                  "Geriatrics",
                  "Emergency Medicine",
                ]}
                value={department}
                onChange={setDepartment}
                placeholder="Pick one"
                label="Department"
                classNames={classes}
                required
              />
            </Group>
            <Group spacing="xs" grow>
              <TextInput
                label="Address"
                placeholder="Office 245, 2nd Floor, Cardiac Block"
                classNames={classes}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
              <NumberInput
                defaultValue={4}
                placeholder="18 years"
                label="Experience (years)"
                withAsterisk
                value={experienceInMonths}
                onChange={setExperienceInMonths}
              />
              <div>
                <Text className={classes.text} mb={10}>
                  Highest Qualification
                </Text>
                <SegmentedControl
                  fullWidth
                  radius="xl"
                  size="sm"
                  data={[
                    "Associate",
                    "Masters",
                    "Bachelors",
                    "Ph.D",
                    "Pursuing Degree",
                  ]}
                  onChange={setLatestQualification}
                  value={latestQualification}
                />
              </div>
            </Group>
          </div>
          <Space h="xl" />
          <Group position="center" mt="xl">
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep} color="cyan">
              Next Step
            </Button>
          </Group>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Add Availability">
          <div >
             <Space h="xl" />
            <h5 > Available Time Slots</h5>
            {/* <img  src={job1} alt="girlOnLaptop" /> */}
          </div>
         
          <div >
            <Space h="xl" />
            <div>
              {["monday", "tuesday", "wednesday", "thursday", "friday"].map(
                (day) => (
                  <div key={day}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}:{" "}
                    <input
                   style={{marginLeft: day === "wednesday" ?  '77px' : 
                   day === "friday" ? '115px' :  day === "thursday" ? '95px' :'100px'  }}

                    className={classes.time}
                      type="time"
                      value={availability[day] ? availability[day].start : ""}
                      onChange={(e) =>
                        handleAvailabilityChange(day, {
                          ...(availability[day] || {}),
                          start: e.target.value,
                        })
                      }
                    />{" "}
                    -{" "}
                    <input
                     className={classes.time}
                      type="time"
                      value={availability[day] ? availability[day].end : ""}
                      onChange={(e) =>
                        handleAvailabilityChange(day, {
                          ...(availability[day] || {}),
                          end: e.target.value,
                        })
                      }
                    />
                  </div>
                )
              )}
            </div>
          </div>
          <Group position="center" mt="xl">
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep} color="cyan">
              Next Step
            </Button>
          </Group>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Describe the doctor">
          <Space h="xl" />
          <div >
            <h5 > Doctor Description</h5>
            
          </div>
          <div >
          
            <div style={{ height: "50vh" }}>
              <ReactQuill
                ref={quillRef}
                placeholder={
                  "Describe the responsibilities of this Doctor, work experience,skills, or education"
                }
                style={{ height: "90%" }}
                theme="snow"
                value={description}
                onChange={setDescription}
                modules={modules}
              />
            </div>
          </div>
          <Group position="center" mt="xl">
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
            <Button color="cyan" onClick={handleSubmit}>
              Submit Now
            </Button>
          </Group>
        </Stepper.Step>
        <Stepper.Completed>
          <div >
            <h5>Doctor has been posted Successfully </h5>
          </div>
        </Stepper.Completed>
      </Stepper>

      {/* basic information */}
    </div>
    </>
   
  );
};

export default EditDoctorForm;

