import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ViewerSignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8800/api/patient/addpatient', {
        name,
        email,
        age,
        gender,
        contact_info: contactInfo,
        password
      });
      console.log(response.data);
      if (response.status === 201) {
        navigate('/patientloginpage');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Age:
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      </label>
      <br />
      <label>
        Gender:
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value=""></option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </label>
      <br />
      <label>
        Contact Info:
        <textarea value={contactInfo} onChange={(e) => setContactInfo(e.target.value)}></textarea>
      </label>
      <br />
      <label>
        Password:
        <textarea value={password} onChange={(e) => setPassword(e.target.value)}></textarea>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ViewerSignupPage;
