import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

function ViewerDocProfile() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const doctor = JSON.parse(decodeURIComponent(searchParams.get("doctor")));
  const patient = JSON.parse(decodeURIComponent(searchParams.get("patient")));
  const [selectedDay, setSelectedDay] = useState(null);
  const [slots, setSlots] = useState([]);


  // const splitTimeRange = (start, end) => {
  //   const slots = [];
  //   let current = new Date(`2022-01-01T${start}:00`);
  //   const endSlot = new Date(`2022-01-01T${end}:00`);
  //   while (current < endSlot) {
  //     const slotStart = current.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  //     current.setMinutes(current.getMinutes() + 30);
  //     const slotEnd = current.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  //     slots.push({ start: slotStart, end: slotEnd });
  //   }
  //   return slots;
  // };

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
  

  // use the received data here
  return (
    <div>
      <h1>NAME: {doctor.name}</h1>
      <p>Gender: {doctor.gender}</p>
      <p>Department: {doctor.department}</p>
      <p>Average Rating: {doctor.avgRating}</p>
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
            {start} - {end}
          </button>
        </li>
      );
    })}
  </ul>
)}


    </div>
  );
}
export default ViewerDocProfile;

