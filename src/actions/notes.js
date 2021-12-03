//El segundo argumento es para obtener el state
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import Swal from "sweetalert2";
import { fileUpload } from "../helpers/fileUpload";
//******react-journal nombre del Proyecto de Cloudinary*****
export const startNewNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
  

    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    // Add a new document with a generated id.
    const docRef = await addDoc(
      collection(db, `${uid}/Journal/Notes`),
      newNote
    );
  
    //Disparamos la accion  donde le mandamos el id y notes en este caso id biene de docRef.id y notas es el newNote
    dispatch(activeNote(docRef.id, newNote));
    dispatch(addNewNote(doc.id, newNote));
  };
};

//Activar la nota luego de agregar a la BD
export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note,
  },
});

export const addNewNote = (id, note) => ({
  type: types.notesAddNew,
  payload: {
    id,
    ...note,
  },
});

export const StartLoadingNote = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

//Accion notes
console.log("Accion de Notes");
export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes,
});

//Accion para acualizar en firebase
export const startSaveNotes = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!note.url) {
      delete note.url;
    }
    if( note.title ==='' || note.body===''){
      let error ='';
      if(note.title === ''){
        error='title';
      Swal.fire('inf','llene el titulo','info')
    }
    if(note.body ===''){
      Swal.fire('inf','Escribe lo que paso Hoy','info')
      error=`${error} body`;
    }
    return false;
    }
   else{
    
    //****elimino el id del objeto note porque en firebase no necesito insertar el id de la nota ***
    const noteToFirestore = { ...note };
    delete noteToFirestore.id;
   // console.log("Actualizar");
    //Actualizar la note
    const update = doc(db, `${uid}/Journal/Notes/${note.id}`);

    await updateDoc(update, noteToFirestore);
    dispatch(refresNotes(note.id, noteToFirestore));
    Swal.fire("Saved", noteToFirestore.title, "success");
  };
};
  }


//Refresca los cambios la pag principal hacia al panel lateral de notas 
const refresNotes = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id,
    note: {
      id,
      ...note,
    },
  },
});
//Funcion para subir el Archivo
export const startUploading = (file) => {
  return async (dispatch, getState) => {
    const { active: activeNote } = getState().notes;

    let timerInterval;
    Swal.fire({
      title: "Cargando",
      text: "Por favor Espere",
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });

    const fileUrl = await fileUpload(file);
    activeNote.url = fileUrl;
    dispatch(startSaveNotes(activeNote));
    console.log(fileUrl);
    Swal.close();
  };
};
//Borrar la nota de la BD
export const startDeleting = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid;
    await deleteDoc(doc(db, `${uid}/Journal/Notes/${id}`));
    dispatch(deleteNoteStore(id));
  };
};
//Borrar la nota del store
export const deleteNoteStore = (id) => ({
  type: types.notesDelete,
  payload: id,
});

export const noteLogout = () => ({
  type: types.notesLogoutCleaning,
});
