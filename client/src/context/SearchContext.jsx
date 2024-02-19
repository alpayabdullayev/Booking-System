import React, { createContext, useReducer } from "react";

const INITIAL_STATE = {
  city: undefined,
  dates: [],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
  selectedRooms: [],
};

export const SearchContext = createContext();

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    case "SELECT_ROOM":
      return {
        ...state,
        selectedRooms: action.payload,
      };
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  const selectRoom = (selectedRooms) => {
    dispatch({ type: "SELECT_ROOM", payload: selectedRooms });
  };

  return (
    <SearchContext.Provider
      value={{
        ...state,
        dispatch,
        selectRoom,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
