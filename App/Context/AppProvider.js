// Exemple: AppProvider.js
import React, { useState, useEffect } from "react";
import API from "../Services/API";
import AppContext from "./AppContext";

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState(null);
  const [shoppingLists, setShoppingLists] = useState(null);
  const [toDoItems, setToDoItems] = useState(null);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const updateEvents = (newEvents) => {
    setEvents(newEvents);
  };

  const updateShoppingLists = (newShoppingLists) => {
    setShoppingLists(newShoppingLists);
  };

  const updateToDoItems = (newToDoItems) => {
    setToDoItems(newToDoItems);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        updateUser,
        events,
        updateEvents,
        shoppingLists,
        updateShoppingLists,
        toDoItems,
        updateToDoItems,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
