import { View, Text, Button } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import AppContext from "../Context/AppContext";
import { Calendar as CalendarComponent, Agenda } from "react-native-calendars";
import ModalAddAppointment from "../Components/Calendar/ModalAddAppointment";

export default function Calendar() {
  const { user, updateUser } = useContext(AppContext);
  const [items, setItems] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const newItems = {};
    user.events.map((event) => {
      newItems[event.date] = [
        ...(newItems[event.date] || []),
        {
          name: event.name,
          begin: event.begin,
          end: event.end,
          instruction: event.instruction,
        },
      ];
    });
    setItems(newItems);
  }, [user.events]);

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
        // Callback that fires when the calendar is opened or closed
        onCalendarToggled={(calendarOpened) => {
          console.log(calendarOpened);
        }}
        // Callback that gets called on day press
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          console.log("day pressed");
          console.log(selectedDate);
        }}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={(day) => {}}
        selected={selectedDate}
        // Fonction pour rendre un élément de rendez-vous
        renderItem={(item) => {
          return (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.begin}</Text>
              <Text>{item.end}</Text>
            </View>
          );
        }}
      />
      <Button title="Ajouter un RDV" onPress={toggleModal} />
      {isModalVisible && <ModalAddAppointment onClose={toggleModal} />}
    </View>
  );
}
