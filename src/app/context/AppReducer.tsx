interface AppState {
  theme: string;
}

type AppAction = { type: "UPDATE_THEME"; payload: string };

const AppReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "UPDATE_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
