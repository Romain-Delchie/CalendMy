import React, { useState } from 'react';
import { View, Text, Button, Modal, TextInput } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

export default function ModalAddAppointment({ isVisible, onClose, onAddAppointment }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [appointmentName, setAppointmentName] = useState('');

    const toggleModal = () => {
        onClose();
    };

    const handleDatePicked = (date) => {
        setSelectedDate(date);
        toggleModal();
    };

    const handleAddAppointment = () => {
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const appointment = { name: appointmentName };
        onAddAppointment(formattedDate, appointment);
        toggleModal();
    };

    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={toggleModal}
            onBackButtonPress={toggleModal}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Choose a Date</Text>
                <DateTimePicker
                    isVisible={isVisible}
                    onConfirm={handleDatePicked}
                    onCancel={toggleModal}
                />
                <Text>Appointment Name:</Text>
                <TextInput
                    value={appointmentName}
                    onChangeText={(text) => setAppointmentName(text)}
                />
                <Button title="Valider" onPress={handleAddAppointment} />
                <Button title="Fermer" onPress={toggleModal} />
            </View>
        </Modal>
    );
}