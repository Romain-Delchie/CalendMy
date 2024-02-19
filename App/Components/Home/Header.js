import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import colors from "../../colors";
import { Feather } from "@expo/vector-icons";

export default function Header({ setHandleRefresh }) {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 7,
        alignItems: "center",
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 10,
        justifyContent: "space-between",
        backgroundColor: colors.backgroundElement,
        width: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 7,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: user.imageUrl }}
          style={{ width: 45, height: 45, borderRadius: 99 }}
        />
        <View>
          <Text>Hello 👋😊,</Text>
          <Text style={{ fontWeight: 700 }}>{user.fullName}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setHandleRefresh((prev) => !prev);
        }}
      >
        <Feather name="refresh-ccw" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}
