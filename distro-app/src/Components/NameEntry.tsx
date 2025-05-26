import React, { useState } from 'react';
import '../App.css';
import { SignUps } from './SignUps';
import { ref, set } from 'firebase/database';
import { database } from './Config/FirebaseConfig'; // Adjust the import path as necessary

const handleSubmit = async (
  day: string,
  index: number,
  value: string,
  setSignUps: React.Dispatch<React.SetStateAction<SignUps>>
) => {
  try {
    // Write data to Firebase Realtime Database
    await set(ref(database, `signUps/${day}/${index}`), {
      name: value,
      submitted: true,
    });
  } catch (error) {
    console.error('Error submitting data to Firebase:', error);
    alert('Failed to submit data. Please try again.');
  }

    // Update local state after successful database update
    setSignUps((prev) => {
      const updatedDay = [...prev[day]];
      updatedDay[index] = { ...updatedDay[index], name: value, submitted: true };
      return { ...prev, [day]: updatedDay };
    });
};

const handleRemove = (day: string, index: number, setSignUps: React.Dispatch<React.SetStateAction<SignUps>>) => {
  setSignUps((prev) => {
    const updatedDay = [...prev[day]];
    updatedDay.splice(index, 1);
    return { ...prev, [day]: updatedDay };
  });
};

export const NameEntry = ({
    day,
    originalIndex,
    name,
    submitted,
    setSignUps
  }: {
    day: string;
    originalIndex: number;
    name: string;
    submitted: boolean;
    setSignUps: React.Dispatch<React.SetStateAction<SignUps>>;
  }) => {
    const [inputValue, setInputValue] = useState(name); // Local state for input value

    return (
      <div
        className={`entry`} >
        <div className="entry-inline">
          <input
            type="text"
            placeholder="Enter your name"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={submitted}
          />
          {!submitted ? (
            <button
              className="submit-btn"
              onClick={() => handleSubmit(day, originalIndex, inputValue, setSignUps)} // Pass inputValue to handleSubmit
              >
              ➕
            </button>
          ) : (
            <button
              className="remove-btn"
              onClick={() => handleRemove(day, originalIndex, setSignUps)}
            >
              ❌
            </button>
          )}
        </div>
      </div>
    );
  };