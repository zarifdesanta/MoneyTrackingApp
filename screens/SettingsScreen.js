import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Appbar,
  Button,
  MD3Colors,
  PaperProvider,
  Text,
  TextInput,
  Portal,
  Modal,
} from "react-native-paper";

import { useRoute } from "@react-navigation/native";

import { setData, getData, clearAllData } from "../helper/SaveLoad";

export default function SettingsScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [limit, setLimit] = useState(100);
  const [historyList, setHistoryList] = useState([]);

  const handleSetLimit = (text) => {
    setData("limit", Number(text));
    setLimit(Number(text));
  };

  const resetAllData = () => {
    clearAllData();
  };

  const showHistory = async () => {
    const getHistoryList = await getData("history");
    if (getHistoryList != null) {
      setHistoryList(getHistoryList);
    } else {
      setHistoryList([]);
    }
    showModal();
    console.log(historyList);
  };

  useEffect(() => {
    async function getEverything() {
      let l = await getData("limit");

      if (l != null) {
        setLimit(l);
      } else {
        setLimit(100);
      }
    }
    getEverything();
  }, []);

  return (
    <PaperProvider>
      <Appbar.Header
        mode="small"
        elevated={true}
        style={{ backgroundColor: "#f3edf6" }}
      >
        <Appbar.Content title="Settings"></Appbar.Content>
      </Appbar.Header>
      <View style={styles.container}>
        <Text></Text>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <View style={styles.row}>
            <TextInput
              mode="outlined"
              label="Limit"
              keyboardType="numeric"
              style={styles.inputItem}
              outlineStyle={{ borderRadius: 30 }}
              right={<TextInput.Icon icon="currency-bdt" />}
              placeholder={limit.toString()}
              onChangeText={(text) => handleSetLimit(text)}
            ></TextInput>
            <Button
              mode="elevated"
              style={styles.button}
              onPress={() => navigation.jumpTo("Home", { lim: limit })}
            >
              Set Limit
            </Button>
          </View>
          <View style={styles.row}>
            <Button
              icon="rotate-left"
              mode="elevated"
              style={styles.button}
              onPress={() => console.log("Resetting Day")}
            >
              Reset Day
            </Button>
            <Button
              icon="rotate-left"
              mode="elevated"
              style={styles.button}
              onPress={() => showHistory()}
            >
              Show History
            </Button>
          </View>
          <View style={styles.row}>
            <Button
              icon="rotate-left"
              mode="elevated"
              style={[styles.button, { width: "90%" }]}
              onPress={() => resetAllData()}
            >
              Delete All Data (Dev)
            </Button>
          </View>
        </ScrollView>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            <ScrollView>
              {historyList.map((item, id) => {
                return (
                  <View style={styles.modalItem} key={id}>
                    <Text>{item.date}</Text>
                    <Text>
                      {item.total}
                      <Icon name="currency-bdt" size={16}></Icon>
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 7,
  },
  modal: {
    alignSelf: "center",
    backgroundColor: "white",
    height: "auto",
    width: "90%",
    borderRadius: 20,
    padding: 20,
  },
  modalItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputItem: {
    margin: 5,
    width: "45%",
    backgroundColor: "#eaddff",
    marginTop: 0,
    padding: 0,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    width: 350,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 5,
    width: "45%",
    marginTop: 10,
    marginBottom: 10,
  },
});
