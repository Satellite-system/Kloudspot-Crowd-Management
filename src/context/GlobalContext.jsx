import { createContext, useContext, useReducer } from "react";

/* ---------------- INITIAL STATE ---------------- */

const initialState = {
  selectedSite: null,
  language: "en",
  apiCache: {} // optional
};

/* ---------------- REDUCER ---------------- */

function globalReducer(state, action) {
  switch (action.type) {

    case "SET_SITE":
      return { ...state, selectedSite: action.payload };

    case "SET_LANGUAGE":
      return { ...state, language: action.payload };

    case "SET_API_CACHE":
      return {
        ...state,
        apiCache: {
          ...state.apiCache,
          [action.key]: action.value
        }
      };

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

  const setLanguage = (lang) =>
    dispatch({ type: "SET_LANGUAGE", payload: lang });

  const setApiCache = (key, value) =>
    dispatch({ type: "SET_API_CACHE", key, value });

  const logout = () => {
    localStorage.clear();
    dispatch({ type: "CLEAR_ALL" });
  };

  return (
    <GlobalContext.Provider
      value={{
        stateVal,
        setSelectedSite,
        setLanguage,
        setApiCache,
        logout
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

/* ---------------- HOOK ---------------- */

export const useGlobal = () => useContext(GlobalContext);
