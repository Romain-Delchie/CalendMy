import { View, Text } from 'react-native'
import React from 'react'

export default function ListItem({ listId }) {
    const listItems = [
        {
            name: 'Lait',
            list_id: 1,
            account_id: 1,
            agenda_id: 1,
        },
        {
            name: 'Pain',
            list_id: 1,
            account_id: 2,
            agenda_id: 1,
        },
        {
            name: 'peinture',
            list_id: 2,
            account_id: 2,
            agenda_id: 2,
        },
    ];
    return (
        <View>

            {
                listItems.filter(item => item.list_id === listId).map((item, index) => (
                    <View key={index}>
                        <Text>{item.name}</Text>
                    </View>
                ))
            }
        </View>

    )
}