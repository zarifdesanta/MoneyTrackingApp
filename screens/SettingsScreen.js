import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Appbar,
  Button,
  MD3Colors,
  PaperProvider,
  Text,
  TextInput,
} from "react-native-paper";

import { useRoute } from "@react-navigation/native";

import { setData, getData } from "../helper/SaveLoad";

export default function SettingsScreen({ navigation }) {
  const [limit, setLimit] = useState(100);

  const handleSetLimit = (text) => {
    setData("limit", Number(text));
    setLimit(Number(text));
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
              onPress={() => console.log("Showing History")}
            >
              Show History
            </Button>
          </View>
        </ScrollView>
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
