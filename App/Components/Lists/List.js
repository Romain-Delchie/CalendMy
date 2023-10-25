import { View, Text } from 'react-native'
import React from 'react'

export default function List({ listId }) {
    const lists = [
        {
            id: 1,
            name: 'Carrefour',
            agenda_id: 1,
        },
        {
            id: 2,
            name: 'Leroy Merlin',
            agenda_id: 1,
        },
        {
            id: 3,
            name: 'Action',
            agenda_id: 1,
        },
    ];
    return (
        <View>
            <Text>List</Text>
            {lists.map((list, index) => (
                <View key={index}>
                    <Text>Liste {list.name}</Text>

                </View>
            ))}
        </View>
    )
}
