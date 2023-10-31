import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  RefreshControl,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Dialog from "react-native-dialog";
import { Picker } from "@react-native-picker/picker";
import { IconButton, Colors } from "react-native-paper";

const url = "https://dass-team-26-backend.onrender.com";

const func = async () => {
  const storage = getStorage();
  const reference = ref(storage, "/" + id + ".jpg");
  await getDownloadURL(reference).then((x) => {
    setUrl1(x);
    console.log(x);
  });
};
func();

const MapDef = ({ route, navigation }) => {
  const [name, setName] = useState("");
  const [nodes, setNodes] = useState([]);
  const [node, setNode] = useState("");
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [node1, setNode1] = useState("");
  const [node2, setNode2] = useState("");
  const [path1, setPath1] = useState([]);
  const [path2, setPath2] = useState([]);
  const [edges, setEdges] = useState([]);
  const [dis, setDis] = useState(0);
  const [uri, setUri] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [m, setm] = useState(false);
  const [m1, setm1] = useState(false);
  const onRefresh = React.useCallback(() => {}, []);
  const [nodesCopy, setNodesCopy] = useState(nodes);

  const user = route.params.user;

  // console.log("the uri now is: " + String(uri));
  const showDialog = () => {
    setVisible(true);
  };

  const showDialog1 = () => {
    setVisible1(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleCancel1 = () => {
    setVisible1(false);
  };

  const handleAdd = () => {
    var flag = 0;
    // Add node
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i] === node) {
        flag = 1;
      }
    }

    let newNodes = [...nodes];

    if (!flag) {
      // nodes.push(node);
      newNodes.push(node);
      setNodes(newNodes);
      setNodesCopy(newNodes);
    }

    setNode1(node);

    let newNodes_ = [...newNodes];
    // let numNodes = newNodes.length;
    for (let i = 0; i < newNodes_.length; i++) {
      if (newNodes_[i] === node) {
        newNodes_.splice(i, 1);
        i = -1;
        continue;
      }
      for (let j = 0; j < edges.length; j++) {
        if (
          (edges[j].node1 === newNodes_[i] && edges[j].node2 == node) ||
          (edges[j].node2 === newNodes_[i] && edges[j].node1 == node)
        ) {
          newNodes_.splice(i, 1);
          i = -1;
          break;
        }
      }
    }

    setNodesCopy(newNodes_);
    if (newNodes_.length >= 1) {
      setNode2(newNodes_[0]);
    } else {
      setNode2("");
    }
    console.log(nodes);
    setVisible(false);
  };

  const handleAdd1 = () => {
    // Add path
    // let node2Val = node2;
    console.log("just submitted node1 = " + node1 + " node2 = " + node2);

    var is_added = false;
    for (let index = 0; index < edges.length; index++) {
      if (edges[index].node1 === node1 && edges[index].node2 === node2) {
        is_added = true;
        break;
      }
      if (edges[index].node1 === node2 && edges[index].node2 === node1) {
        is_added = true;
        break;
      }
    }
    console.log(node1);

    if (node2 != "") {
      edges.push({
        desc12: path1,
        desc21: path2,
        node1: node1,
        node2: node2,
        "travel-time": dis,
      });
    }

    let nodesCopy_ = [...nodesCopy];
    for (let i = 0; i < nodesCopy.length; i++) {
      if (nodesCopy_[i] === node2) {
        nodesCopy_.splice(i, 1);

        break;
      }
    }
    setNodesCopy(nodesCopy_);
    if (nodesCopy_.length == 0) {
      setNode2("");
    } else {
      setNode2(nodesCopy_[0]);
    }
    console.log(edges);
    setVisible1(false);
  };

  async function save() {
    const creator_id = user;
    // // code to save the map
    // console.log(formData);
    fetch(url + "/create-map", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        creator_id,
        edges,
        nodes,
      }),
    }).then((res) => {
      if (res.ok) {
        console.log("response was okay!");
        setNode1("");
        setName("");
        setNode("");
        setNode2("");
        setDis("");
        setPath1("");
        setPath2("");
        setNodes([]);
        setEdges([]);
        res.json().then((body) => {
          console.log("uri: " + route.params.uri);
          console.log(body);
          let map_id = body.map_id;
          const formData = new FormData();
          formData.append("image", {
            uri: route.params.uri,
            type: "image/jpg",
            name: "image.jpg",
          });
          fetch(url + "/upload-image", {
            method: "POST",
            body: formData,
            headers: {
              map_id: String(body.map_id),
            },
            // headers: {
            //   Accept: "application/json",
            //   "Content-Type": "multipart/form-data",
            // },
          })
            .then((res) => {
              navigation.navigate("Navbar", { screen: "Allmaps" });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      } else {
        console.log(res);
      }
    });
  }

  return (
    <ScrollView
      style={styles.mainContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.mainContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Name of the map"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <Text></Text>
          <Text></Text>
          <Button title="ADD NODE" onPress={showDialog} />
          <Dialog.Container visible={visible}>
            <Dialog.Title>ADD NODE</Dialog.Title>
            <Dialog.Input
              placeholder="Name"
              onChangeText={(text) => setNode(text)}
            />
            <Dialog.Button label="Cancel" onPress={handleCancel} />
            <Dialog.Button label="ADD" onPress={handleAdd} />
          </Dialog.Container>
          <Text></Text>
          <Button title="ADD PATH" onPress={showDialog1} />
          <Dialog.Container visible={visible1}>
            <Dialog.Title>ADD PATH</Dialog.Title>
            {/* <Dialog.Input
              placeholder="Node1"
              onChangeText={(text) => setNode1(text)}
            /> */}
            <Text>Node 1</Text>
            <Picker
              mode="dropdown"
              selectedValue={node1}
              onValueChange={(itemValue, itemIndex) => {
                setNode1(itemValue);

                let newNodes_ = [...nodes];
                // let numNodes = newNodes_.length;

                for (let i = 0; i < newNodes_.length; i++) {
                  if (newNodes_[i] === itemValue) {
                    newNodes_.splice(i, 1);
                    i = -1;
                    continue;
                  }
                  for (let j = 0; j < edges.length; j++) {
                    if (
                      (edges[j].node1 === newNodes_[i] &&
                        edges[j].node2 === itemValue) ||
                      (edges[j].node2 === newNodes_[i] &&
                        edges[j].node1 === itemValue)
                    ) {
                      newNodes_.splice(i, 1);
                      i = -1;
                      break;
                    }
                  }
                }

                setNodesCopy(newNodes_);
                if (newNodes_.length > 0) {
                  setNode2(newNodes_[0]);
                } else {
                  setNode2("");
                }
                setm(true);
              }}
            >
              {nodes.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
            {/* <Dialog.Input
              placeholder="Node2"
              onChangeText={(text) => setNode2(text)}
            /> */}
            <Text>Node 2</Text>
            <Picker
              mode="dropdown"
              selectedValue={node2}
              onValueChange={(itemValue, itemIndex) => {
                setNode2(itemValue);
              }}
            >
              {nodesCopy.map((item, index) => {
                return <Picker.Item label={item} value={item} key={index} />;
              })}
            </Picker>
            <Dialog.Input
              placeholder="Distance"
              onChangeText={(text) => setDis(text)}
            />
            <Dialog.Input
              placeholder="Path from node1 to node 2"
              onChangeText={(text) => setPath1(text.split(","))}
            />
            <Dialog.Input
              placeholder="Path from node2 to node 1"
              onChangeText={(text) => setPath2(text.split(","))}
            />
            <Dialog.Button label="Cancel" onPress={handleCancel1} />
            <Dialog.Button label="ADD" onPress={handleAdd1} />
          </Dialog.Container>
          <Text></Text>
          <Button
            title="SAVE"
            onPress={() => {
              console.log("save was presssed!");
              save();
            }}
          />
          <Text></Text>
          <Text></Text>
          <Text style={{ fontWeight: "bold" }}>ADDED NODES</Text>
          {nodes.map((n, i) => (
            <View style={{ flexDirection: "row" }}>
              <Text style={{ flex: 1 }}>{n}</Text>
              {/* {setm1(false)} */}
              <IconButton
                iconColor="red"
                icon="close-thick"
                size={15}
                onPress={() => {
                  let newNodes = [...nodes];
                  let deletedNode = newNodes[i];
                  console.log(deletedNode);
                  newNodes.splice(i, 1);
                  setNodes(newNodes);

                  console.log(newNodes);
                  let copyEdges = [...edges];
                  console.log(copyEdges);
                  for (let i = 0; i < copyEdges.length; i++) {
                    if (
                      copyEdges[i].node1 === deletedNode ||
                      copyEdges[i].node2 === deletedNode
                    ) {
                      console.log("about to delete " + copyEdges[i]);
                      copyEdges.splice(i, 1);
                      setEdges(copyEdges);
                      i = -1;
                    }
                  }
                  setm1(!m1);
                }}
              />
            </View>
          ))}

          <Text></Text>
          <Text style={{ fontWeight: "bold" }}>ADDED PATHS</Text>
          {edges.map((e, i) => (
            <View style={{ flexDirection: "row" }}>
              <Text style={{ flex: 1 }}>
                {e.node1} to {e.node2}
              </Text>
              {/* {setm1(false)} */}
              <IconButton
                iconColor="red"
                icon="close-thick"
                size={15}
                onPress={() => {
                  let newEdges = [...edges];
                  newEdges.splice(i, 1);
                  setEdges(newEdges);
                  let newNodes_ = [...nodes];
                  for (let i = 0; i < newNodes_.length; i++) {
                    if (newNodes_[i] === node1) {
                      newNodes_.splice(i, 1);
                      i = -1;
                      continue;
                    }
                    for (let j = 0; j < newEdges.length; j++) {
                      if (
                        (newEdges[j].node1 === newNodes_[i] &&
                          newEdges[j].node2 == node1) ||
                        (newEdges[j].node2 === newNodes_[i] &&
                          newEdges[j].node1 == node1)
                      ) {
                        newNodes_.splice(i, 1);
                        i = -1;
                        break;
                      }
                    }
                  }
                  console.log(
                    "node1 is " + node1 + "and newNodes_ = " + newNodes_
                  );
                  setNodesCopy(newNodes_);
                  setNode2(newNodes_[0]);
                  setm1(!m1);
                }}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignContent: "center",
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

export default MapDef;
