"use client";

import {
  doc,
  deleteDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  writeBatch,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/config";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { createContext, useReducer, useEffect, useState } from "react";
import AppReducer from "./AppReducer";

// AppState interface
export interface AppState {
  theme: string;
  updateTheme: (theme: string) => void;
  notes: Note[];
  filter: string;
  filterNotes: (filter: string) => void;
  filteredNotes: Note[];
  deleteNote: (id: string) => void;
  deleteCheckedNotes: () => void;
}

// Note interface
export interface Note {
  id: string;
  content: string;
  checked: boolean;
  time: firebase.firestore.Timestamp;
  completedAt: firebase.firestore.Timestamp;
}

const AppContext = createContext<AppState | undefined>(undefined);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initial state setup
  const initialState: AppState = {
    theme: "light",
    updateTheme: (theme: string) => {},
    notes: [],
    filter: "all",
    filterNotes: (filter: string) => {},
    filteredNotes: [],
    deleteNote: (id: string) => {},
    deleteCheckedNotes: () => {},
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  // Fetching notes from the database
  useEffect(() => {
    const fetchNotes = async () => {
      // Creating a reference to the notes collection
      const notesRef = collection(db, "notes");
      const notesQuery = query(notesRef, orderBy("time", "desc"));

      // Listening for changes in the database
      const cleanUp = onSnapshot(notesQuery, (snapshot) => {
        const notesData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Note[];

        // Dispatching the notes to the reducer
        dispatch({ type: "UPDATE_NOTES", payload: notesData });
      });

      return () => {
        cleanUp(); // Unsubscribing from the listener when the component is unmounted
      };
    };

    fetchNotes();
  }, []);

  // Filter notes based on the selected filter
  useEffect(() => {
    const filterNotes = () => {
      switch (state.filter) {
        case "all":
          setFilteredNotes(state.notes);
          break;
        case "active":
          setFilteredNotes(state.notes.filter((note: Note) => !note.checked));
          break;
        case "completed":
          setFilteredNotes(state.notes.filter((note: Note) => note.checked));
          break;
        default:
          setFilteredNotes(state.notes);
          break;
      }
    };

    filterNotes();
  }, [state.filter, state.notes]);

  // console.log(filteredNotes, "context line 108");

  // Delete checked notes from the database
  const deleteCheckedNotes = async () => {
    const batch = writeBatch(db);
    const noteItemsQuery = query(
      collection(db, "notes"),
      where("checked", "==", true)
    );
    const noteItemsSnapshot = await getDocs(noteItemsQuery);

    noteItemsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  };

  // Delete note action
  const deleteNote = async (id: string) => {
    const noteRef = doc(db, "notes", id);
    await deleteDoc(noteRef);

    // Updating the notes in the state
    const updatedNotes = state.notes.filter((note: Note) => note.id !== id);
    setFilteredNotes(updatedNotes);
    dispatch({ type: "UPDATE_NOTES", payload: updatedNotes });
  };

  // upateTheme action
  const updateTheme = (theme: string) => {
    dispatch({ type: "UPDATE_THEME", payload: theme });
  };

  // context value
  const contextValue: AppState = {
    theme: state.theme,
    updateTheme,
    notes: state.notes,
    filter: state.filter,
    filterNotes: (filter: string) => {
      dispatch({ type: "UPDATE_FILTER", payload: filter });
    },
    filteredNotes,
    deleteNote,
    deleteCheckedNotes,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
