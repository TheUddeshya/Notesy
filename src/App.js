import "./styles.css";
import Split from "react-split";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Editor from "./Editor";
import { nanoid } from "nanoid";

export default function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  );
  const [currentNote, setCurrentNote] = useState(
    (notes[0] && notes[0].id) || null
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNewNote() {
    const newid = nanoid();
    setNotes((prev) => {
      return [{ id: newid, body: "# Untitled Note" }, ...prev];
    });
    setCurrentNote(newid);
  }

  function updateNote(text) {
    // prev.map((note) =>
    //   note.id === currentNote ? { ...note, body: text } : note
    // )
    setNotes((prev) => {
      const newArr = [];
      for (let note of notes) {
        if (note.id === currentNote) {
          newArr.unshift({ ...note, body: text });
        } else {
          newArr.push(note);
        }
      }
      return newArr;
    });
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((oldNote) => oldNote.id !== id));
  }

  function findCurrentNote() {
    return notes.find((note) => note.id === currentNote) || notes[0];
  }

  return (
    <div className="big-container">
      {notes.length ? (
        <Split sizes={[25, 75]} direction="horizontal" className="split">
          <Sidebar
            handleClick={addNewNote}
            handleDivClick={setCurrentNote}
            notes={notes}
            currentNote={findCurrentNote}
            deleteNote={deleteNote}
          />
          <div className="editor">
            <Editor currentNote={findCurrentNote} updateNote={updateNote} />
          </div>
        </Split>
      ) : (
        <div className="home-screen">
          <h1> You have no Notes </h1>
          <button onClick={addNewNote} className="button">
            {" "}
            Create Note{" "}
          </button>
        </div>
      )}
    </div>
  );
}
