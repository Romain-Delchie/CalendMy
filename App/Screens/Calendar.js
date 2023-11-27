import { View, Text, Button, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import AppContext from "../Context/AppContext";
import { Calendar as CalendarComponent, Agenda } from "react-native-calendars";
import ModalAddAppointment from "../Components/Calendar/ModalAddAppointment";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../colors";

export default function Calendar() {
  const { user, updateUser, events, updateEvents } = useContext(AppContext);
  const [items, setItems] = useState({
    '2023-11-27': [{ name: 'deplacement Bruxelles', begin: '9:00', end: '19:00' }],
    '2023-11-27': [{ name: 'dentiste', begin: '9:00', end: '10:00' }, { name: 'rdv chez le coiffeur', begin: '11:00', end: '12:00' }],
    '2023-11-30': [{ name: 'item 3 - any js object', begin: '9:00', end: '10:00' }, { name: 'any js object', begin: '11:00', end: '14:00' }]
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isActionItemVisible, setIsActionItemVisible] = useState(false);

  // useEffect(() => {
  //   const newItems = {};
  //   events
  //     ?.sort((a, b) => {
  //       const timeA = new Date(`1970-01-01T${a.begin}`);
  //       const timeB = new Date(`1970-01-01T${b.begin}`);
  //       return timeA - timeB;
  //     })
  //     .map((event) => {
  //       newItems[event.date] = [
  //         ...(newItems[event.date] || []),
  //         {
  //           name: event.name,
  //           begin: event.begin,
  //           end: event.end,
  //           instruction: event.instruction,
  //         },
  //       ];
  //     });
  //   setItems(newItems);
  // }, [events]);

  const addAppointment = (date, appointment) => {
    const newItems = { ...items };
    newItems[date] = [...(newItems[date] || []), appointment];
    setItems(newItems);
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleActionItem = () => {
    setIsActionItemVisible((prev) => !prev);
  };

  console.log(isActionItemVisible);
  return (
    <View style={{ flex: 1, padding: 30 }}>
      <Agenda
        selectedDay={selectedDate}
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
        }}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={(day) => { }}
        selected={selectedDate}
        // Fonction pour rendre un élément de rendez-vous
        renderItem={(item) => {
          if (!item || item.length === 0) {
            return (
              <View style={styles.noAppointmentsContainer}>
                <Text style={styles.noAppointmentsText}>
                  Pas de rendez-vous
                </Text>
              </View>
            );
          } else {
            return (
              <View>
                <TouchableOpacity
                  style={styles.allRdv}
                  onLongPress={toggleActionItem}
                  delayLongPress={100}
                >
                  <View style={styles.RdvContainer}>
                    <View style={styles.hours}>
                      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        {moment(item.begin, "HH:mm:ss.SSS").format("HH:mm")}
                        {" - "}
                      </Text>
                      <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                        {" "}
                        {moment(item.end, "HH:mm:ss.SSS").format("HH:mm")}
                      </Text>


                    </View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: colors.textHighContrast,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "bold",
                        color: colors.textLowContrast,
                      }}
                    >
                      {item?.instruction}
                    </Text>
                  </View>
                  <View style={styles.TouchIcon}></View>
                  {
                    isActionItemVisible &&
                    <View style={{ backgroundColor: 'blue' }}>
                      <TouchableOpacity onPress={() => console.log('edit')}>
                        <MaterialIcons name="edit" size={40} color="red" />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => console.log('delete')}>
                        <MaterialIcons name="delete" size={40} color="red" />
                      </TouchableOpacity>
                    </View>
                  }
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
      <TouchableOpacity style={styles.AddBtn} onPress={toggleModal}>
        <Text style={styles.addBtnText}>Ajouter un rendez-vous</Text>
      </TouchableOpacity>
      {isModalVisible && <ModalAddAppointment onClose={toggleModal} />}
    </View>
  );
}

const styles = StyleSheet.create({
  allRdv: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    margin: 5,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  RdvContainer: {
    flex: 2,
    width: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  hours: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  TouchIcon: {
    flex: 1,
    alignItems: "flex-end",
    gap: 20,
    justifyContent: "space-between",
  },
  AddBtn: {
    backgroundColor: colors.backgroundActive,
    borderRadius: 5,
    padding: 15,
    margin: 30,
    width: 300,
    alignItems: "center",
  },
  addBtnText: {
    color: colors.textHighContrast,
    fontSize: 20,
    fontWeight: "bold",
  },
});
