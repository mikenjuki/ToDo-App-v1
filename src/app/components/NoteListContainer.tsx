"use client";

import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

interface Note {
  id: string;
  data: DocumentData;
}

const NoteListContainer = () => {
  const [notesData, setNotesData] = useState<Note[]>([]);

  useEffect(() => {
    const cleanUp = onSnapshot(
      query(collection(db, "notes"), orderBy("time", "desc")),
      (snapshot) => {
        const notesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })) as Note[];
        setNotesData(notesData);
        console.log(notesData);
      }
    );

    return () => {
      cleanUp(); // Unsubscribing from the listener when the component is unmounted
    };
  }, []);

  return (
    <div>
      {notesData.map(({ id, data }) => {
        const { content, checked } = data;

        return (
          <div key={id}>
            <p>{content}</p>
            {checked && <p>Checked</p>}
          </div>
        );
      })}
    </div>
  );
};

export default NoteListContainer;
