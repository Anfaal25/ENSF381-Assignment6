

function Sidebar({notes, onAddNote, onDeleteNote, activeNote, setActiveNote,onHideBar}) {
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
    
    function createMarkup(text) {
      return {__html: text};
    }
  
    return (
      <div className="app-sidebar">
        
        <div className="app-sidebar-header">
          <h1>Notes</h1>
          <button className= "Add" onClick={onAddNote}>Add</button>
          
        </div>
        <div className="app-sidebar-notes">
          {sortedNotes.map((note) => (
            <div
              className={`app-sidebar-note ${note.id === activeNote && "active"}`}
              onClick={() => setActiveNote(note.id)}
              key={note.id}
            >
              <div className="sidebar-note-title">
                <strong>{note.title}</strong>
                <button onClick={() => onDeleteNote(note.id)}>Delete</button>
              </div>
              <p dangerouslySetInnerHTML={createMarkup(note.body && note.body.substr(3, 20) + "...")} />
              <small className="note-meta">
                Last modified {new Date(note.lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit"
              })}
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Sidebar;
  
