import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import colors from "../../colors";
import { Entypo } from "@expo/vector-icons";

export default function ListItem({ list }) {
  const listItems = [
    {
      id: 1,
      name: "Lait",
      list_id: 1,
      account_id: 1,
      agenda_id: 1,
    },
    {
      id: 2,
      name: "Pain",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 3,
      name: "Dentifrice avec de la menthe",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 2,
      name: "Pain",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 3,
      name: "Dentifrice avec de la menthe",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 2,
      name: "Pain",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 3,
      name: "Dentifrice avec de la menthe",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 2,
      name: "Pain",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 3,
      name: "Dentifrice avec de la menthe",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 2,
      name: "Pain",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 3,
      name: "Dentifrice avec de la menthe",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 2,
      name: "Pain",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 3,
      name: "Dentifrice avec de la menthe",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 2,
      name: "Pain",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 3,
      name: "Dentifrice avec de la menthe",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 2,
      name: "Pain",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 3,
      name: "Dentifrice avec de la menthe",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 2,
      name: "Pain",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 2,
      name: "Pain",
      list_id: 1,
      account_id: 2,
      agenda_id: 1,
    },
    {
      id: 3,
      name: "peinture",
      list_id: 2,
      account_id: 2,
      agenda_id: 2,
    },
  ];

  const styles = StyleSheet.create({
    itemContainer: {
      backgroundColor: colors.light,
      paddingTop: 50,
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    item: {
      flexDirection: "row",
      borderRadius: 5,
      justifyContent: "space-between",
      backgroundColor: colors.quaternary,
      borderColor: colors.tertiary,
      borderStyle: "solid",
      borderWidth: 1,
      padding: 10,
      width: 300,
    },
    textItem: {
      color: colors.primary,
      fontSize: 15,
    },
  });

  const handleDeleteItem = (item) => {
    console.log("delete item" + item.id);
  };

  return (
    <ScrollView contentContainerStyle={styles.itemContainer}>
      <View>
        <Text>{list.name}</Text>
        <Entypo name="trash" size={24} color="black" />
      </View>
      {listItems
        .filter((item) => item.list_id === list.id)
        .map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.textItem}>{item.name}</Text>
            <Entypo
              onPress={() => handleDeleteItem(item)}
              name="trash"
              size={24}
              color="black"
            />
          </View>
        ))}
    </ScrollView>
  );
}
