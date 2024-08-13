"use client";

import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";

export default function SearchBtn({ searchItem, setSearchItem }) {
  const handleSearch = (e) => {
    e.preventDefault();
    // You can log or handle the searchItem here if needed
    console.log("Search Item:", searchItem);
    setSearchItem("")
  };

  return (
    <div className="w-full mb-6">
      <form onSubmit={handleSearch} className="flex items-center space-x-2">
        <TextField
          id="search-bar"
          label="Search pantry"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchItem(e.target.value)}
          value={searchItem}
          sx={{
            border: "4px solid blue"

          }}
          className="flex-grow "
        />
        <IconButton
          type="submit"
          sx={{ ml: 1}}
          className="bg-white text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <SearchIcon />
        </IconButton>
      </form>
    </div>
  );
}
