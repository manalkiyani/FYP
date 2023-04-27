import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import "./DoctorsPage.css";
import toast, { Toaster } from "react-hot-toast";
import EditDoctorForm from "../EditDoctorForm/EditDoctorForm";

const DoctorsPage = () => {

  const TEMPLATEID = '64466439e08c4f5f864bceac'


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

  const handleDocProfile = () =>{
    console.log("ABC")
  }

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleDelete = (docID) => {
    console.log("This is doctor id in handleDelete " + docID);
    axios
      .delete(`http://localhost:8800/api/doctor/deldoctor/${docID}`)
      .then((res) => {
        console.log(res.data + "This is doctors data");


        axios.put("http://localhost:8800/api/doctor/deldoctoridfromtemplate",{TEMPLATEID, doctorid: docID})
        .then((res) => {
          console.log(res.data + "This is doctors data");
          fetchDoctors();
        })

        fetchDoctors();
      })
      .then(function (response) {
        toast.success("Doctor Deleted Successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <Link to="/adddoctor">
          <button>add doctor</button>
        </Link>
      </div>

      <div className="card-container">
        {doctors.map((doctor) => {
          console.log(doctor._id + "in return 1");

          return (
            <div key={doctor._id} className="card">
              <button onClick={() => handleEdit(doctor)}>Edit</button>
              <button onClick={() => handleDelete(doctor._id)}>Delete</button>

              <Link to={`/docprofile?doctor=${encodeURIComponent(JSON.stringify(doctor))}`}>
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
        {open && (
          <EditDoctorForm
            setOpen={setOpen}
            doctor={selectedDoctor}
          ></EditDoctorForm>
        )}
      </div>
    </>
  );
};

export default DoctorsPage;
