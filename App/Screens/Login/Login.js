import { View, Text, Image } from "react-native";
import React from "react";
import family from "../../../assets/family.jpg";
import LoginStyle from "./Style";
import SignInWithOAuth from "../../Components/SignInWithOAuth";

export default function Login() {
  return (
    <View style={LoginStyle.container}>
      <Text style={LoginStyle.title}>Notre Calendrier</Text>
      <Image source={family} style={LoginStyle.family} />
      <SignInWithOAuth />
    </View>
  );
}
