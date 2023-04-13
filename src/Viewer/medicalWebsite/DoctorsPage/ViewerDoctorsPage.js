import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./ViewerDoctorsPage.css";
import toast, { Toaster } from "react-hot-toast";


const ViewerDoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    axios
      .get("http://localhost:8800/api/doctor/getalldoctors")
      .then((res) => {
        setDoctors(res.data);
        console.log(res.data + "This is doctors data");
      });
  };

  return (
    <>


      <div className="card-container">
        {doctors.map((doctor) => {
          console.log(doctor._id + "in return 1");

          return (
            <div key={doctor._id} className="card">



              <Link to={`/viewerdocprofile?doctor=${encodeURIComponent(JSON.stringify(doctor))}`}>
            <p>Name: {doctor.name}</p>
              </Link>



              <p>Gender: {doctor.gender}</p>
              <p>Department: {doctor.department}</p>
              <p>Average rating: {doctor.avgRating}</p>
              <p>Availability:</p>
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
        })}

      </div>
    </>
  );
};

export default ViewerDoctorsPage;
