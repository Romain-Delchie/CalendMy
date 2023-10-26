import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import colors from "../colors";
import ListItem from "../Components/Lists/ListItem";

export default function Lists() {
  const Tab = createMaterialTopTabNavigator();

  const accounts = [
    {
      name: "John Doe",
      email: "johndoe@example.com",
      color: "#336699",
      image_link: "family.jpg",
    },
    {
      name: "Alice Smith",
      email: "alice@example.com",
      color: "#FF9900",
      image_link: "family.jpg",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      color: "#990000",
      image_link: "family.jpg",
    },
  ];
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
      backgroundColor: colors.quaternary,
      flexDirection: "row",
      paddingTop: 50,
      gap: 10,
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,

    },

    buttonList: {
      backgroundColor: colors.blue,
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
            backgroundColor: colors.secondary,
          },
          tabBarStyle: {
            backgroundColor: colors.quinary,
          },
          tabBarActiveTintColor: colors.secondary,
          tabBarInactiveTintColor: colors.primary,
        }}
      >
        {lists.map((list, index) => (
          <Tab.Screen
            name={lists.length > 3 ? (index + 1).toString() : list.name}
            key={index}
            children={() => <ListItem list={list} />}
          />
        ))}
      </Tab.Navigator>
    </View>
  );
}
