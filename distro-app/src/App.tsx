import React, { useState } from 'react';
import './App.css';
import { NameEntry } from './Components/NameEntry';

export default function App() {
  const days = ['Monday', 'Tuesday', 'Wednesday']; // Example days
  const roles = [
    { name: 'Driver', emoji: '🚗' }, // New role
    { name: 'Copilot', emoji: '🛩️' }, // New role
    { name: 'Distro Volunteer', emoji: '📦' }, // New role
  ];  type SignUps = {
    [key in typeof days[number]]: { name: string; role: string; submitted: boolean }[];
  };
  const [signUps, setSignUps] = React.useState<SignUps>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
  });


  const handleNameChange = (day: string, index: number, value: string) => {
    setSignUps((prev) => {
      const updatedDay = [...prev[day]];
      updatedDay[index] = { ...updatedDay[index], name: value }; // Update the name field
      return { ...prev, [day]: updatedDay };
    });
  };

  const handleSubmit = (day: string, index: number) => {
    setSignUps((prev) => {
      const updatedDay = [...prev[day]];
      updatedDay[index].submitted = true;
      return { ...prev, [day]: updatedDay };
    });
  };

  const handleRemove = (day: string, index: number) => {
    setSignUps((prev) => {
      const updatedDay = [...prev[day]];
      updatedDay.splice(index, 1);
      return { ...prev, [day]: updatedDay };
    });
  };

  return (
      <div className="App">
      <div className="days-container">
        {days.map((day) => (
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
                      handleNameChange={
                        handleNameChange
                      } // Pass correct handler
                      handleSubmit={handleSubmit}
                      handleRemove={handleRemove}
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