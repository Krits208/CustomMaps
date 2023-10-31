import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import React from "react";
import { Card, Title, Paragraph } from "react-native-paper";
import { useState, useEffect } from "react";

const url = " https://dass-team-26-backend.onrender.com";

const Mymaps = ({ route, navigation }) => {
  const { user } = route.params;
  const [maps, setMaps] = useState(false);
  const [m, setM] = useState(false);
  console.log("MyMaps: " + user);
  // console.log(maps);

  useEffect(() => {
    fetch(url + "/my-maps", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        user_id: String(user),
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((body) => {
          console.log(body);
          // console.log(body.all_maps);
          console.log("here");
          console.log(body.all_maps);
          setMaps(body.all_maps);
          setM(true);
        });
      } else {
        console.log(res);
      }
    });
  }, []);

  return (
    <ScrollView style={styles.mainContainer}>
      <Button
        title="Define a new map"
        onPress={() => navigation.navigate("MapDef", { user: user })}
      />
      <Text></Text>
      {m &&
        maps.map((map) => (
          <Card style={StyleSheet.container}>
            <Card.Content>
              <Title>{map.name}</Title>
            </Card.Content>
            <Card.Cover
              source={{
                uri: "https://developers.google.com/static/maps/images/landing/hero_maps_static_api.png",
              }}
            />
          </Card>
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // justifyContent: "center",
    height: "100%",
    paddingHorizontal: 30,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  inputStyle: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 1,

    fontSize: 18,
  },
  inputContainer: {
    marginTop: 20,
  },
  container: {
    alignContent: "center",
    margin: 37,
  },
});

export default Mymaps;
