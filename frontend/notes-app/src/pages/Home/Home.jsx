import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NoteCard from "../../components/cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import Modal from "react-modal";

const Home = () => {

  const [showAddEditModal, setShowAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
        <NoteCard
          title="Note 1"
          date="2025-06-18"
          content="This is a note"
          tags="#Meeting"
          isPinned={true}
          onEdit={() => {}}
          onDelete={() => {}}
          onPinNote={() => {}}
        />
        </div>  
      </div>
      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-500 hover:bg-blue-600 absolute bottom-10 right-10" onClick={() => {}}>
        <MdAdd className="text-[28px] text-white" />
      </button>

      <Modal
      isOpen={showAddEditModal.isShown}
      onRequestClose={() => {}}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
      contentLabel="Add/Edit Note Modal"
      className="w-full max-w-2xl"
      >
        <AddEditNotes />
      </Modal>
    </>
  );
};

export default Home;
