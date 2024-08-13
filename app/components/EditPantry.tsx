"use client";

import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";

export default function EditPantry({ task, updatePantry }) {
  const [value, setValue] = useState(task.value); // Initialize with the correct value

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePantry(value, task.id); // Pass the updated value and the task ID
    setValue("");
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <Typography variant='h4' className='text-center mb-6 text-gray-800'>
        Pantry Tracker
      </Typography>
      <form onSubmit={handleSubmit} className='w-full max-w-md p-8 bg-neutral-600 rounded-lg flex flex-col items-center'>
        
        <input 
          type="text" 
          placeholder="Update pantry" 
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className='w-full mb-4 p-2 border border-blue-700 rounded outline-none'
          aria-label="Update pantry"
        />

        <Button variant='contained' type="submit" className='w-full flex items-center justify-center'>
          <IoMdAdd className='mr-2' />
          Update Pantry
        </Button>
        
      </form>
    </div>
  );
}
