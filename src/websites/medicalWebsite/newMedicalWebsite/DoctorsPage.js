import { Container } from "@mantine/core";
import React from "react";
import { DoctorCard } from "./DoctorCard";
import { useState, useEffect } from "react";
import axios from "axios";
const DoctorsPage = ({ doctorIds }) => {
  const [doctors, setDoctors] = useState(null);

  const getDoctors = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8800/api/doctor/get`,{
          doctorIds
        }
      );
      console.log(response)
      setDoctors(response.data.Doctors);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, [doctorIds]);

  return (
    <Container size="90vw">
      {doctors &&
        doctors.map((doctor) => {
         return <DoctorCard
         id={doctor._id}
            image={doctor.image}
            title={doctor.name}
            department={doctor.department}
            qualification={doctor.latestQualification}
            experience={doctor.experience}
          />;
        })}
    </Container>
  );
};

export default DoctorsPage;
