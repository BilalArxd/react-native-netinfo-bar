import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { InternetStatusProvider } from "react-native-netinfo-bar";

export default function App() {
  return (
    <InternetStatusProvider>
      <View style={styles.container}>
        <Text>Example App!!</Text>
      </View>
    </InternetStatusProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
