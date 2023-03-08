

import "./App.css";
import Main from "./Main";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified: Date.now(),
    };
    setNotes([newNote, ...notes]);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesArray);
  };

  const onDeleteNote = (idToDelete) => {
    if(window.confirm('Are you sure you want to delete this note?') === true){
      setNotes(notes.filter((note) => note.id !== idToDelete));
    };
    
  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">LOTION</h1>
        <button className="menubutton" onClick={handleSidebarToggle}>&#9776;</button>
        <p className="desc">Like Notion,but worse.</p>
        
      </div>
      {showSidebar && (
        <Sidebar
          notes={notes}
          onAddNote={onAddNote}
          onDeleteNote={onDeleteNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
      )}
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;

