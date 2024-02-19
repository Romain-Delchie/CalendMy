import React, { useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import { View, Text, TouchableOpacity } from "react-native";
import colors from "../../colors";
import { TextInput } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import API from "../../Services/API";
import { useNavigation } from "@react-navigation/native";

export default function AddList() {
  const [nameList, setNameList] = useState("");
  const { shoppingLists, updateShoppingLists } = useContext(AppContext);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (nameList === "") {
      alert("Veuillez renseigner un nom de liste");
    } else {
      try {
        const list = {
          data: {
            name: nameList,
            calend_my: 1,
          },
        };
        const res = await API.addShoppingList(list);
        const newShoppingLists = [
          ...shoppingLists,
          {
            name: res.data.data.attributes.name,
            id: res.data.data.id,
            listItems: [],
          },
        ];
        updateShoppingLists(newShoppingLists);

        setNameList("");

        const listIndex =
          shoppingLists.length > 1
            ? (shoppingLists.length + 1).toString()
            : res.data.data.attributes.name;
        setTimeout(() => {
          navigation.navigate(listIndex);
        }, 200);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 700,
          color: colors.textHighContrast,
          marginBottom: 60,
          marginTop: 60,
        }}
      >
        Ajouter une liste
      </Text>
      <TextInput
        style={{
          height: 40,
          width: 200,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 20,
        }}
        value={nameList}
        placeholder="Nom de la liste"
        onChangeText={(text) => setNameList(text)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: colors.textLowContrast,
          padding: 10,
          borderRadius: 10,
          alignItems: "center",
          width: 100,
          height: 60,
        }}
        onPress={() => handleSubmit()}
      >
        <AntDesign name="check" size={30} color="white" />
        <Text style={{ color: "white" }}>Valider</Text>
      </TouchableOpacity>
    </View>
  );
}
