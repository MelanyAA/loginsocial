import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StartLogout } from "../../actions/auth";
import { startNewNote } from "../../actions/notes";
import { JournalEntries } from "./JournalEntries";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const handleLogged = () => {
    console.log("click");
    dispatch(StartLogout());
  };

  const handleAddNew = () => {
    dispatch(startNewNote());
  };

  const { name } = useSelector((state) => state.auth);
  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span> {name}</span>
        </h3>
        <div>
          <button className="btn mt-3" onClick={handleLogged}>
            Cerrar
          </button>
        </div>
      </div>
      <div className="journal__new-entry" onClick={handleAddNew}>
        <i className="fas fa-calendar-week fa-5x"> </i>
        <p className="mt-3">New entry</p>
      </div>
      <JournalEntries />
    </aside>
  );
};
