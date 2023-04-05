import { useState } from 'react';
import axios from 'axios';
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
  
const AddDoctorPage = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [department, setDepartment] = useState('');
  const [latestQualification, setLatestQualification] = useState('');
  const [description, setDescription] = useState('');
  const [experienceInMonths, setExperienceInMonths] = useState('');
  const [address, setAddress] = useState('');
  const [availability, setAvailability] = useState({});


  const handleSubmit = () => {
    console.log(name+" "+gender+" "+department+" "+latestQualification+" "+ description+" "+experienceInMonths+" "+ address)
    if (!name || !gender || !department || !latestQualification || !description || !experienceInMonths || !address || Object.keys(availability).length === 0) {
      alert('Please fill all fields including availability.');
      return;
    }

    const data = {
      name,
      gender,
      department,
      latestQualification,
      description,
      experienceInMonths,
      address,
      availability
    };

    axios.post("http://localhost:8800/api/doctor/adddoctor", data)
      .then(response => {
        console.log(response.data._id);
        alert('Doctor added successfully!');
        setName('');
        setGender('');
        setDepartment('');
        setLatestQualification('');
        setDescription('');
        setExperienceInMonths('');
        setAddress('');
        setAvailability({});
      })
      .catch(error => {
        console.error(error);
        alert('Error adding doctor. Please try again later.');
      });
  };

  const handleAvailabilityChange = (day, value) => {
    setAvailability((prevAvailability) => ({ ...prevAvailability, [day]: value }));
    console.log(JSON.stringify(availability))
  };

  return (
    <div>
      <input placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
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
      <input
        placeholder="latest qualification"
        value={latestQualification}
        onChange={(e) => setLatestQualification(e.target.value)}
      />
      <input
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={experienceInMonths}
        onChange={(e) => setExperienceInMonths(e.target.value)}
      >
        <option value="">Select Experience (Years)</option>
        {Array.from({ length: 20     }, (_, i) => i + 1).map((month) => (
          <option key={month} value={month}>
            {month} Years
          </option>
        ))}
      </select>
      <input placeholder="address" value={address} onChange={(e) => setAddress(e.target.value)} />
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
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddDoctorPage;
