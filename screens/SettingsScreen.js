import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import {
  Appbar,
  MD3Colors,
  PaperProvider,
  ProgressBar,
  Text,
  TextInput,
} from "react-native-paper";

export default function SettingsScreen() {
  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Settings"></Appbar.Content>
      </Appbar.Header>
      <View style={styles.container}>
        <Text>Progress</Text>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          <ProgressBar
            progress={0.3}
            color="green"
            style={styles.progressBar}
          ></ProgressBar>
          <TextInput
            mode="outlined"
            label="Limit"
            keyboardType="numeric"
            style={styles.inputItem}
            outlineStyle={{ borderRadius: 30 }}
            right={<TextInput.Icon icon="currency-bdt" />}
            onChangeText={(text) => console.log(text)}
          ></TextInput>
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
  },
  fab: {
    position: "absolute",
    margin: 16,
    bottom: 0,
    right: 0,
  },
  modal: {
    alignSelf: "center",
    backgroundColor: "white",
    height: "auto",
    width: 350,
    borderRadius: 20,
    padding: 20,
  },
  modalButton: {
    alignSelf: "center",

    width: "40%",
    margin: 7,
  },
  inputItem: {
    flex: 1,
    width: "95%",
    backgroundColor: "#eaddff",
    marginTop: 0,
    padding: 0,
  },
  progressBar: {
    width: 350,
    height: 10,
    borderRadius: 20,
    margin: 10,
  },
});
