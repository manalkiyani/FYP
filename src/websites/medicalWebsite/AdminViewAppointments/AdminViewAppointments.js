import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const AdminViewAppointments = () => {
/////////?*******************


    const TEMPLATEID = '64466439e08c4f5f864bceac'


    /////////?*******************

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
  

    return(
        <div>
          <h2>Appointments</h2>
          <ul>
            {appointmentData.map((appointment, index) => (
              <li key={index}>
                <p>Day: {appointment.Day}</p>
                <p>Time: {appointment.Time}</p>
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
    export default AdminViewAppointments;