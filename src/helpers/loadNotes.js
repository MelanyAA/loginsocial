import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase-config";

export const loadNotes = async (uid) => {
  const docRef = await getDocs(collection(db, `${uid}/Journal/Notes`));
  const notes = [];
  docRef.forEach((docs) => {
    notes.push({
      id: docs.id,
      ...docs.data(),
    });
  });
  // console.log(notes, "Cargar Notas");
  return notes;
};
