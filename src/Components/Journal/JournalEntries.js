import React from "react";
import { JournalEntry } from "./JournalEntry";
import { useSelector } from "react-redux";

export const JournalEntries = () => {
  const { notes } = useSelector((state) => state.notes);
  console.log(notes, "JournalEntry");
  return (
    <div className="journal__entries">
      {notes.map((note) => (
      <JournalEntry key={note.id} {...note} />
      ))
      }
    </div>
  );
};
