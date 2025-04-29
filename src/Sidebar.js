import React from "react";

export default function Sidebar(props) {
  const renderNotes = props.notes.map((note) => (
    <div
      key={note.id}
      onClick={() => props.handleDivClick(note.id)}
      className={`sidebar--note ${
        props.currentNote().id === note.id ? "currentNote" : ""
      }`}
    >
      <div className="note-summary">{note.body.split("\n")[0]}</div>
      <button
        className={`${
          props.currentNote().id === note.id ? "current" : ""
        } button trash-icon`}
        onClick={(event) => {
          event.stopPropagation();
          props.deleteNote(note.id);
        }}
      >
        <i className="fa-regular fa-trash-can"></i>
      </button>
    </div>
  ));

  return (
    <section className="sidebar">
      <div className="sidebar--header">
        <h1>
          <span className="fa-solid fa-inbox"></span> Notes
        </h1>
        <button className="button" onClick={props.handleClick}>
          +
        </button>
      </div>
      {renderNotes}
    </section>
  );
}
