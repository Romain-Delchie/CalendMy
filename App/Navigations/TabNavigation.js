import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import Calendar from "../Screens/Calendar";
import Settings from "../Screens/Settings";
import { Entypo } from "@expo/vector-icons";
import colors from "../colors";
import Todo from "../Screens/Todo";
import Lists from "../Screens/Lists";

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.textHighContrast,
        tabBarActiveBackgroundColor: colors.backgroundActive,
        tabBarInactiveBackgroundColor: colors.backgroundSubt,
        tabBarInactiveTintColor: colors.textLowContrast,
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={Home}
        options={{
          tabBarStyle: {
            color: colors.quaternary,
          },
          tabBarIcon: ({ color, size }) => (
            <Entypo
              name="home"
              size={24}
              color={
                color === colors.textHighContrast
                  ? colors.textHighContrast
                  : colors.textLowContrast
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Agenda"
        component={Calendar}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo
              name="calendar"
              size={24}
              color={
                color === colors.textHighContrast
                  ? colors.textHighContrast
                  : colors.textLowContrast
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="liste course"
        component={Lists}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo
              name="shopping-cart"
              size={24}
              color={
                color === colors.textHighContrast
                  ? colors.textHighContrast
                  : colors.textLowContrast
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="à faire"
        component={Todo}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo
              name="traffic-cone"
              size={24}
              color={
                color === colors.textHighContrast
                  ? colors.textHighContrast
                  : colors.textLowContrast
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Paramètres"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo
              name="tools"
              size={24}
              color={
                color === colors.textHighContrast
                  ? colors.textHighContrast
                  : colors.textLowContrast
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
