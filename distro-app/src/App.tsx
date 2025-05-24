import React, { useState } from 'react';
import './App.css';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const DraggableEntry = ({
  day,
  originalIndex,
  name,
  submitted,
  handleNameChange,
  handleSubmit,
  handleRemove,
  handleDrop,
}: {
  day: string;
  originalIndex: number;
  name: string;
  submitted: boolean;
  handleNameChange: (day: string, index: number, value: string) => void;
  handleSubmit: (day: string, index: number) => void;
  handleRemove: (day: string, index: number) => void;
  handleDrop: (fromDay: string, toDay: string, index: number) => void;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ENTRY',
    item: { fromDay: day, originalIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'ENTRY',
    drop: (item: { fromDay: string; originalIndex: number }) => {
      handleDrop(item.fromDay, day, item.originalIndex);
    },
  }));

  return (
    <div
      className={`entry ${isDragging ? 'dragging' : ''}`}
      ref={(node) => {
        if (node) {
          drag(drop(node)); // Combine drag and drop refs
        }
      }}      >
      <div className="entry-inline">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => handleNameChange(day, originalIndex, e.target.value)}
          disabled={submitted}
        />
        {!submitted ? (
          <button
            className="submit-btn"
            onClick={() => handleSubmit(day, originalIndex)}
          >
            ➕
          </button>
        ) : (
          <button
            className="remove-btn"
            onClick={() => handleRemove(day, originalIndex)}
          >
            ❌
          </button>
        )}
      </div>
    </div>
  );
};

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

  const handleDrop = (fromDay: string, toDay: string, index: number) => {
    setSignUps((prev) => {
      const fromEntries = [...prev[fromDay]];
      const toEntries = [...prev[toDay]];
      const [movedEntry] = fromEntries.splice(index, 1);
      toEntries.push(movedEntry);
      return { ...prev, [fromDay]: fromEntries, [toDay]: toEntries };
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
                    <DraggableEntry
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
                      handleDrop={handleDrop}
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
    </DndProvider>
  );
}