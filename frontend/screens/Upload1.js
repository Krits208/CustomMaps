import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

// import client from '../api/client';

const url = " https://dass-team-26-backend.onrender.com";

const Upload = ({ navigation }) => {
  // const [profileImage, setProfileImage] = useState("");
  // const [progress, setProgress] = useState(0);
  // //const { token } = props.route.params;

  // const openImageLibrary = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  //   if (status !== "granted") {
  //     alert("Sorry, we need camera roll permissions to make this work!");
  //   }

  //   if (status === "granted") {
  //     const response = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       allowsEditing: true,
  //     });

  //     // setProfileImage(response.uri);
  //     if (!response.cancelled) {
  //       setProfileImage(response.uri);
  //       console.log(response.uri);
  //     }
  //   }
  // };

  // const uploadProfileImage = () => {
  //   const formData = new FormData();
  //   formData.append("image", {
  //     name: new Date() + "_profile",
  //     uri: profileImage,
  //     type: "image/jpg",
  //   });

  //   fetch(url + "/upload-image", {
  //     method: "POST",
  //     // headers: {
  //     //   Accept: "application/json",
  //     //   "Content-Type": "multipart/form-data",
  //     // },
  //     body: formData,
  //   }).then((res) => {
  //     console.log(profileImage);
  //     // navigation.navigate("MapDef", { uri: profileImage });
  //   });

  // console.log(profileImage);

  // try {
  //   const res = await client.post('/upload-profile', formData, {
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'multipart/form-data',
  //       authorization: `JWT ${token}`,
  //     },
  //   });

  //   if (res.data.success) {
  //     props.navigation.dispatch(StackActions.replace('UserProfile'));
  //   }
  // } catch (error) {
  //   console.log(error.message);
  // }
  // };

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required");
      return;
    }

    const image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!image.cancelled) {
      // send the image to the server
      const formData = new FormData();
      formData.append("image", {
        uri: image.uri,
        type: "image/jpg",
        name: "image.jpg",
      });
      navigation.navigate("Navbar", { uri: image.uri, screen: "MapDef" });

      // fetch(url + "/upload-image", {
      //   method: "POST",
      //   body: formData,
      //   // headers: {
      //   //   Accept: "application/json",
      //   //   "Content-Type": "multipart/form-data",
      //   // },
      // })
      //   .then((response) => response.json())
      //   .then((result) => {
      //     console.log("Success:", result);
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //   });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          onPress={handleImageUpload}
          style={styles.uploadBtnContainer}
        >
          <Text style={styles.uploadBtn}>Upload Profile Image</Text>
          {/* {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <Text style={styles.uploadBtn}>Upload Profile Image</Text>
          )} */}
        </TouchableOpacity>
        {/* <Text style={styles.skip}>Skip</Text>
        {profileImage ? (
          <Text
            onPress={handleImageUpload}
            style={[
              styles.skip,
              { backgroundColor: "green", color: "white", borderRadius: 8 },
            ]}
          >
            Upload
          </Text>
        ) : null} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 125 / 2,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
  },
  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
  },
  skip: {
    textAlign: "center",
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    opacity: 0.5,
  },
});

export default Upload;
