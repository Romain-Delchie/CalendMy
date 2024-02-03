import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext } from "react";
import AppContext from "../Context/AppContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import colors from "../colors";
import ListItem from "../Components/Lists/ListItem";
import { useUser } from "@clerk/clerk-expo";
import AddList from "../Components/Lists/AddList";

export default function Lists() {
  const Tab = createMaterialTopTabNavigator();
  const { user } = useUser();
  const { shoppingLists, updateShoppingLists } = useContext(AppContext);
  console.log(shoppingLists[0]);

  const lists = [
    {
      id: 1,
      name: "Carrefour",
      agenda_id: 1,
    },
    {
      id: 2,
      name: "Leroy Merlin",
      agenda_id: 1,
    },
    {
      id: 3,
      name: "Action",
      agenda_id: 1,
    },
    {
      id: 4,
      name: "Auchan",
      agenda_id: 1,
    },
  ];
  const listItems = [
    {
      name: "Lait",
      list_id: 1,
      account_id: 1,
      agenda_id: 1,
    },
    {
      name: "Pain",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      name: "peinture",
      list_id: 2,
      account_id: 2,
      agenda_id: 2,
    },
  ];

  const styles = StyleSheet.create({
    containerList: {
      backgroundColor: colors.backgroundSolid,
      flexDirection: "row",
      paddingTop: 50,
      gap: 10,
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
    },

    buttonList: {
      backgroundColor: colors.backgroundElement,
      padding: 10,
      width: 100,
      height: 60,
      borderRadius: 5,
      justifyContent: "center",
    },
    listName: {
      textAlign: "center",
      color: colors.green,
    },
  });

  return (
    <View style={styles.containerList}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: colors.backgroundSolidHovered,
          },
          tabBarStyle: {
            backgroundColor: colors.backgroundSolid,
          },
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.primary,
        }}
      >
        {shoppingLists.map((list, index) => (
          <Tab.Screen
            name={shoppingLists.length > 2 ? (index + 1).toString() : list.name}
            key={index}
            children={() => <ListItem list={list} />}
          />
        ))}
        <Tab.Screen
          name={shoppingLists.length > 2 ? "+" : "Ajouter liste"}
          children={() => <AddList />}
        />
      </Tab.Navigator>
    </View>
  );
}
