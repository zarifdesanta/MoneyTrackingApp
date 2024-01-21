import { View, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import {
  Appbar,
  MD3Colors,
  PaperProvider,
  Text,
  TextInput,
} from "react-native-paper";

export var maxLimit = 100;

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
          <TextInput
            mode="outlined"
            label="Limit"
            keyboardType="numeric"
            style={styles.inputItem}
            outlineStyle={{ borderRadius: 30 }}
            right={<TextInput.Icon icon="currency-bdt" />}
            placeholder={maxLimit.toString()}
            onChangeText={(text) => (maxLimit = text)}
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
  inputItem: {
    flex: 1,
    width: 350,
    backgroundColor: "#eaddff",
    marginTop: 0,
    padding: 0,
  },
});
