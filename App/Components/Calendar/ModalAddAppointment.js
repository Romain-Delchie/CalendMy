import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';



export default function ModalAddAppointment({ onClose }) {

    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');

    const formatHour = (hour) => {
        // Formate l'heure pour avoir 2 chiffres et ajoute 'h00' à la fin
        if (hour.length === 1) {
            return `0${hour}h00`;
        } else if (hour.length === 2) {
            return `${hour}h00`;
        } else if (hour.length > 2) {
            // Si l'heure a plus de 2 chiffres, ajoute 'h' entre les heures et les minutes
            return `${hour.slice(0, 2)}h${hour.slice(2)}`;
        }
        return hour;
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'red' }}>
            <Text>Modal test</Text>
            <TextInput
                placeholder="heure de début"
                keyboardType="numeric"
                value={startHour}
                onChangeText={(text) => setStartHour(formatHour(text))}
            />
            <TextInput
                placeholder="heure de fin"
                keyboardType="numeric"
                value={endHour}
                onChangeText={(text) => setEndHour(formatHour(text))}
            />
            <Button title="Close" onPress={onClose} />
        </View>
    );
}