import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ViewerDoctorsPage.css";
import toast, { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, FormControl, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const ViewerDoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const location = useLocation();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [patient, setPatient] = useState(location.state);
  const [selectedDay, setSelectedDay] = useState(null);
  const [expanded, setExpanded] = useState({});

  const handleAvailabilityClick = (doctorId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [doctorId]: !prevExpanded[doctorId],
    }));
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    axios.get("http://localhost:8800/api/doctor/getalldoctors").then((res) => {
      setDoctors(res.data);
      console.log(res.data + "This is doctors data");
      setExpanded(
        res.data.reduce((prevExpanded, doctor) => {
          prevExpanded[doctor._id] = false;
          return prevExpanded;
        }, {})
      );
    });
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  return (
    <>
      <h1>Welcome {patient.name}!</h1>
      <div className="card-container">
        {doctors.map((doctor) => {
          console.log(doctor._id + "in return 1");

          return (
            <div key={doctor._id} className="card">
              <Link
                to={`/viewerdocprofile?doctor=${encodeURIComponent(
                  JSON.stringify(doctor)
                )}&patient=${encodeURIComponent(JSON.stringify(patient))}`}
              >
                <p>Name: {doctor.name}</p>
              </Link>

              <p>Gender: {doctor.gender}</p>
              <p>Department: {doctor.department}</p>
              <p>Average rating: {doctor.avgRating}</p>

              <Accordion expanded={expanded[doctor._id]} onChange={() => handleAvailabilityClick(doctor._id)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="availability-content" id="availability-header">
                  <Typography>Availability</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FormControl fullWidth>
          
                    <Select labelId="day-select-label" id="day-select" value={selectedDay} onChange={handleDayChange}>
                      <MenuItem value="monday">Monday</MenuItem>
                      <MenuItem value="tuesday">Tuesday</MenuItem>
                      <MenuItem value="wednesday">Wednesday</MenuItem>
                      <MenuItem value="thursday">Thursday</MenuItem>
                      <MenuItem value="friday">Friday</MenuItem>

                    </Select>
                  </FormControl>
                  {selectedDay && (
                    <ul>
                      <li>
                        {selectedDay.charAt(0).toUpperCase() + selectedDay.slice(1)}: {doctor.availability[selectedDay].start} -{" "}
                        {doctor.availability[selectedDay].end}
                      </li>
                    </ul>
                  )}
                </AccordionDetails>
              </Accordion>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ViewerDoctorsPage;
