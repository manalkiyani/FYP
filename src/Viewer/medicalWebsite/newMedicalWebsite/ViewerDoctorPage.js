import { Container } from "@mantine/core";
import React from "react";
import {AccordionDetails, AccordionSummary, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import {


  Accordion,

  TextInput,


} from "@mantine/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import { useState, useEffect } from "react";
import axios from "axios";
import { ViewerDoctorCard } from "./ViewerDoctorCard";
const ViewerDoctorPage = ({ doctorIds }) => {
  const [doctors, setDoctors] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const departments = [
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
  ];






  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

const handleSearchChange = (event) => {
  setSearchTerm(event.target.value);
  
};

  const getDoctors = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8800/api/doctor/get`,
        {
          doctorIds,
        }
      );
      console.log(response);
      setDoctors(response.data.Doctors);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
    
  }, []);

  const filteredDoctors = doctors && doctors.filter((doctor) =>
  doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
  (selectedDepartment === '' || doctor.department === selectedDepartment)
);



  return (
    <>
            <Accordion style={{display:'flex'}} >
  <Accordion.Item value="credit-card">
    <Accordion.Control>
      <SearchOutlinedIcon />
      Search doctors by name
    </Accordion.Control>
    <Accordion.Panel>
      <TextInput
        placeholder="Doctor's name"
        value={searchTerm}
        onChange={handleSearchChange}
        required
      />
    </Accordion.Panel>
  </Accordion.Item>
  <Accordion.Item  value="department">
    <Accordion.Control>
      <SearchOutlinedIcon />
      Search doctors by department
    </Accordion.Control>
    <Accordion.Panel>
      <FormControl fullWidth>
        <InputLabel id="department-select-label">Department</InputLabel>
        <Select
  labelId="department-select-label"
  id="department-select"
  value={selectedDepartment}
  onChange={handleDepartmentChange}
  label="Department"
>
  <MenuItem value="">All Departments</MenuItem>
  {departments.map((department) => (
    <MenuItem key={department} value={department}>{department}</MenuItem>
  ))}
</Select>

      </FormControl>
    </Accordion.Panel>
  </Accordion.Item>
</Accordion> 
    <Container size="90vw">

    {doctors && filteredDoctors.map((doctor) => (
    
    <div style={{ width: '80%', padding: '10px' }}>

      <ViewerDoctorCard
              id={doctor._id}
              image={doctor.image}
              title={doctor.name}
              department={doctor.department}
              qualification={doctor.latestQualification}
              experience={doctor.experience}
      />
    </div>
  ))}


      {/* {doctors &&
        doctors.map((doctor) => {
          return (
            <ViewerDoctorCard
              id={doctor._id}
              image={doctor.image}
              title={doctor.name}
              department={doctor.department}
              qualification={doctor.latestQualification}
              experience={doctor.experience}
            />
          );
        })} */}
    </Container>
    </>
  );
};

export default ViewerDoctorPage;
