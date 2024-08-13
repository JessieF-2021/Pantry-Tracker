import {
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import EditTodo from "../../public/assets/img2.jpg";
import Image from "next/image";
import React, { useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import DeleteTodo from "../../public/assets/img1.jpg";

export default function Pantry({ task, deletePantry, updatePantry }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editValue, setEditValue] = useState(task.value);

  const handleEditOpen = () => setOpenEdit(true);
  const handleEditClose = () => setOpenEdit(false);

  const handleDeleteOpen = () => setOpenDelete(true);
  const handleDeleteClose = () => setOpenDelete(false);

  const handleEditSubmit = () => {
    updatePantry(editValue, task.id);
    handleEditClose();
  };

  const handleDeleteConfirm = () => {
    deletePantry(task.id);
    handleDeleteClose();
  };

  return (
    <div
      className="p-4 bg-white shadow-lg rounded-lg mb-4 flex justify-between items-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:bg-gray-100"
    >
      <Typography
        variant="h5"
        className="text-gray-800 hover:text-violet-500"
      >
        {task.value}
      </Typography>
      <div className="flex space-x-4">
        <MdOutlineEditNote
          onClick={handleEditOpen}
          size={25}
          className="text-blue-500 cursor-pointer hover:text-blue-700"
          aria-label="Edit task"
        />
        <RiDeleteBin5Fill
          onClick={handleDeleteOpen}
          size={25}
          className="text-red-500 cursor-pointer hover:text-red-700"
          aria-label="Delete task"
        />
      </div>

      {/* Edit Modal */}
      <Dialog open={openEdit} onClose={handleEditClose} className="text-center">
        <DialogTitle className="text-center mx-auto w-96">
          <Image
            src={EditTodo}
            alt="edit svg"
            width={200}
            height={200}
            className="py-4 mx-auto text-center"
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Edit Pantry Item</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Pantry Item"
            type="text"
            fullWidth
            variant="standard"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
        </DialogContent>
        <DialogActions className="flex justify-between text-center items-center">
          <Button
            onClick={handleEditClose}
            color="primary"
            className="hover:text-red-600 hover:font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditSubmit}
            color="primary"
            className="hover:text-green-500 hover:font-bold"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={openDelete}
        onClose={handleDeleteClose}
        className="text-center"
      >
        <DialogTitle className="text-center mx-auto">
          <Image
            src={DeleteTodo}
            alt="edit svg"
            width={200}
            height={200}
            className="py-4 mx-auto text-center"
          />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete this item from the pantry?
          </DialogContentText>
        </DialogContent>
        <DialogActions className="flex justify-between text-center items-center">
          <Button
            onClick={handleDeleteClose}
            className="hover:text-blue-600 hover:font-bold"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="secondary"
            className="hover:text-red-600 hover:font-bold"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
