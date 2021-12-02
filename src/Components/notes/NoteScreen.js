import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { activeNote, startDeleting } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  const dispatch = useDispatch();
  //Renombramos el active a note y se las  pasamos al useForm
  const { active: note } = useSelector((state) => state.notes);
  const [ValuesForm, handleInputChange, reset] = useForm(note);
  console.log(ValuesForm, "Value de Form");
  const { body, title, id} = ValuesForm;

  const activeId = useRef(note.id);
  //creamos un efecto para que el form cambie cuando disparemos otra nota y para
  //que no entre en un estado infinito definimos una variable

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);
  //----Este use efec es para cuando las propiedades de form cambien escriba en body y title
  useEffect(() => {
    // console.log(ValuesForm, "Value");
    //con dispacht actualizo la nota activa
    dispatch(activeNote(ValuesForm.id, { ...ValuesForm }));
  }, [ValuesForm, dispatch]);

  const handleDelete=()=>{
    //Refrerencia id de la destructuracion ValuesForm 
    dispatch(startDeleting(id))
  }
  return (
    <div className="notes__main-content">
      <NotesAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Escribe un titlo"
          className="notes__title-input"
          value={title}
          onChange={handleInputChange}
          name="title"
        />
        <textarea
          placeholder="Escribe que paso hoy"
          className="notes__textarea mt-3"
          value={body}
          onChange={handleInputChange}
          name="body"
        ></textarea>
        {note.url && (
          <div className="notes__image mt-5">
            <img src={note.url} alt="imagen" />
          </div>
        )}
      </div>
      <div className="div-Delete">
        <button className="btn btn-danger" onClick={handleDelete}>Borrar</button>
      </div>
    </div>
  );
};
