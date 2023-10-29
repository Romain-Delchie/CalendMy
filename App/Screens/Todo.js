import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import DraggableFlatList, {
  NestableScrollContainer,
} from "react-native-draggable-flatlist";
import Icon from "react-native-vector-icons/Entypo";
import colors from "../colors";

export default function Todo() {
  const todos = [
    {
      id: 2,
      name: "B",
      ranking: 2,
    },
    {
      id: 1,
      name: "A",
      ranking: 1,
    },
    {
      id: 3,
      name: "C",
      ranking: 0,
    },
    {
      id: 4,
      name: "D",
      ranking: 3,
    },
    {
      id: 5,
      name: "E",
      ranking: 4, // Moins important
    },
    {
      id: 6,
      name: "F",
      ranking: 5, // Moins important
    },
    {
      id: 7,
      name: "G",
      ranking: 6, // Moins important
    },
    {
      id: 8,
      name: "H",
      ranking: 7, // Moins important
    },
    {
      id: 9,
      name: "I",
      ranking: 8, // Moins important
    },
    {
      id: 10,
      name: "J",
      ranking: 9, // Moins important
    },
    {
      id: 11,
      name: "K",
      ranking: 10, // Moins important
    },
  ];
  const [sortedTodos, setSortedTodos] = useState(todos);
  const [initialData, setInitialData] = useState(sortedTodos);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, onChangeText] = useState("");

  // Triez les tâches par importance (ranking)
  useEffect(() => {
    const myData = [...initialData];
    setSortedTodos(myData.sort((a, b) => a.ranking - b.ranking));
  }, [initialData]);

  // Associez une couleur à chaque tâche en fonction de l'importance (nuances de rouge à blanc)
  const getColorForRanking = (ranking) => {
    const maxRanking = sortedTodos.length;
    const hue = (ranking / maxRanking) * 0; // 0 = Rouge, 1 = Blanc
    const lightness = 50 + (ranking / maxRanking) * 50; // 50% à 100% de luminosité
    return `hsl(0, 100%, ${lightness}%)`;
  };

  const handleDragEnd = ({ data, from, to }) => {
    const draggedItem = data.find((item) => item.ranking === from);
    console.log(draggedItem);
    const draggedItems = data.slice(from, to + 1);
    console.log(draggedItems);
    const updatedData = data.map((item) => {
      if (item.ranking === from) {
        return { ...item, ranking: to };
      } else if (from < to) {
        if (item.ranking > from && item.ranking <= to) {
          return { ...item, ranking: item.ranking - 1 };
        }
      } else if (from > to) {
        if (item.ranking >= to && item.ranking < from) {
          return { ...item, ranking: item.ranking + 1 };
        }
      }
      return item;
    });

    setInitialData(updatedData);
  };

  const handleDelete = (id) => {
    // Filter out the item with the specified id
    const updatedData = sortedTodos.filter((item) => item.id !== id);

    // After filtering, update the rankings of the remaining items
    const updatedDataWithRanking = updatedData.map((item, index) => ({
      ...item,
      ranking: index,
    }));

    setInitialData(updatedDataWithRanking);
  };

  const handleAddTask = () => {
    const newTask = {
      id: sortedTodos.length + 1,
      name: text,
      ranking: sortedTodos.length,
    };
    const updatedData = [...sortedTodos, newTask];
    setInitialData(updatedData);
    setModalVisible(false);
  };

  console.log(sortedTodos);

  return (
    <View style={{ paddingBottom: 200 }}>
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: colors.tertiary,
          alignItems: "center",
          justifyContent: "center", // Add spacing between the item text and icon
          flexDirection: "row", // Add a row layout for the icon
          paddingHorizontal: 10, // Add padding for better spacing
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "red",
            fontSize: 24,
          }}
        >
          Ajouter une tâche
        </Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            bottom: 0,
            top: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Text>Nom de la tâche :</Text>
          <TextInput
            style={{
              height: 40,
              width: 200,
              borderColor: "gray",
              borderWidth: 1,
            }}
            onChangeText={(text) => onChangeText(text)}
          />
          <Button title="Ajouter" onPress={() => handleAddTask()} />
          <Button title="Annuler" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <DraggableFlatList
        data={sortedTodos}
        renderItem={({ item, index, drag, isActive }) => (
          <TouchableOpacity
            style={{
              height: 100,
              backgroundColor: isActive
                ? colors.secondary
                : getColorForRanking(item.ranking),
              alignItems: "center",
              justifyContent: "space-between", // Add spacing between the item text and icon
              flexDirection: "row", // Add a row layout for the icon
              paddingHorizontal: 10, // Add padding for better spacing
            }}
            onLongPress={drag}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "black",
                fontSize: 20,
              }}
            >
              {item.name}
            </Text>

            {/* Delete icon (Entypo icon) */}
            <TouchableOpacity
              onPress={() => handleDelete(item.id)} // Define a function to handle the delete action
            >
              <Icon
                name="trash" // Replace with the name of the Entypo icon you want to use
                size={24}
                color={colors.quinary} // Customize the icon color
              />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `draggable-item-${item.id}`}
        onDragEnd={handleDragEnd}
      />
    </View>
  );
}
