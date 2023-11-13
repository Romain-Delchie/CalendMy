import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Login from "./App/Screens/Login/Login";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./App/Navigations/TabNavigation";
import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppProvider from "./App/Context/AppProvider";

export default function App() {

  return (
    <ClerkProvider
      publishableKey={"pk_test_Zml0LXJhdHRsZXItNDcuY2xlcmsuYWNjb3VudHMuZGV2JA"}
    >
      <AppProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <SignedIn>
            <NavigationContainer>
              <TabNavigation />
            </NavigationContainer>
          </SignedIn>
          <SignedOut>
            <Login />
          </SignedOut>
        </SafeAreaView>
        </GestureHandlerRootView>
      </AppProvider>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
