import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { Calendar as CalendarComponent, Agenda } from "react-native-calendars";
import ModalAddAppointment from "../Components/Calendar/ModalAddAppointment";

export default function Calendar() {
  const [items, setItems] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);

  const addAppointment = (date, appointment) => {
    const newItems = { ...items };
    newItems[date] = [...(newItems[date] || []), appointment];
    setItems(newItems);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={{ flex: 1, padding: 30 }}>
      <Agenda
        items={items}
        // Personnalisez le format de la date
        rowHasChanged={(r1, r2) => r1.name !== r2.name}
        // Affiche le calendrier à partir de la date actuelle
        // et pour une année à l'avenir
        pastScrollRange={0}
        futureScrollRange={12}
        // Fonction pour rendre un élément de rendez-vous
        renderItem={(item) => {

          return (
            <View>
              <Text>{item.name}</Text>
            </View>
          )
        }}
      />
      <Button title="Add Appointment" onPress={toggleModal} />

      <ModalAddAppointment
        isVisible={isModalVisible}
        onClose={toggleModal}
        onAddAppointment={(date, appointment) => {
          addAppointment(date, appointment);
        }}
      />
    </View>
  );
}
