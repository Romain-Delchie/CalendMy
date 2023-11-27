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
  // API.getCalendmy()
  //   .then((res) => {
  //     updateUser({
  //       ...user,
  //       calendmyName: res.data.data[0].attributes.name,
  //     });
  //     updateEvents(
  //       res.data.data[0].attributes.events.data.map((event) => {
  //         return {
  //           date: event.attributes.date,
  //           name: event.attributes.name,
  //           begin: event.attributes.begin,
  //           end: event.attributes.end,
  //           instruction: event.attributes.instruction,
  //         };
  //       })
  //     );
  //     updateShoppingLists(
  //       res.data.data[0].attributes.shopping_lists.data.map((list) => {
  //         return {
  //           name: list.attributes.name,
  //           listItems: list.attributes.list_items.data.map((item) => {
  //             return {
  //               name: item.attributes.name,
  //               quantity: item.attributes.quantity,
  //             };
  //           }),
  //         };
  //       })
  //     );
  //     updateToDoItems(
  //       res.data.data[0].attributes.to_do.data.attributes.todo_items.data.map(
  //         (item) => {
  //           return {
  //             name: item.attributes.name,
  //             ranking: item.attributes.ranking,
  //           };
  //         }
  //       )
  //     );
  //   })
  //   .catch((err) => console.log(err));

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
