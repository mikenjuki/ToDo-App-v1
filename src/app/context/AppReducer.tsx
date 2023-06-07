import { Note } from "./AppContext";

// App state interface
interface AppState {
  notes: Note[];
  theme: string;
  filter: string;
}

// App action interface
type AppAction =
  | { type: "UPDATE_THEME"; payload: string }
  | { type: "UPDATE_NOTES"; payload: Note[] }
  | { type: "UPDATE_FILTER"; payload: string };

// Setting up the reducer
const AppReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "UPDATE_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    case "UPDATE_NOTES":
      return {
        ...state,
        notes: action.payload,
      };
    case "UPDATE_FILTER":
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
