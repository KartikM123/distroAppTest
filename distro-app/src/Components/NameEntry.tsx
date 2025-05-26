import React, { useState } from 'react';
import '../App.css';

export const NameEntry = ({
    day,
    originalIndex,
    name,
    submitted,
    handleNameChange,
    handleSubmit,
    handleRemove,
  }: {
    day: string;
    originalIndex: number;
    name: string;
    submitted: boolean;
    handleNameChange: (day: string, index: number, value: string) => void;
    handleSubmit: (day: string, index: number) => void;
    handleRemove: (day: string, index: number) => void;
  }) => {
    return (
      <div
        className={`entry`} >
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