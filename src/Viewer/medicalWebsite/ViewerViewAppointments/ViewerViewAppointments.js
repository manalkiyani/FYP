import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const ViewerViewAppointments = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const patientId = searchParams.get('patient_id');
    const [doctors, setDoctors] = useState([]);

    const [appointments, setAppointments] = useState([]);



    const getDoctorName = (doctorId) => {
        
        const doctor = doctors.find((doctor) => doctor._id === doctorId);
        return doctor ? doctor.name: 'Unknown';
    };
  
    useEffect(() => {

        fetchDoctors();
      axios.post('http://localhost:8800/api/doctor/getappointmentstoviewer', {
          patientId
        })
        .then(response => {
          setAppointments(response.data);

        })
        .catch(error => {
          console.log(error);
        });
    }, [patientId]);


  const fetchDoctors = () => {
    axios.get("http://localhost:8800/api/doctor/getalldoctors").then((res) => {
      setDoctors(res.data);
      console.log(res.data + "This is doctors data");

    });
  };
  
    return(
      <div>
        <h2>Appointments</h2>
        <div className="appointments-container">
          {appointments.map(appointment => (
            <div className="appointment-card" key={appointment._id}>
              <div className="card-header">
                Appointment with Doctor {getDoctorName(appointment.doctorid)}
              </div>
              <div className="card-body">
                <p>Date: {appointment.Day}</p>
                <p>Time: {appointment.Time}</p>
                <p>Status: {appointment.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default ViewerViewAppointments;
