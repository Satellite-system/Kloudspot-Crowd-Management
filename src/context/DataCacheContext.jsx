import { createContext, useContext, useReducer } from "react";

const DataCacheContext = createContext();

const initialState = {
  cache: {} // key-value store
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_CACHE":
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.key]: action.value
        }
      };

    case "CLEAR_CACHE":
      return initialState;

    default:
      return state;
  }
}

export const DataCacheProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setCache = (key, value) => {
    dispatch({ type: "SET_CACHE", key, value });
  };

  const getCache = (key) => state.cache[key];

  return (
    <DataCacheContext.Provider value={{ getCache, setCache }}>
      {children}
    </DataCacheContext.Provider>
  );
};

export const useDataCache = () => useContext(DataCacheContext);
