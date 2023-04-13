import React from "react";
import { useLocation } from "react-router-dom";

function BookAppointmentPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const doctor = JSON.parse(decodeURIComponent(searchParams.get("doctor")));
  const selectedDay = searchParams.get("day");
  const selectedTime = searchParams.get("time");
  const date = new Date(selectedDay);

  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  return (
    <div>
      <h1>Book an appointment with Dr. {doctor.name}</h1>
      <p>{doctor.description}</p>
      <p>Department: {doctor.department}</p>
      <p>Gender: {doctor.gender}</p>
      <p>Date: {formattedDate}</p>
      <p>Day: {selectedDay}</p>
      <p>Time Slot: {selectedTime}</p>
      <p>Location: {doctor.location}</p>
      <p>Contact: {doctor.contact}</p>
      <button>Confirm Appointment</button>
    </div>
  );
}

export default BookAppointmentPage;
