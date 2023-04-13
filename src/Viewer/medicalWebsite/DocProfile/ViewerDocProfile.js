import React from "react";
import { useLocation } from "react-router-dom";

function ViewerDocProfile() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const doctor = JSON.parse(decodeURIComponent(searchParams.get("doctor")));

  const splitTimeRange = (start, end) => {
    const slots = [];
    let current = new Date(`2022-01-01T${start}:00`);
    const endSlot = new Date(`2022-01-01T${end}:00`);
    while (current < endSlot) {
      const slotStart = current.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      current.setMinutes(current.getMinutes() + 30);
      const slotEnd = current.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      slots.push(`${slotStart} - ${slotEnd}`);
    }
    return slots;
  };

  const renderAvailabilityButtons = (availability) => {
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];
    return days.map((day) => {
      const slots = splitTimeRange(
        availability[day].start,
        availability[day].end
      );
      return (
        <div key={day}>
          <p>{day.toUpperCase()}</p>
          {slots.map((slot) => (
            <button key={slot}>{slot}</button>
          ))}
        </div>
      );
    });
  };

  return (
    <div>
      <h1>NAME: {doctor.name}</h1>
      <p>Gender: {doctor.gender}</p>
      <p>Department: {doctor.department}</p>
      <p>Average Rating: {doctor.avgRating}</p>
      <div>{renderAvailabilityButtons(doctor.availability)}</div>
    </div>
  );
}

export default ViewerDocProfile;
