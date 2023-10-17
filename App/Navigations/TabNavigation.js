import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../Screens/Home";
import Calendar from "../Screens/Calendar";
import Settings from "../Screens/Settings";
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={24} color="black" />
          )
        }} />
      <Tab.Screen name="Calendar" component={Calendar}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="calendar" size={24} color="black" />
          )
        }} />
      <Tab.Screen name="Settings" component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={24} color="black" />
          )
        }} />
    </Tab.Navigator>
  );
}
