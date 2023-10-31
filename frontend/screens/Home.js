import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";

const Home = ({ route, navigation }) => {
  const { user } = route.params;
  console.log("Home: " + user);

  return (
    <View style={styles.mainContainer}>
      <Button title="MY MAPS" onPress={() => navigation.navigate("Mymaps", { user: user })} />
      <Text></Text>
      <Button title="ALL MAPS" onPress={() => navigation.navigate("Allmaps")} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    height: "100%",
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
});

export default Home;
