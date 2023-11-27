import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Touchable,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import AppContext from "../Context/AppContext";
import { Calendar as CalendarComponent, Agenda } from "react-native-calendars";
import ModalAddAppointment from "../Components/Calendar/ModalAddAppointment";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../colors";
import API from "../Services/API";

export default function Calendar() {
  const { user, updateUser, events, updateEvents } = useContext(AppContext);
  const [items, setItems] = useState({
    "2023-11-27": [
      { name: "deplacement Bruxelles", begin: "9:00", end: "19:00" },
    ],
    "2023-11-27": [
      { name: "dentiste", begin: "9:00", end: "10:00" },
      { name: "rdv chez le coiffeur", begin: "11:00", end: "12:00" },
    ],
    "2023-11-30": [
      { name: "item 3 - any js object", begin: "9:00", end: "10:00" },
      { name: "any js object", begin: "11:00", end: "14:00" },
    ],
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isActionItemVisible, setIsActionItemVisible] = useState(false);
  const [onlyOneDay, setOnlyOneDay] = useState(true);
  useEffect(() => {
    API.getCalendmy()
      .then((res) => {
        updateEvents(
          res.data.data[0].attributes.events.data.map((event) => {
            return {
              date: event.attributes.date,
              name: event.attributes.name,
              begin: event.attributes.begin,
              end: event.attributes.end,
              instruction: event.attributes.instruction,
            };
          })
        );
        console.log("test");
        const newItems = {};
        events
          ?.sort((a, b) => {
            const timeA = new Date(`1970-01-01T${a.begin}`);
            const timeB = new Date(`1970-01-01T${b.begin}`);
            return timeA - timeB;
          })
          .map((event) => {
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
      })
      .catch((err) => console.log(err));
  }, [isActionItemVisible]);

  console.log(isActionItemVisible);

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

  console.log(items);
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
        onDayChange={(day) => {}}
        selected={selectedDate}
        // Fonction pour rendre un élément de rendez-vous
        refreshing={false}
        showOnlySelectedDayItems={onlyOneDay}
        onRefresh={() => {
          setItems({ ...items });
          return console.log("refreshing...");
        }}
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

                  <View style={{flexDirection:"row", gap:20, alignItems:"flex-start", height:"100%", marginTop:10}}>
                    <TouchableOpacity onPress={() => console.log("edit")}>
                      <MaterialIcons
                        name="edit"
                        size={20}
                        color={colors.textLowContrast}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => console.log("delete")}>
                      <MaterialIcons
                        name="delete"
                        size={20}
                        color={colors.textLowContrast}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }
        }}
      />
      <TouchableOpacity style={styles.AddBtn} onPress={toggleModal}>
        <Text style={styles.addBtnText}>Ajouter un rendez-vous</Text>
      </TouchableOpacity>
      <View style={styles.onlyOneDayContainer}>
        <TouchableOpacity
          style={onlyOneDay ? styles.btnNormal : styles.btnPress}
          onPress={() => setOnlyOneDay(false)}
        >
          <Text style={{ textAlign: "center", fontSize: 12 }}>
            Toutes les dates
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={onlyOneDay ? styles.btnPress : styles.btnNormal}
          onPress={() => setOnlyOneDay(true)}
        >
          <Text style={{ textAlign: "center", fontSize: 12 }}>
            Une seule date
          </Text>
        </TouchableOpacity>
      </View>
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
  onlyOneDayContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
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
  btnNormal: {
    borderRadius: 5,
    height: 60,
    width: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: colors.background,
  },
  btnPress: {
    backgroundColor: colors.backgroundActive,
    borderColor: colors.borderElement,
    borderWidth: 1,
    height: 60,
    width: 100,
    display: "flex",
    borderRadius: 5,
    alignItems: "center",
    padding: 5,
    justifyContent: "center",
  },
});
