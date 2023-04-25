import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function BookAppointmentPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const doctor = JSON.parse(decodeURIComponent(searchParams.get("doctor")));
  const patient = JSON.parse(decodeURIComponent(searchParams.get("patient")));
  const selectedDay = searchParams.get("day");
  const dayofAppointment = searchParams.get("dayofApp");
  const selectedTime = searchParams.get("time");
  const slotid = searchParams.get("slotid");
  const date = new Date(selectedDay);

  const TEMPLATEID = '64466439e08c4f5f864bceac'

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });

  const [isBooked, setIsBooked] = useState(false);

  const handleConfirmAppointment = async () => {
    try {
      // Update the slot to be booked
      const res = await axios.patch(
        `http://localhost:8800/api/doctor/changeisbookedstatus/${slotid}`,
        {
          isBooked: true,
        }
      );
      setIsBooked(true);

      // Save the appointment details
      const appointmentRes = await axios
        .post(`http://localhost:8800/api/doctor/bookappointment`, {
          doctorid: doctor._id,
          patientid: patient._id,
          slot: slotid,
          Day: dayofAppointment,
          Time: selectedTime,
        })
        .then(async (appointmentRes) => {
          let appointmentId = appointmentRes.data._id;
          console.log("this is appointment id" + appointmentId);
          try {
            const response = await axios.put(
              "http://localhost:8800/api/doctor/appointmentidtotemplate",
              { appointmentId, templateId: TEMPLATEID }
            );
            console.log("this is response +" + response.data);
          } catch (error) {
            console.log(error);
          }

          console.log("appointment received");
        });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Book an appointment with Dr. {doctor.name}</h1>

      <p>{doctor.description}</p>
      <p>Department: {doctor.department}</p>
      <p>Gender: {doctor.gender}</p>
      <p>Date: {formattedDate}</p>
      <h2>Patient name: {patient.name}</h2>

      <p>Appointment Day: {dayofAppointment}</p>
      <p>Time Slot: {selectedTime}</p>
      <p>Location: {doctor.address}</p>
      <p>Contact: {patient.contact_info}</p>
      {isBooked ? (
        <p>Appointment confirmed!</p>
      ) : (
        <button onClick={handleConfirmAppointment}>Confirm Appointment</button>
      )}
    </div>
  );
}

export default BookAppointmentPage;
