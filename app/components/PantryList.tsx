"use client"

import React, { useEffect, useState } from "react";
import PantryForm from "./PantryForm";
import EditPantry from "./EditPantry";
import Pantry from "./Pantry";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { TextField, InputAdornment, Container, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function PantryList() {
  const [pantries, setPantries] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const addPantry = async (e, value) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "pantry"), { value: value });
      console.log("Document written with ID: ", docRef.id);
      setPantries([...pantries, { id: docRef.id, value: value, isEditing: false }]);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "pantry"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let pantryArr = [];
      querySnapshot.forEach((doc) => {
        pantryArr.push({ ...doc.data(), id: doc.id });
      });
      setPantries(pantryArr);
    });
    return () => unsubscribe();
  }, []);

  const deletePantry = async (id) => {
    await deleteDoc(doc(db, "pantry", id));
    setPantries(pantries.filter((pantry) => pantry.id !== id));
  };

  const updatePantry = (id) => {
    setPantries(
      pantries.map((pantry) =>
        pantry.id === id ? { ...pantry, isEditing: !pantry.isEditing } : pantry
      )
    );
  };

  const editTask = async (task, id) => {
    try {
      const pantryRef = doc(db, "pantry", id);
      await updateDoc(pantryRef, { value: task });
      setPantries(
        pantries.map((pantry) =>
          pantry.id === id ? { ...pantry, value: task, isEditing: false } : pantry
        )
      );
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const filteredPantries = pantries.filter((pantry) =>
    pantry.value.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <Container maxWidth="sm" className="px-4 sm:px-6 md:px-8 my-8">
      <Paper elevation={3} className="p-6 bg-transparent mx-auto hover:cursor-pointer shadow-lg">
        <TextField
          fullWidth
          placeholder="Search Pantry"
          variant="outlined"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          className="mb-6"
        />
        <PantryForm addPantry={addPantry} />
        {filteredPantries.map((pantry) =>
          pantry.isEditing ? (
            <EditPantry key={pantry.id} task={pantry} updatePantry={editTask} />
          ) : (
            <Pantry
              key={pantry.id}
              task={pantry}
              deletePantry={deletePantry}
              updatePantry={updatePantry}
            />
          )
        )}
      </Paper>
    </Container>
  );
}
