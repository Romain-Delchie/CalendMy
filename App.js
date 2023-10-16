import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Screens/Login/Login';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ClerkProvider } from '@clerk/clerk-react';

export default function App() {
  return (
    <ClerkProvider publishableKey={"pk_test_c2VsZWN0LXRlcnJpZXItMjEuY2xlcmsuYWNjb3VudHMuZGV2JA"}>
      <SafeAreaView style={styles.container}>
        <Text>Hello world!</Text>
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
