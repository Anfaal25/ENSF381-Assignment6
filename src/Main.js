

import React, { useEffect, useRef, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Main({ activeNote, onUpdateNote, onDeleteNote }) {
  const [text, setText] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [showEditor, setShowEditor] = useState(true);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setText(activeNote ? activeNote.body : '');
    setPreviewText(activeNote ? activeNote.body : '');
    setShowEditor(true);
  }, [activeNote]);

  const onEditField = (key, value) => {
    onUpdateNote({
      ...activeNote,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  const handleChange = (value) => {
    setText(value);
    setPreviewText(value);
    onEditField('body', value);
  };

  const handleSaveClick = () => {
    setShowEditor(false);
  };

  

  if (!activeNote) {
    return (
      <div className="no-active-note">
        No note created.
      </div>
    )
  }

  return (
    <div className="app-main">
      {showEditor ? (
        <div className="app-main-note-edit">
          <input
            type="text"
            id="title"
            value={activeNote.title}
            onChange={(e) => onEditField("title", e.target.value)}
            autoFocus />
          <ReactQuill
            ref={editorRef}
            value={text}
            onChange={handleChange}
          />
          <button className = "Save" onClick={handleSaveClick}>Save</button>
          
        </div>
      ) : (
        <div className="app-main-note-preview">
          <h1 className="preview-title">{activeNote.title}</h1>
          <p className="preview-text" dangerouslySetInnerHTML={{ __html: previewText }}></p>
          <button  className = "Edit" onClick={() => setShowEditor(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default Main;
