import React, { useState } from "react";
import styles from "./AddDoctorPage.module.css";
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
} from "@mantine/core";
import ReactQuill from "react-quill";
import { DatePickerInput } from "@mantine/dates";
import { add } from "lodash";
import { uploadImage } from "../../../utilityFunctions/imageUpload";

const inputStyles = createStyles((theme) => ({
  root: {
    position: "relative",
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
const AddDoctorPage = () => {

  const TEMPLATEID = '64466439e08c4f5f864bceac'


  //save data
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [department, setDepartment] = useState('');
  const [latestQualification, setLatestQualification] = useState('');
  const [description, setDescription] = useState('');
  const [experienceInMonths, setExperienceInMonths] = useState('');
  const [address, setAddress] = useState('');
  const [availability, setAvailability] = useState({});
  const [doctorId, setDoctorId] = useState()
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
      const slotStart = current.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      current.setMinutes(current.getMinutes() + 30);
      const slotEnd = current.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      slots.push(`${slotStart}-${slotEnd}`);
    }
    return slots;
  };

  const handleSubmit = async () => {

    if (
      !name ||
      !gender ||
      !department ||
      !latestQualification ||
      !description ||
      !experienceInMonths ||
      !address ||
      Object.keys(availability).length === 0 ||
      Object.values(slots).some((value) => value.length === 0)
    ) {
      console.log(     
         name,
        gender,
        department,
        latestQualification,
        description,
        experienceInMonths,
        address,
        availability,)
      alert('Please fill all fields including availability.');
      return;
    }

    let link="";
    try {
      link = await uploadImage(image);
      console.log(link);
    } catch (err) {
      console.log(err);
    }

  
    const data = {
      image : link,
      name,
      gender,
      department,
      latestQualification,
      description,
      experienceInMonths,
      address,
      availability,
    };

    axios.post('http://localhost:8800/api/doctor/adddoctor', data)
    .then((response) => {
      setDoctorId(response.data._id);
      addSlotsToDatabase(response.data._id);
  
      alert('Doctor added successfully!');
      setName('');
      setGender('');
      setDepartment('');
      setLatestQualification('');
      setDescription('');
      setExperienceInMonths('');
      setAddress('');
      setAvailability({});
      setSlots({
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
      });
      return response.data._id; // Return the doctorId for the next then block
    })
    .then((doctorId) => {
      console.log(doctorId)
      axios.put(
        "http://localhost:8800/api/doctor/doctoridtotemplate",
        { doctorId, templateId: TEMPLATEID }
      );
    })
    .catch((error) => {
      console.error(error);
      alert('Error adding doctor. Please try again later.');
    });
  
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
          const [startTime, endTime] = slot.split('-');
          const slotData = {
            day,
            startTime,
            endTime,
          };
          const { data } = await axios.post('http://localhost:8800/api/doctor/addslots', slotData);
          slotIds[day].push(data._id);
        }
      }
      console.log(slotIds);
  
      alert('Slots added successfully!');
  
      console.log(doctorId + 'this is doc id in hook');
      axios
        .put('http://localhost:8800/api/doctor/addslotsidindoctor', { doctorId, slotIds })
        .then((res) => {
          alert('Slots in doctor added!');
        })
        .catch((error) => {
          console.error(error);
          alert('Error adding slots in doctor.');
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
      alert('Error adding slots. Please try again later.');
    }
  };
  

  const handleAvailabilityChange = (day, value) => {
    setAvailability((prevAvailability) => ({ ...prevAvailability, [day]: value }));
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
    <div className={styles.container}>
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
          <div className={styles.titleContainer}>
            <h5 className={styles.title}>Provide basic information</h5>
            {/* <img className={styles.headerImage} src={job1} alt="girlOnLaptop" /> */}
          </div>
          <div className={styles.contentContainer}>

<Group>
          <Avatar style={{width:'150px', height:'150px', marginBottom:'10px'}} radius="xl" src={displayImage} alt="it's me" />

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
                'Cardiology',
                'Neurology',
                'Dermatology',
                'Orthopedics',
                'Gastroenterology',
                'Ophthalmology',
                'Endocrinology',
                'Psychiatry',
                'Oncology',
                'Rheumatology',
                'Nephrology',
                'Urology',
                'Pulmonology',
                'Allergy and Immunology',
                'Infectious Disease',
                'Hematology',
                'Physical Medicine and Rehabilitation',
                'Pediatrics',
                'Geriatrics',
                'Emergency Medicine',
              ]}
              value={department}
              onChange={setDepartment}
              placeholder="Pick one"
              label="Department"
              classNames={classes}
              required
            />
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
              data={[
                'Male',
                'Female',
                'Custom'
              ]}
              value={gender}
              onChange={setGender}
              placeholder="Pick one"
              label="Gender"
              classNames={classes}
              required
            />

<select
        value={experienceInMonths}
        onChange={(e) => setExperienceInMonths(e.target.value)}
      >
        <option value="">Select Experience (Years)</option>
        {Array.from({ length: 20     }, (_, i) => i + 1).map((month) => (
          <option key={month} value={month}>
            {month} Years
          </option>
        ))}
      </select>


 
    
            <Text className={classes.text} mt="sm" mb={10}>
              Highest Qualification
            </Text>
            <SegmentedControl
              radius="xl"
              size="md"
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
          <div className={styles.titleContainer}>
            <h5 className={styles.title}>Add Compensation</h5>
            {/* <img className={styles.headerImage} src={job1} alt="girlOnLaptop" /> */}
          </div>

          <div className={styles.contentContainer}>
            <Text className={classes.text} mb={10}>
              Available Time Slots
            </Text>
            <div>
        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
          <div key={day}>
            {day.charAt(0).toUpperCase() + day.slice(1)}:{' '}
            <input
              type="time"
              value={availability[day] ? availability[day].start : ''}
              onChange={(e) =>
                handleAvailabilityChange(day, {
                  ...(availability[day] || {}),
                  start: e.target.value,
                })
              }
            />{' '}
            -{' '}
            <input
              type="time"
              value={availability[day] ? availability[day].end : ''}
              onChange={(e) =>
                handleAvailabilityChange(day, {
                  ...(availability[day] || {}),
                  end: e.target.value,
                })
              }
            />
          </div>
        ))}
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
        <Stepper.Step label="Final step" description="Describe the job">
          <div className={styles.titleContainer}>
            <h5 className={styles.title}>Describe the job</h5>
            {/* <img className={styles.headerImage} src={job1} alt="girlOnLaptop" /> */}
          </div>
          <div className={styles.contentContainer}>
            <Text className={classes.text} withAsterisk mt="sm" mb={10}>
              Doctor Description
            </Text>

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
          <div className={styles.titleContainer}>
            <h5>Doctor has been posted Successfully </h5>
          </div>
        </Stepper.Completed>
      </Stepper>

      {/* basic information */}
    </div>
  );
};

export default AddDoctorPage;
