import React, { useState, useContext } from "react";
import AppContext from "../../Context/AppContext";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import API from "../../Services/API";
import { Octicons } from "@expo/vector-icons";
import colors from "../../colors";

export default function ModalAddAppointment({ onClose }) {
  const { events, updateEvents } = useContext(AppContext);
  const [date, setDate] = useState(new Date());
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [startOrEnd, setStartOrEnd] = useState("");
  const [mode, setMode] = useState();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [instruction, setInstruction] = useState("");
  const [inputStates, setInputStates] = useState({
    input1: false,
    input2: false,
  });

  const handleFocus = (inputName) => {
    setInputStates((prevInputStates) => ({
      ...prevInputStates,
      [inputName]: true,
    }));
  };

  const handleBlur = (inputName) => {
    setInputStates((prevInputStates) => ({
      ...prevInputStates,
      [inputName]: false,
    }));
  };

  const onChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate;
    setDate(currentDate);
    if (startOrEnd == "start") {
      setStartHour(
        selectedDate.getHours() +
          ":" +
          (selectedDate.getMinutes() < 10 ? "0" : "") +
          selectedDate.getMinutes()
      );
    } else if (startOrEnd == "end") {
      setEndHour(
        selectedDate.getHours() +
          ":" +
          (selectedDate.getMinutes() < 10 ? "0" : "") +
          selectedDate.getMinutes()
      );
    }
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
    setStartOrEnd("");
  };

  const showTimepicker = (which) => {
    showMode("time");
    if (which == "start") {
      setStartOrEnd("start");
    } else if (which == "end") {
      setStartOrEnd("end");
    }
  };

  const handleAddAppointment = () => {
    const appointment = {
      data: {
        name: name,
        begin: startHour + ":00",
        end: endHour + ":00",
        instruction: instruction,
        date: date,
        //TO DO : add id logic
        calend_my: 1,
      },
    };

    API.addEvent(appointment);
    updateEvents([...events, appointment]);
    onClose();
  };
  const styles = StyleSheet.create({
    input: {
      height: 40,
      width: 280,
      margin: 12,
      borderWidth: 1,
      backgroundColor: colors.backgroundElement,
    },

    TouchIcon: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderRadius: 5,
      padding: 15,
      margin: 5,
      width: 300,
      color: colors.textLowContrast,
    },
    textInside: {
      width: 200,
      fontSize: 15,
      color: colors.textLowContrast,
      marginRight: 10,
    },
    btnCross: {
      position: "absolute",
      top: 50,
      right: 20,
      color: colors.textHighContrast,
      borderRadius: 50,
    },
    btnValidate: {
      backgroundColor: colors.backgroundActive,
      borderRadius: 5,
      padding: 15,
      margin: 30,
      width: 300,
      alignItems: "center",
    },
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: 700,
          color: colors.textHighContrast,
          marginBottom: 60,
        }}
      >
        Ajouter un RDV
      </Text>
      <TouchableOpacity style={styles.TouchIcon} onPress={showDatepicker}>
        <Text style={styles.textInside}>
          {date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear()}
        </Text>
        <Octicons name="pencil" size={24} color={colors.textHighContrast} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.TouchIcon}
        onPress={() => showTimepicker("start")}
      >
        <Text style={styles.textInside}>{"Heure de début: " + startHour}</Text>
        <Octicons name="pencil" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.TouchIcon}
        onPress={() => showTimepicker("end")}
      >
        <Text style={styles.textInside}>{"Heure de fin: " + endHour}</Text>
        <Octicons name="pencil" size={24} />
      </TouchableOpacity>
      <TextInput
        style={[
          styles.TouchIcon,
          {
            backgroundColor: inputStates.input1
              ? colors.backgroundElement
              : "transparent",
          },
        ]}
        placeholder="Nom du rendez-vous"
        placeholderTextColor={
          inputStates.input2 ? colors.textHighContrast : colors.textLowContrast
        }
        onChangeText={(text) => setName(text)}
        onFocus={() => handleFocus("input1")}
        onBlur={() => handleBlur("input1")}
      />
      <TextInput
        style={[
          styles.TouchIcon,
          {
            backgroundColor: inputStates.input2
              ? colors.backgroundElement
              : "transparent",
          },
        ]}
        placeholder="instruction"
        placeholderTextColor={
          inputStates.input2 ? colors.textHighContrast : colors.textLowContrast
        }
        onChangeText={(text) => setInstruction(text)}
        onFocus={() => handleFocus("input2")}
        onBlur={() => handleBlur("input2")}
      />
      <TouchableOpacity
        title="Ajouter le rendez-vous"
        onPress={handleAddAppointment}
        style={styles.btnValidate}
      >
        <Text
          style={{
            color: colors.textHighContrast,
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Ajouter le rendez-vous
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onClose} style={styles.btnCross}>
        <Octicons name="x" size={40} />
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
}
