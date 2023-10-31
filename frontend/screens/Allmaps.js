import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  RefreshControl,
  Alert,
} from "react-native";
import React from "react";
import { Card, Button, Title, Paragraph, IconButton } from "react-native-paper";
import { useState, useEffect } from "react";
import { SearchBar } from "react-native-elements";
import { string } from "prop-types";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAu-ab9eSAKhuoTn1IPmZxczFJwPCkUfVg",
  authDomain: "custom-maps-e7b33.firebaseapp.com",
  projectId: "custom-maps-e7b33",
  storageBucket: "custom-maps-e7b33.appspot.com",
  messagingSenderId: "397095233160",
  appId: "1:397095233160:web:8ecce30c2c9949a858e13d",
  measurementId: "G-WETL2T9Y4E",
};

const app = initializeApp(firebaseConfig);

const url = "https://dass-team-26-backend.onrender.com";

const Allmaps = ({ route, navigation }) => {
  const [maps, setMaps] = useState(false);
  const [m, setM] = useState(false);
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState(" ");
  const [refreshing, setRefreshing] = React.useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const user = route.params.user;
  const is_admin = route.params.is_admin;
  // console.log("hello")
  console.log(user);
  // console.log("hii"+route.params.user)

  const handlesave = (m_id) => {
    fetch(url + "/save", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        map_id: String(m_id),
        user_id: String(user),
      },
    }).then((res) => {
      if (res.ok) {
        console.log(res);
      }
    });
  };

  const onRefresh = React.useCallback(() => {
    fetch(url + "/list-maps", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((body) => {
          console.log(body);
          // console.log(body.all_maps);
          console.log("here");
          console.log(body.all_maps);
          setFilteredDataSource(body.all_maps);
          setMaps(body.all_maps);
          for (let i = 0; i < body.all_maps.length; i++) {
            console.log("hi");
            const func = async () => {
              const storage = getStorage();
              const reference = ref(
                storage,
                "/" + body.all_maps[i].id + ".jpg"
              );
              await getDownloadURL(reference).then((x) => {
                images.push(x);
                console.log(x);
              });
            };
            func();
          }
          setM(true);
        });
      } else {
        console.log(res);
      }
    });
  }, []);

  const handleAlert = (m_id) => {
    Alert.alert("Delete", "Are you sure, you want to delete this map ?", [
      {
        text: "NO",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "YES",
        onPress: () => {
          fetch(url + "/delete-map", {
            method: "DELETE",
            // headers: {
            //   "Content-Type": "application/json",
            // },
            headers: {
              "Content-Type": "application/json",
              map_id: String(m_id),
              user_id: String(user),
            },
            body: JSON.stringify({
              m_id,
            }),
          }).then((res) => {
            console.log("response is okay");
          });
        },
      },
    ]);
  };

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = maps.filter(function (item) {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(maps);
      setSearch(text);
    }
  };

  useEffect(() => {
    fetch(url + "/list-maps", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((body) => {
          console.log(body);
          // console.log(body.all_maps);
          console.log("here");
          console.log(body.all_maps);
          setFilteredDataSource(body.all_maps);
          setMaps(body.all_maps);
          for (let i = 0; i < body.all_maps.length; i++) {
            console.log("hi");
            const func = () => {
              const storage = getStorage();
              const reference = ref(
                storage,
                "/" + body.all_maps[i].id + ".jpg"
              );
              getDownloadURL(reference).then((x) => {
                images.push(x);
                console.log(x);
              });
            };
            func();
          }
          setM(true);
        });
      } else {
        console.log(res);
      }
    });
  }, []);

  return (
    <View>
      <SearchBar
        placeholder="Search"
        onChangeText={(text) => {
          searchFilterFunction(text);
        }}
        defaultValue={search}
        platform="android"
      />
      <ScrollView
        style={styles.mainContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text></Text>
        {m &&
          filteredDataSource.map((map, i) => (
            <>
              <Card style={StyleSheet.container}>
                <Card.Content>
                  <Title>{map.name}</Title>
                </Card.Content>
                <Card.Cover
                  source={{
                    // uri: "https://developers.google.com/static/maps/images/landing/hero_maps_static_api.png",
                    // uri : "6lWz7yJups9EzPeC7gLh.jpg"
                    uri: images[i],
                  }}
                />
                <Card.Actions>
                  <Button
                    onPress={() => navigation.navigate("Map", { id: map.id })}
                  >
                    OPEN
                  </Button>
                  {is_admin && (
                    <Button
                      onPress={() =>
                        navigation.navigate("Edit", { id: map.id })
                      }
                    >
                      EDIT
                    </Button>
                  )}
                  {is_admin && (
                    <IconButton
                      // iconColor="red"
                      icon="delete"
                      size={25}
                      onPress={() => {
                        handleAlert(map.id);
                      }}
                    />
                  )}
                  <IconButton
                    // iconColor="red"
                    icon="bookmark"
                    size={25}
                    onPress={() => {
                      handlesave(map.id);
                    }}
                  />
                </Card.Actions>
              </Card>
              <Text></Text>
            </>
          ))}
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </ScrollView>
    </View>
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
    // fontFamily: "Roboto",
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

export default Allmaps;
