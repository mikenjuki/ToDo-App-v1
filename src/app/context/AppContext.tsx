"use client";

import {
  updateDoc,
  doc,
  getDoc,
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";

// AppState interface
export interface AppState {
  theme: string;
  updateTheme: (theme: string) => void;
  notes: Note[];
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
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

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

  // upateTheme action
  const updateTheme = (theme: string) => {
    dispatch({ type: "UPDATE_THEME", payload: theme });
  };

  // context value
  const contextValue: AppState = {
    theme: state.theme,
    updateTheme,
    notes: state.notes,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export { AppContext, AppProvider };
