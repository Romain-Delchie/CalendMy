import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Modal,
  Button,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import moment from "moment";
import AppContext from "../Context/AppContext";
import {
  Calendar as CalendarComponent,
  Agenda,
  LocaleConfig,
} from "react-native-calendars";
import ModalAddAppointment from "../Components/Calendar/ModalAddAppointment";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../colors";
import API from "../Services/API";
import XDate from "xdate";

export default function Calendar() {
  const { user, updateUser, events, updateEvents } = useContext(AppContext);
  const [items, setItems] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new XDate());
  const [isActionItemVisible, setIsActionItemVisible] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const [onlyOneDay, setOnlyOneDay] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [iconVisible, setIconVisible] = useState(false);
  const [agendaKey, setAgendaKey] = useState(0);
  LocaleConfig.locales["fr"] = {
    monthNames: [
      "Janvier",
      "Février",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Août",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre",
    ],
    monthNamesShort: [
      "Janv.",
      "Févr.",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juil.",
      "Août",
      "Sept.",
      "Oct.",
      "Nov.",
      "Déc.",
    ],
    dayNames: [
      "Dimanche",
      "Lundi",
      "Mardi",
      "Mercredi",
      "Jeudi",
      "Vendredi",
      "Samedi",
    ],
    dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
    today: "Aujourd'hui",
  };
  LocaleConfig.defaultLocale = "fr";

  useEffect(() => {
    API.getCalendmy()
      .then((res) => {
        updateEvents(
          res.data.data[0].attributes.events.data.map((event) => {
            return {
              id: event.id,
              date: event.attributes.date,
              name: event.attributes.name,
              begin: event.attributes.begin,
              end: event.attributes.end,
              instruction: event.attributes.instruction,
            };
          })
        );
      })
      .catch((err) => console.log(err));
  }, [agendaKey]);

  useEffect(() => {
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
            id: event.id,
            name: event.name,
            begin: event.begin,
            end: event.end,
            instruction: event.instruction,
          },
        ];
      });
    setItems(newItems);
    setIsLoading(false);
  }, [events, updateEvents]);

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

  const handleDeleteItem = (id) => {
    API.deleteEvent(id)
      .then((res) => {
        setAgendaKey(agendaKey + 1);
        setIconVisible(false);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    console.log(iconVisible);
  }, [iconVisible]);

  if (isloading)
    return (
      <View>
        <Text>loading...</Text>
      </View>
    );
  return (
    <View style={{ flex: 1, padding: 30 }}>
      <Agenda
        key={agendaKey}
        selectedDay={selectedDate}
        items={items}
        // Personnalisez le format de la date
        rowHasChanged={(r1, r2) => r1.name !== r2.name}
        // Affiche le calendrier à partir de la date actuelle
        // et pour une année à l'avenir
        pastScrollRange={10}
        futureScrollRange={12}
        // Callback that fires when the calendar is opened or closed
        onCalendarToggled={(calendarOpened) => {
          console.log(calendarOpened);
        }}
        // Callback that gets called on day press
        onDayPress={(day) => {
          setSelectedDate(XDate(day.dateString));
        }}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={(day) => {}}
        firstDay={1}
        selected={selectedDate}
        // Fonction pour rendre un élément de rendez-vous
        refreshing={false}
        showWeekNumbers={true}
        showClosingKnob={true}
        showOnlySelectedDayItems={onlyOneDay}
        onRefresh={() => {
          updateEvents(events);
          setIconVisible(false);
          setAgendaKey(agendaKey + 1);
        }}
        renderEmptyData={() => {
          return <View />;
        }}
        // renderDay={(day, item) => {
        //   return <View />;
        // }}
        renderItem={(item) => {
          return (
            <View>
              <TouchableOpacity
                style={styles.allRdv}
                onLongPress={() => {
                  setIconVisible(true);
                  setAgendaKey(agendaKey + 1);
                }}
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
                {iconVisible && (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 20,
                      alignItems: "flex-start",
                      height: "100%",
                      marginTop: 10,
                    }}
                  >
                    <TouchableOpacity onPress={() => handleDeleteItem(item.id)}>
                      <MaterialIcons
                        name="delete"
                        size={20}
                        color={colors.textLowContrast}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          );
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
      {isModalVisible && (
        <ModalAddAppointment
          setRefresh={setRefresh}
          onClose={toggleModal}
          setAgendaKey={setAgendaKey}
        />
      )}
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
