import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function ViewerDocProfile() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const doctor = JSON.parse(decodeURIComponent(searchParams.get("doctor")));

  const [selectedDay, setSelectedDay] = useState(null);

  const splitTimeRange = (start, end) => {
    const slots = [];
    let current = new Date(`2022-01-01T${start}:00`);
    const endSlot = new Date(`2022-01-01T${end}:00`);
    while (current < endSlot) {
      const slotStart = current.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      current.setMinutes(current.getMinutes() + 30);
      const slotEnd = current.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      slots.push({ start: slotStart, end: slotEnd });
    }
    return slots;
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleSlotClick = (slot) => {
    const { start, end } = slot;
    const { start: dayStart, end: dayEnd } = doctor.availability[selectedDay];
    const combinedTime = `${start}-${end}`;
    const doctorObj = encodeURIComponent(JSON.stringify(doctor));
    const url = `/bookappointmentpage?day=${selectedDay}&time=${combinedTime}&dayStart=${dayStart}&dayEnd=${dayEnd}&doctor=${doctorObj}`;
    window.location.href = url;
  };
  
  

  // use the received data here
  return (
    <div>
      <h1>NAME: {doctor.name}</h1>
      <p>Gender: {doctor.gender}</p>
      <p>Department: {doctor.department}</p>
      <p>Average Rating: {doctor.avgRating}</p>
      <ul>
        <li onClick={() => handleDayClick("monday")}>
          Monday: {doctor.availability.monday.start} - {doctor.availability.monday.end}
        </li>
        <li onClick={() => handleDayClick("tuesday")}>
          Tuesday: {doctor.availability.tuesday.start} - {doctor.availability.tuesday.end}
        </li>
        <li onClick={() => handleDayClick("wednesday")}>
          Wednesday: {doctor.availability.wednesday.start} - {doctor.availability.wednesday.end}
        </li>
        <li onClick={() => handleDayClick("thursday")}>
          Thursday: {doctor.availability.thursday.start} - {doctor.availability.thursday.end}
        </li>
        <li onClick={() => handleDayClick("friday")}>
          Friday: {doctor.availability.friday.start} - {doctor.availability.friday.end}
        </li>
      </ul>
      {selectedDay && (
        <ul>
{selectedDay && (
  <ul>
    {splitTimeRange(
      doctor.availability[selectedDay].start,
      doctor.availability[selectedDay].end
    ).map((slot) => (
      <li key={`${selectedDay}-${slot.start}`}>
        <button onClick={() => handleSlotClick(slot)}>
          {slot.start} - {slot.end}
        </button>
      </li>
    ))}
  </ul>
)}
        </ul>
      )}
    </div>
  );
}

export default ViewerDocProfile;

