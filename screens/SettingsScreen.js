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

import { setData, getData } from "../helper/SaveLoad";

export default function SettingsScreen() {
  const [limit, setLimit] = useState(100);

  const handleSetLimit = (text) => {
    //maxLimit = text;
    setData("limit", Number(text));
    setLimit(text);
  };

  useEffect(() => {
    async function getEverything() {
      setLimit(await getData("limit"));
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
          <View style={styles.buttonRow}>
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
    flex: 1,
    width: 350,
    backgroundColor: "#eaddff",
    marginTop: 0,
    padding: 0,
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    width: 350,
    alignItems: "center",
  },
  button: {
    width: "50%",
    marginTop: 10,
    marginBottom: 10,
  },
});
