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
    <div className="w-full max-w-md">
      <form onSubmit={handleSearch} className="flex items-center">
        <TextField
          id="search-bar"
          label="Search pantry"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearchItem(e.target.value)}
          value={searchItem}
        />
        <IconButton
          type="submit"
          sx={{ ml: 2 }}
          className="bg-blue-500 text-white"
        >
          <SearchIcon />
        </IconButton>
      </form>
    </div>
  );
}
