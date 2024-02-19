import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
  Modal,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import AppContext from "../../Context/AppContext";
import colors from "../../colors";
import { Entypo } from "@expo/vector-icons";
import { useUser } from "@clerk/clerk-expo";
import { TextInput } from "react-native-gesture-handler";
import API from "../../Services/API";

export default function ListItem({ list }) {
  const [listState, setListState] = useState(list);
  const { shoppingLists, updateShoppingLists } = useContext(AppContext);
  const { user } = useUser();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [newItem, setNewItem] = useState({ name: "", quantity: "" });

  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeleteAll, setModalDeleteAll] = useState(false);

  const styles = StyleSheet.create({
    listTitleContainer: {
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
  const handleDeleteList = (list) => {
    API.deleteShoppingList(list.id).then(() => {
      updateShoppingLists(
        shoppingLists.filter((item) => item.list_id !== list.id)
      );
    });
  };

  const handleDeleteItem = (item) => {
    API.deleteItemFromList(item.id)
      .then(() => {
        const newItems = listState.listItems.filter(
          (listItem) => listItem.id !== item.id
        );
        const newShoppingList = {
          ...listState,
          listItems: newItems,
        };
        updateShoppingLists(
          shoppingLists.map((oneList) =>
            oneList.id === newShoppingList.id ? newShoppingList : oneList
          )
        );
        setListState(newShoppingList);
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      });
  };

  const handleAddItem = () => {
    const itemToAdd = {
      data: {
        name: newItem.name,
        quantity: newItem.quantity,
        shopping_list: listState.id,
        author: user.imageUrl,
      },
    };
    API.addItemToList(itemToAdd)
      .then((res) => {
        itemToAdd.data.id = res.data.data.id;
        const newShoppingList = {
          ...listState,
          listItems: [...listState.listItems, itemToAdd.data],
        };
        updateShoppingLists(
          shoppingLists.map((oneList) =>
            oneList.id === newShoppingList.id ? newShoppingList : oneList
          )
        );
        setListState(newShoppingList);
      })
      .catch((err) => {
        console.error(err);
        alert(err);
      });

    setModalVisible(false);
    setNewItem({ name: "", quantity: "" });
  };

  const handleDeleteAllItem = () => {
    setItems(items.filter((item) => item.list_id !== listState.id));
    setModalDeleteAll(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.itemContainer}>
      <View style={styles.listTitleContainer}>
        <Text style={styles.listTitle}>{listState.name}</Text>
        <Entypo
          name="trash"
          size={24}
          color={colors.textLowContrast}
          onPress={() => setConfirmDelete(true)}
        />
        <Modal animationType="slide" transparent={true} visible={confirmDelete}>
          <View style={styles.modalDeleteList}>
            <Text>Êtes-vous sûr de vouloir supprimer la liste ?</Text>
            <Button title="Oui" onPress={() => handleDeleteList(listState)} />
            <Button title="Non" onPress={() => setConfirmDelete(false)} />
          </View>
        </Modal>
      </View>
      {listState.listItems.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.textItem}>{item.name}</Text>
          <Image
            source={{ uri: item.author }}
            style={{
              width: 20,
              height: 20,
              borderRadius: 100,
              position: "absolute",
              right: 50,
              top: 17,
            }}
          />
          <Entypo
            onPress={() => handleDeleteItem(item)}
            name="trash"
            size={24}
            color={colors.textHighContrast}
          />
        </View>
      ))}
      {list.listItems.length === 0 && (
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
            onChangeText={(text) => setNewItem({ ...newItem, name: text })}
            value={newItem.name}
          />
          <Text>quantité: (facultatif)</Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={(text) => setNewItem({ ...newItem, quantity: text })}
            value={newItem.quantity}
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
            Etes vous sur de vouloir supprimer TOUS les produits de la liste
          </Text>
          {/* <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
            onChangeText={(text) => onChangeText(text)}
            value={text}
          /> */}
          <Button title="Oui" onPress={handleDeleteAllItem} />
          <Button title="Non" onPress={() => setModalDeleteAll(false)} />
        </View>
      </Modal>
    </ScrollView>
  );
}
