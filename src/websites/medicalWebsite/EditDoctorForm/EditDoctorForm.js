import React, { useState } from 'react';
import axios from 'axios';
import { identity } from 'lodash';

const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    dialogContainer: {
      backgroundColor: '#fff',
      borderRadius: '2px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.3)',
      width: '400px',
      maxWidth: '90%',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    },
    title: {
      fontSize: '22px',
      fontWeight: '500',
      marginBottom: '20px'
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    },
    input: {
      height: '40px',
      padding: '10px',
      borderRadius: '2px',
      border: '1px solid #ddd',
      marginBottom: '20px',
      fontSize: '16px'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '20px'
    },
    submitButton: {
  
      backgroundColor: '#3f51b5',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '2px',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer'
    },
    closeButton: {
      backgroundColor: '#ddd',
      color: '#000',
      padding: '10px 20px',
      borderRadius: '2px',
      border: 'none',
      fontSize: '16px',
      cursor: 'pointer',
      marginLeft: '10px'
    }
  };


const EditDoctorForm = ({setOpen, doctor}) => {

    const departments = [
        'Cardiology',
        'Neurology',
        'Dermatology',
        'Orthopedics',
        'Gastroenterology',
        'Ophthalmology',
        'Endocrinology',
        'Psychiatry',
        'Oncology',
        'Rheumatology',
        'Nephrology',
        'Urology',
        'Pulmonology',
        'Allergy and Immunology',
        'Infectious Disease',
        'Hematology',
        'Physical Medicine and Rehabilitation',
        'Pediatrics',
        'Geriatrics',
        'Emergency Medicine',
      ];


    const [id, setId] = useState(doctor._id)
      const [name, setName] = useState(doctor.name)
    const [gender, setGender] = useState(doctor.gender);
    const [department, setDepartment] = useState(doctor.department  );
    const [availability, setAvailability] = useState(doctor.availability);
    const [address, setAddress] = useState(doctor.address);
    const [description, setDescription] = useState(doctor.description);


    const handleAvailabilityChange = (day, value) => {
        setAvailability((prevAvailability) => ({ ...prevAvailability, [day]: value }));
        console.log(JSON.stringify(availability))
      };
    
    const handleNameChange=(e)=>{   
        e.preventDefault();
        setName(e.target.value)

    }
    const handleGenderChange=(e)=>{   
        e.preventDefault();
        setGender(e.target.value)

    }
    const handleAddressChange=(e)=>{   

        e.preventDefault();
        setAddress(e.target.value)

    }

    const generateTimeOptions = () => {
        const options = [];
        for (let i = 0; i < 24; i++) {
          for (let j = 0; j < 60; j++) {
            const hour = i % 12 || 12;
            const minute = j < 10 ? `0${j}` : j;
            const amPm = i < 12 ? 'AM' : 'PM';
            options.push(`${hour}:${minute} ${amPm}`);
          }
        }
        return options;
      };
      
    const handleDepartmentChange=(e)=>{

        e.preventDefault();
        setDepartment(e.target.value)


    }
    const handleDescriptionChange=(e)=>{

        e.preventDefault();
        setDescription(e.target.value)


    }


 
  const handleSubmit =async(event)  => {
    event.preventDefault();

    const updatedDoctor = {
        name,
        gender,
        department,
        availability,
        address
      };

      try {
        const response = await axios.put(`http://localhost:8800/api/doctor/editdoctor/${id}`, updatedDoctor);
        console.log(response.data);
        setOpen(false);
      } catch (error) {
        console.log(error);
      }

    
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.dialogContainer}>
        <form onSubmit={handleSubmit} style={styles.formContainer}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}

          
            onChange={handleNameChange}
            style={styles.input}
          />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="custom">Custom</option>
      </select>
      <select value={department} onChange={(e) => setDepartment(e.target.value)}>
        <option value="">Select Department</option>
        {departments.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>
      <textarea
            name="description"
            placeholder="Description"

            onChange={handleDescriptionChange}
            style={{ ...styles.input, height: '100px' }}
          />
                    <textarea
            name="address"
            placeholder="Address"
            value={address}

            onChange={handleAddressChange}
            style={{ ...styles.input, height: '100px' }}
          />

<div>
                {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
          <div key={day}>
            {day.charAt(0).toUpperCase() + day.slice(1)}:{' '}
            <input
              type="time"
              value={availability[day] ? availability[day].start : ''}
              onChange={(e) =>
                handleAvailabilityChange(day, {
                  ...(availability[day] || {}),
                  start: e.target.value,
                })
              }
            />{' '}
            -{' '}
            <input
              type="time"
              value={availability[day] ? availability[day].end : ''}
              onChange={(e) =>
                handleAvailabilityChange(day, {
                  ...(availability[day] || {}),
                  end: e.target.value,
                })
              }
            />
          </div>
        ))}
    </div>


          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button type="button" style={{ ...styles.button, marginRight: '10px' }} onClick={handleClose}>
              Close
            </button>
            <button type="submit" style={styles.button}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default EditDoctorForm;
