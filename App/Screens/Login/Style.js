import { Dimensions, StyleSheet } from "react-native";

const LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0077C0",
    marginTop: 40,
    marginBottom: 40,
  },
  family: {
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.6,
    borderRadius: 50,
  },
  buttonContainer: {
    color: "#FAFAFA",
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    elevation: 5,
    marginTop: 50,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.1,
    backgroundColor: "#0077C0",
    borderRadius: 50,
    padding: 10,
    margin: 10,
    textAlign: "center",
    color: "#FAFAFA",
    paddingTop: 20,
    fontSize: 20,
  },
});

export default LoginStyle;
