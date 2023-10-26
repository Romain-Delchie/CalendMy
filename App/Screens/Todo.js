import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import DraggableFlatList from "react-native-draggable-flatlist";

export default function Todo() {

    const todos = [
        {
            id: 1,
            name: 'Go to the gym',
            ranking: 1, // Plus important
        },
        {
            id: 2,
            name: 'Faire la salle de bain',
            ranking: 2,
        },
        {
            id: 3,
            name: 'Faire la vaisselle',
            ranking: 3,
        },
        {
            id: 4,
            name: 'Faire les courses',
            ranking: 4,
        },
        {
            id: 5,
            name: 'Faire le ménage',
            ranking: 5, // Moins important
        },
        {
            id: 6,
            name: 'Faire la cuisine',
            ranking: 6, // Moins important
        },
    ];

    // Triez les tâches par importance (ranking)
    const sortedTodos = todos.sort((a, b) => a.ranking - b.ranking);

    // Associez une couleur à chaque tâche en fonction de l'importance (nuances de rouge à blanc)
    const getColorForRanking = (ranking) => {
        const maxRanking = sortedTodos.length;
        const hue = (ranking / maxRanking) * 0; // 0 = Rouge, 1 = Blanc
        const lightness = 50 + (ranking / maxRanking) * 50; // 50% à 100% de luminosité
        return `hsl(0, 100%, ${lightness}%)`;
    };


    const [data, setData] = useState(sortedTodos);

    return (
        <View>
            <DraggableFlatList
                data={data}
                renderItem={({ item, index, drag, isActive }) => (
                    <TouchableOpacity
                        style={{
                            height: 100,
                            backgroundColor: isActive ? "yellow" : getColorForRanking(item.ranking),
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onLongPress={drag}
                    >
                        <Text style={{
                            fontWeight: "bold",
                            color: "black",
                            fontSize: 24,
                        }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => `draggable-item-${item.id}`}
                onDragEnd={({ data }) => setData(data)}
            />
        </View>
    )
}
