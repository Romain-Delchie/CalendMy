import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../../colors";
import { Entypo } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import { TextInput } from "react-native-gesture-handler";

export default function ListItem({ list }) {
  const { user } = useUser();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [text, onChangeText] = useState("");

  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeleteAll, setModalDeleteAll] = useState(false);

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

  useEffect(() => {
    setItems(listItems);
  }, []);

  const styles = StyleSheet.create({
    listTitleContainer: {
      borderColor: colors.borderSubtitle,
      borderStyle: "solid",
      borderWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingLeft: 20,
      width: 270,
      height: 70,
      backgroundColor: colors.backgroundSubt,
      marginBottom: 30,
      paddingRight: 11,
      position: "absolute",
      borderBottomEndRadius: 10,
      borderTopRightRadius: 10,
      top: 50,
      left: 0,
    },
    listTitle: {
      color: colors.textLowContrast,
      fontSize: 20,
      fontWeight: "bold",
    },
    modalDeleteList: {
      bottom: 0,
      top: 0,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
    },
    itemContainer: {
      backgroundColor: colors.background,
      paddingTop: 150,
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      gap: 10,
    },
    item: {
      flexDirection: "row",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.backgroundElement,
      borderColor: colors.borderElement,
      borderStyle: "solid",
      borderWidth: 1,
      padding: 10,
      width: 300,
      height: 70,
    },
    addItem: {
      flexDirection: "row",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.backgroundSolid,
      padding: 10,
      width: 300,
      height: 70,
    },
    deleteAllItem: {
      flexDirection: "row",
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: colors.backgroundSolid,
      padding: 10,
      width: 300,
      height: 70,
      marginBottom: 50,
      marginTop: 30,
    },

    textItem: {
      color: colors.textHighContrast,
      fontSize: 15,
      width: 200,
    },
    textItemDelete: {
      color: "red",
      fontSize: 15,
      width: 200,
    },
  });

  const handleDeleteItem = (item) => {
    setItems(items.filter((i) => i.id !== item.id));
  };

  const handleAddItem = () => {
    const newItem = {
      id: items.length + 1,
      name: text,
      list_id: list.id,
      account_id: user.id,
      agenda_id: 1,
    };
    setItems([...items, newItem]);
    setModalVisible(false);
    onChangeText("");
  };

  const handleDeleteAllItem = () => {
    setItems(items.filter((item) => item.list_id !== list.id));
    setModalDeleteAll(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.itemContainer}>
      <View style={styles.listTitleContainer}>
        <Text style={styles.listTitle}>{list.name}</Text>
        <Entypo
          name="trash"
          size={24}
          color={colors.textLowContrast}
          onPress={() => setConfirmDelete(true)}
        />
        <Modal animationType="slide" transparent={true} visible={confirmDelete}>
          <View style={styles.modalDeleteList}>
            <Text>Êtes-vous sûr de vouloir supprimer la liste ?</Text>
            <Button title="Oui" onPress={() => handleDeleteList(list)} />
            <Button title="Non" onPress={() => setConfirmDelete(false)} />
          </View>
        </Modal>
      </View>
      {items
        .filter((item) => item.list_id === list.id)
        .map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.textItem}>{item.name}</Text>
            <Entypo
              onPress={() => handleDeleteItem(item)}
              name="trash"
              size={24}
              color={colors.textHighContrast}
            />
          </View>
        ))}
      {listItems.filter((item) => item.list_id === list.id).length === 0 && (
        <Text>Aucun produit dans cette liste</Text>
      )}
      <TouchableOpacity
        style={styles.addItem}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textItem}>Ajouter un produit</Text>
        <Entypo name="plus" size={24} color={colors.textHighContrast} />
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={{ backgroundColor: "yellow" }}>
          <Text>Ajouter un nom de produit :</Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={(text) => onChangeText(text)}
            value={text}
          />
          <Button title="Oui" onPress={handleAddItem} />
          <Button title="Non" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <TouchableOpacity
        style={styles.deleteAllItem}
        onPress={() => setModalDeleteAll(true)}
      >
        <Text style={styles.textItemDelete}>Supprimer tous les produits</Text>
        <Entypo name="trash" size={24} color="red" />
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalDeleteAll}>
        <View style={{ backgroundColor: "yellow" }}>
          <Text>
            Etes vous sur de vouloir supprimer TOUS les produits de la list
          </Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={(text) => onChangeText(text)}
            value={text}
          />
          <Button title="Oui" onPress={handleDeleteAllItem} />
          <Button title="Non" onPress={() => setModalDeleteAll(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
}
