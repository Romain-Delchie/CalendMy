import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import Login from "./App/Screens/Login/Login";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigation from "./App/Navigations/TabNavigation";
import React from "react";
import Home from "./App/Screens/Home";

export default function App() {

  return (
    <ClerkProvider
      publishableKey={"pk_test_Zml0LXJhdHRsZXItNDcuY2xlcmsuYWNjb3VudHMuZGV2JA"}
    >
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
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
