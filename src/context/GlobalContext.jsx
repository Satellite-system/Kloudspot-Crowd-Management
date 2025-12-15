import { createContext, useContext, useReducer } from "react";

/* ---------------- INITIAL STATE ---------------- */

const initialState = {
  selectedSite: null,
  date: null,
  language: "en",
  apiCache: {}, // optional
};

/* ---------------- REDUCER ---------------- */

function globalReducer(state, action) {
  switch (action.type) {
    case "SET_SITE":
      return { ...state, selectedSite: action.payload };

    case "SET_DATE":
      return { ...state, date: action.payload };

    case "SET_LANGUAGE":
      return { ...state, language: action.payload };

    case "CLEAR_ALL":
      return initialState;

    default:
      return state;
  }
}

/* ---------------- CONTEXT ---------------- */

const GlobalContext = createContext();

/* ---------------- PROVIDER ---------------- */

export const GlobalProvider = ({ children }) => {
  const [stateVal, dispatch] = useReducer(globalReducer, initialState);

  /* ---------- ACTION HELPERS ---------- */

  const setSelectedSite = (site) =>
    dispatch({ type: "SET_SITE", payload: site });

  const setDate = (site) => dispatch({ type: "SET_DATE", payload: site });

  const setLanguage = (lang) =>
    dispatch({ type: "SET_LANGUAGE", payload: lang });

  const clearAll = () => {
    dispatch({ type: "CLEAR_ALL" });
  };

  return (
    <GlobalContext.Provider
      value={{
        stateVal,
        setSelectedSite,
        setDate,
        setLanguage,
        clearAll,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

/* ---------------- HOOK ---------------- */

export const useGlobal = () => useContext(GlobalContext);
