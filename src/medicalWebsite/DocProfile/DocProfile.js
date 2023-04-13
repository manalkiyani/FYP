import React from "react";
import { useLocation } from "react-router-dom";

function DocProfile() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const doctor = JSON.parse(decodeURIComponent(searchParams.get("doctor")));

  // use the received data here
  return (
    <div>
      <h1>NAME: {doctor.name}</h1>
      <p>Gender: {doctor.gender}</p>
      <p>Department: {doctor.department}</p>
      <p>Average Rating: {doctor.avgRating}</p>
      <ul>
                <li>
                  Monday: {doctor.availability.monday.start} -{" "}
                  {doctor.availability.monday.end}
                </li>
                <li>
                  Tuesday: {doctor.availability.tuesday.start} -{" "}
                  {doctor.availability.tuesday.end}
                </li>
                <li>
                  Wednesday: {doctor.availability.wednesday.start} -{" "}
                  {doctor.availability.wednesday.end}
                </li>
                <li>
                  Thursday: {doctor.availability.thursday.start} -{" "}
                  {doctor.availability.thursday.end}
                </li>
                <li>
                  Friday: {doctor.availability.friday.start} -{" "}
                  {doctor.availability.friday.end}
                </li>
              </ul>
    </div>
  );

}

export default DocProfile;
