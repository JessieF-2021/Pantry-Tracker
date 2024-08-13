"use client";

import React, { useEffect, useState } from "react";
import PantryForm from "./PantryForm";
import EditPantry from "./EditPantry";
import Pantry from "./Pantry";
import SearchBtn from "./SearchBtn";

import {
  collection,
  addDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc, // Import updateDoc to handle updates
} from "firebase/firestore";
import { db } from "../../firebase";

export default function PantryList() {
  const [pantries, setPantries] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  // Add data to the db
  const addPantry = async (e, value) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "pantry"), {
        value: value,
      });
      console.log("Document written with ID: ", docRef.id);

      setPantries([
        ...pantries,
        { id: docRef.id, value: value, isEditing: false },
      ]);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Read data from the db
  useEffect(() => {
    const q = query(collection(db, "pantry"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let pantryArr = [];

      querySnapshot.forEach((doc) => {
        pantryArr.push({ ...doc.data(), id: doc.id });
      });

      setPantries(pantryArr);
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  // Delete from the db
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
      // Update the document in Firestore
      const pantryRef = doc(db, "pantry", id);
      await updateDoc(pantryRef, { value: task });

      // Update the local state
      setPantries(
        pantries.map((pantry) =>
          pantry.id === id ? { ...pantry, value: task, isEditing: false } : pantry
        )
      );
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // Corrected filtering logic
  const filteredPantries = pantries.filter((pantry) =>
    pantry.value.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className="p-4">
      <SearchBtn searchItem={searchItem} setSearchItem={setSearchItem} />
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
    </div>
  );
}
