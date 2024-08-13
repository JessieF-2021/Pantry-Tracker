"use client";

import { Button } from "@mui/material";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function PantryForm({ addPantry }) {
  
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addPantry(e, value);
    setValue("");


  };

  return (
    <div className="flex justify-center items-center min-h-[50vh] bg-blue-100 mb-8 rounded-lg relative">
      <div className="absolute top-0 left-[-1] p-2 my-4">
      </div>
      <form
        onSubmit={handleSubmit}
        // max-w-3xl
        className="max-w-3xl mt-4 bg-transparent py-12 px-16 rounded-lg flex items-center border-2 border-blue-600 space-x-4"
      >
        <input
          type="text"
          placeholder="What's in today's pantry?"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className=" w-full p-2 border border-blue-700 rounded outline-none"
        />
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            "&:hover": {
              boxShadow: "0px 0px 35px #08AEEA, 0px 0px 70px #08AEEA",
            },
          }}
          className="flex items-center justify-center capitalize"
        >
          Add To Pantry
          <IoMdAdd className="ml-2" />
        </Button>
      </form>
    </div>
  );
}
