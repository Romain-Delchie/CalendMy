import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Octicons } from '@expo/vector-icons';
import colors from '../../colors';

export default function ModalAddAppointment({ onClose }) {
    const [date, setDate] = useState(new Date());
    const [startHour, setStartHour] = useState('');
    const [endHour, setEndHour] = useState('');
    const [startOrEnd, setStartOrEnd] = useState('');
    const [mode, setMode] = useState();
    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [instruction, setInstruction] = useState('');

    const onChange = (event, selectedDate,) => {
        setShow(false);
        const currentDate = selectedDate;
        setDate(currentDate);
        if (startOrEnd == 'start') {
            setStartHour(selectedDate.getHours() + ':' + selectedDate.getMinutes());
        } else if (startOrEnd == 'end') {
            setEndHour(selectedDate.getHours() + ':' + selectedDate.getMinutes());
        }
    };
    console.log('startHour: ' + startHour)
    console.log('endHour: ' + endHour)
    console.log('name: ' + name);

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
        setStartOrEnd('');
    };

    const showTimepicker = (which) => {
        showMode('time');
        if (which == 'start') {
            setStartOrEnd('start');
        } else if (which == 'end') {
            setStartOrEnd('end');
        }
    };

    const handleAddAppointment = () => {
        const appointment = { name: name, begin: startHour, end: endHour, instruction: instruction, date: date };
        onClose();
    }
    const styles = StyleSheet.create({
        input: {
            height: 40,
            width: 280,
            margin: 12,
            borderWidth: 1,
            backgroundColor: '#FEDD00'
        },

        TouchIcon: {
            flexDirection: 'row',
            border: '1px solid black',
            borderRadius: 5,
            padding: 15,
            margin: 5,
            backgroundColor: colors.yellow,
            width: 300,
            color: '#009739',
        },
        textInside: {
            width: 200,
            fontSize: 15,
            color: '#009739',
            marginRight: 10,
        },
        btnCross: {
            position: 'absolute',
            top: 50,
            right: 20,
            backgroundColor: '#009739',
            color: '#FEDD00',
            borderRadius: 50,
        },
        btnValidate: {
            backgroundColor: '#012169',
            borderRadius: 5,
            padding: 15,
            margin: 5,
            width: 300,
            alignItems: 'center',
        },

    })

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: colors.green }}>
            <Text style={{ fontSize: 30, fontWeight: 700, color: colors.blue, marginBottom: 60 }}>Ajouter un RDV</Text>
            <TouchableOpacity style={styles.TouchIcon} onPress={showDatepicker}>
                <Text style={styles.textInside}>{date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}</Text>
                <Octicons name="pencil" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.TouchIcon} onPress={() => showTimepicker("start")}>
                <Text style={styles.textInside}>{'Heure de début: ' + startHour}</Text>
                <Octicons name="pencil" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.TouchIcon} onPress={() => showTimepicker("end")}>
                <Text style={styles.textInside}>{'Heure de fin: ' + endHour}</Text>
                <Octicons name="pencil" size={24} color="black" />
            </TouchableOpacity>
            <TextInput style={styles.TouchIcon} placeholder="Nom du rendez-vous" onChangeText={(text) => setName(text)} />
            <TextInput style={styles.TouchIcon} placeholder="instruction" onChangeText={(text) => setInstruction(text)} />
            <TouchableOpacity title="Ajouter le rendez-vous" onPress={handleAddAppointment} style={styles.btnValidate}>
                <Text style={{ color: '#FEDD00', fontSize: 20 }}>Ajouter le rendez-vous</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.btnCross}>
                <Octicons name="x" size={40} color="#012169" />
            </TouchableOpacity>
            {show &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            }

        </View>
    );


}