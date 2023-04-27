import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AdminViewAppointments = () => {
    const TEMPLATEID = '64466439e08c4f5f864bceac'

    const [appointmentData, setAppointmentData] = useState([]);

    useEffect(() => {
      const fetchAppointments = async () => {
        try {
          const response = await axios.post('http://localhost:8800/api/doctor/getappointmentstoadmin', {
            TEMPLATEID
          });
          setAppointmentData(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchAppointments();
    }, []);

    const handleCompleted = async (appointmentid) => {
      try {
        const response = await axios.put('http://localhost:8800/api/doctor/doctorcompletesappointment',{appointmentid});
        const updatedAppointment = response.data;
        const updatedAppointments = appointmentData.map((appointment) => {
          if (appointment._id === updatedAppointment._id) {
            return updatedAppointment;
          } else {
            return appointment;
          }
        });
        setAppointmentData(updatedAppointments);
      } catch (error) {
        console.error(error);
      }
    }

    return(
        <div>
          <h2>Appointments</h2>
          <ul>
            {appointmentData.map((appointment, index) => (
              <li key={index}>
                <p> id: {appointment._id}</p>
                <p> Doctor: {appointment.DoctorName}</p>
                <p> Doctor Department: {appointment.Department}</p>
                <p> Patient: {appointment.PatientName}</p>
                <p> Patient Contact: {appointment.ContactInfo}</p>
                <p>Day: {appointment.Day}</p>
                <p>Time: {appointment.Time}</p>
                <button onClick={()=>handleCompleted(appointment._id)}> Completed </button>
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
export default AdminViewAppointments;
