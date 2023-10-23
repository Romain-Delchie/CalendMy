import { View, Text, Button } from "react-native";
import React, { useState } from "react";
import { Calendar as CalendarComponent, Agenda } from "react-native-calendars";
import ModalAddAppointment from "../Components/Calendar/ModalAddAppointment";

export default function Calendar() {
  const [items, setItems] = useState({
    '2023-10-25': [{ name: 'deplacement Bruxelles', begin: '9:00', end: '19:00' }],
    '2023-10-26': [{ name: 'dentiste', begin: '9:00', end: '10:00' }, { name: 'rdv chez le coiffeur', begin: '11:00', end: '12:00' }],
    '2023-10-27': [],
    '2023-01-30': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

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
        onCalendarToggled={calendarOpened => {
          console.log(calendarOpened);
        }}
        // Callback that gets called on day press
        onDayPress={day => {
          setSelectedDate(day.dateString)
          console.log('day pressed');
          console.log(selectedDate);
        }}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={day => {

        }}
        selected={selectedDate}

        // Fonction pour rendre un élément de rendez-vous
        renderItem={(item) => {

          return (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.begin}</Text>
              <Text>{item.end}</Text>
            </View>
          )
        }}
      />
      <Button title="Add Appointment" onPress={toggleModal} />
      {isModalVisible &&
        <ModalAddAppointment
          onClose={toggleModal}

        />
      }

    </View>
  );
}
