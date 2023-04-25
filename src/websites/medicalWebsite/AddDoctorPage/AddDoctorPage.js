import { useState } from 'react';
import axios from 'axios';

const departments = [
  'Cardiology',
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
  const [doctorId, setDoctorId] = useState()
  const [slots, setSlots] = useState({
   
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  });

  const splitTimeRange = (start, end) => {
    const slots = [];
    let current = new Date(`2022-01-01T${start}:00`);
    const endSlot = new Date(`2022-01-01T${end}:00`);
    while (current < endSlot) {
      const slotStart = current.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      current.setMinutes(current.getMinutes() + 30);
      const slotEnd = current.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      slots.push(`${slotStart}-${slotEnd}`);
    }
    return slots;
  };

  const handleSubmit = () => {
    if (
      !name ||
      !gender ||
      !department ||
      !latestQualification ||
      !description ||
      !experienceInMonths ||
      !address ||
      Object.keys(availability).length === 0 ||
      Object.values(slots).some((value) => value.length === 0)
    ) {
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
      availability,
    };
  
    axios.post('http://localhost:8800/api/doctor/adddoctor', data)
      .then((response) => {
        setDoctorId(response.data._id);
        addSlotsToDatabase(response.data._id);
        alert('Doctor added successfully!');
        setName('');
        setGender('');
        setDepartment('');
        setLatestQualification('');
        setDescription('');
        setExperienceInMonths('');
        setAddress('');
        setAvailability({});
        setSlots({
          monday: [],
          tuesday: [],
          wednesday: [],
          thursday: [],
          friday: [],
        });
      })
      .catch((error) => {
        console.error(error);
        alert('Error adding doctor. Please try again later.');
      });
  };
  
  const addSlotsToDatabase = async (doctorId) => {
    try {
      const days = Object.keys(slots);
      const slotIds = {};
      for (let i = 0; i < days.length; i++) {
        const day = days[i];
        const daySlots = slots[day];
        slotIds[day] = [];
        for (let j = 0; j < daySlots.length; j++) {
          const slot = daySlots[j];
          const [startTime, endTime] = slot.split('-');
          const slotData = {
            day,
            startTime,
            endTime,
          };
          const { data } = await axios.post('http://localhost:8800/api/doctor/addslots', slotData);
          slotIds[day].push(data._id);
        }
      }
      console.log(slotIds);
  
      alert('Slots added successfully!');
  
      console.log(doctorId + 'this is doc id in hook');
      axios
        .put('http://localhost:8800/api/doctor/addslotsidindoctor', { doctorId, slotIds })
        .then((res) => {
          alert('Slots in doctor added!');
        })
        .catch((error) => {
          console.error(error);
          alert('Error adding slots in doctor.');
        });
  
      setSlots({
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
      });
    } catch (error) {
      console.error(error);
      alert('Error adding slots. Please try again later.');
    }
  };
  

  const handleAvailabilityChange = (day, value) => {
    setAvailability((prevAvailability) => ({ ...prevAvailability, [day]: value }));
    setSlots((prevSlots) => ({
      ...prevSlots,
      [day]: value ? splitTimeRange(value.start, value.end) : [],
    }));
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
