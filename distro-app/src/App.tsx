import React, { useState } from 'react';
import './App.css';
import { NameEntry } from './Components/NameEntry';
import { SignUps, SupportedDays } from './Components/SignUps';

export default function App() {
  const roles = [
    { name: 'Driver', emoji: '🚗' }, // New role
    { name: 'Copilot', emoji: '🛩️' }, // New role
    { name: 'Distro Volunteer', emoji: '📦' }, // New role
  ];  

  const [signUps, setSignUps] = React.useState<SignUps>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
  });

  const handleReadState = () => {
    console.log(signUps); // Log the state to the console
    alert(JSON.stringify(signUps, null, 2)); // Display the state in an alert
  };

  return (
      <div className="App">
              <button onClick={handleReadState}>ReadState</button>
      <div className="days-container">
        {SupportedDays.map((day) => (
          <div key={day} className="day-section">
            <h2>{day}</h2>
            {roles.map((role) => (
              <div key={role.name} className="role-section">
                <h3>
                  {role.emoji} {role.name}
                </h3>
                {signUps[day]
                  .map((entry, originalIndex) => ({ ...entry, originalIndex }))
                  .filter((entry) => entry.role === role.name)
                  .map(({ originalIndex, name, submitted }, index) => (
                    <NameEntry
                      key={originalIndex} // Use a stable key
                      day={day}
                      originalIndex={originalIndex}
                      name={name}
                      submitted={submitted}
                      setSignUps={setSignUps}
                    />
                  ))}
                {/* Add a + button to create a new entry */}
                <button
                  onClick={() => {
                    setSignUps((prev) => {
                      const updatedDay = [...prev[day]];
                      updatedDay.push({ name: '', role: role.name, submitted: false });
                      return { ...prev, [day]: updatedDay };
                    });
                  }}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        ))}
        </div>
      </div>
  );
}