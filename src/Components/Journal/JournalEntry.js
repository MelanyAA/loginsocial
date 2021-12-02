import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { activeNote } from "../../actions/notes";

export const JournalEntry = ({ id, date, title, body, url }) => {
  console.log(id, date, title, body, url);
  const noteDate = moment(date);
  console.log(noteDate);
  // Andrea f Guadamuz yoye;o carlos  hernandez dias ali
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.notes);

  console.log(notes, "Estate");
  // (cod)
  const handleEntryClick = () => {
    // const result = notes.filter((r) => {
    //   return r.id === cod;
    // });
    // console.log(cod, result);
    // dispatch(activeNote(cod, result[0]));
    console.log(id, "aca");
    dispatch(
      activeNote(id, {
        date,
        title,
        body,
        url,
      })
    );

    console.log(url, "ursdfghjkljhgbfl");
  };
  return (
    <div className="journal__entry pointer" onClick={handleEntryClick}>
      {url ? (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}
        ></div>
      ) : (
        <div></div>
      )}

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>
      <div className="journal__entry-date-box">
        <span>{noteDate.format("dddd")}</span>
        <span>{noteDate.format("yyyy")}</span>
        <h4>{noteDate.format("Do")}</h4>
      </div>
    </div>
  );
};
