import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React, { useEffect, useContext } from "react";
import { useAuth, useUser } from "@clerk/clerk-expo";
import Header from "../Components/Home/Header";
import API from "../Services/API";
import AppContext from "../Context/AppContext";
import thiago from "../../assets/thiago.jpg";
import moment from "moment";
import "moment/locale/fr";
import colors from "../colors";

moment.locale("fr");

export default function Home() {
  const { isLoaded, signOut } = useAuth();
  const today = moment().format("dddd Do MMMM YYYY");
  const todayDate = moment().format("YYYY-MM-DD");
  const userConnected = useUser().user;
  const {
    user,
    updateUser,
    events,
    updateEvents,
    shoppingLists,
    updateShoppingLists,
    toDoItems,
    updateToDoItems,
  } = useContext(AppContext);
  // console.log(userConnected.emailAddresses[0].emailAddress);
  useEffect(() => {
    API.getCalendmy()
      .then((res) => {
        updateUser({
          ...user,
          calendmyName: res.data.data[0].attributes.name,
        });
        updateEvents(
          res.data.data[0].attributes.events.data.map((event) => {
            return {
              id: event.id,
              date: event.attributes.date,
              name: event.attributes.name,
              begin: event.attributes.begin,
              end: event.attributes.end,
              instruction: event.attributes.instruction,
              author: event.attributes.author,
            };
          })
        );
        updateShoppingLists(
          res.data.data[0].attributes.shopping_lists.data.map((list) => {
            return {
              id: list.id,
              name: list.attributes.name,
              listItems: list.attributes.list_items.data.map((item) => {
                return {
                  id: item.id,
                  name: item.attributes.name,
                  quantity: item.attributes.quantity,
                  author: item.attributes.author,
                  shopping_list_id: list.id,
                };
              }),
            };
          })
        );
        updateToDoItems(
          res.data.data[0].attributes.to_do.data.attributes.todo_items.data.map(
            (item) => {
              return {
                name: item.attributes.name,
                ranking: item.attributes.ranking,
              };
            }
          )
        );
      })
      .catch((err) => console.log(err));
  }, []);

  if (events === null || toDoItems === null) {
    return null;
  }
  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <Image
        source={thiago}
        style={{
          width: "120%",
          height: "100%",
          position: "absolute",
          resizeMode: "cover",
        }}
      />
      <Header />
      {/* <Button title="Sign Out" onPress={() => signOut()} /> */}
      <View
        style={{
          backgroundColor: "rgba(0, 120, 190, 0.47)",
          padding: 20,
          alignItems: "center",
          justifyContent: "space-around",
          gap: 10,
          flex: 2,
        }}
      >
        <View style={{ gap: 10 }}>
          <Text
            style={{
              textAlign: "center",
              marginTop: 20,
              fontSize: 20,
              textTransform: "capitalize",
              fontWeight: 700,
              color: "whitesmoke",
            }}
          >
            {today}
          </Text>
        </View>
        <ScrollView>
          <View style={{ gap: 10 }}>
            {events.filter((event) => event.date === todayDate).length > 0 ? (
              events
                .filter((event) => event.date === todayDate)
                .sort((a, b) => {
                  const timeA = new Date(`1970-01-01T${a.begin}`);
                  const timeB = new Date(`1970-01-01T${b.begin}`);
                  return timeA - timeB;
                })
                .map((event, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        backgroundColor: "white",
                        borderRadius: 15,
                        gap: 10,
                        padding: 10,
                        borderBottomColor: "lightgrey",
                        borderBottomWidth: 2,
                        borderRightColor: "lightgrey",
                        borderRightWidth: 2,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontSize: 14,
                            marginBottom: 10,
                            color: colors.textHighContrast,
                            fontWeight: 700,
                          }}
                        >
                          {moment(event.begin, "HH:mm:ss.SSS").format("HH:mm")}
                        </Text>
                        <Text
                          style={{
                            fontSize: 14,
                            marginBottom: 10,
                            color: colors.textHighContrast,
                            fontWeight: 700,
                          }}
                        >
                          {moment(event.end, "HH:mm:ss.SSS").format("HH:mm")}
                        </Text>
                      </View>
                      <View style={{ width: "50%" }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: colors.textLowContrast,
                          }}
                        >
                          {event.name}
                        </Text>
                        {event.instruction && (
                          <Text style={{ fontSize: 14 }}>
                            {event.instruction}
                          </Text>
                        )}
                      </View>
                    </View>
                  );
                })
            ) : (
              <View>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  Aucun évènement prévu aujourd'hui
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        <View
          style={{
            width: "50%",
            backgroundColor: "white",
            height: 1,
            margin: 10,
          }}
        ></View>
        <View>
          {toDoItems &&
          toDoItems.filter((item) => item.ranking === 1).length > 0 ? (
            <View
              style={{
                backgroundColor: "white",
                width: "100%",
                padding: 15,
                borderRadius: 10,
                borderBottomColor: "lightgrey",
                borderBottomWidth: 2,
                borderLeftColor: "lightgrey",
                borderLeftWidth: 2,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Tâches prioritaires
              </Text>
              {toDoItems
                .filter((item) => item.ranking === 1)
                .map((item, index) => {
                  return (
                    <Text key={index} style={{ fontSize: 16 }}>
                      {item.name}
                    </Text>
                  );
                })}
            </View>
          ) : (
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Aucune tâche prioritaire
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
