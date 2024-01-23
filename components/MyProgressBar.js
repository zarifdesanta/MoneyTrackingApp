import { View, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import {
  Modal,
  Portal,
  ProgressBar,
  Text,
  Button,
  PaperProvider,
} from "react-native-paper";

export default function MyProgressBar({ progress }) {
  const changeColor = () => {
    if (progress === 1) {
      return "orange";
    } else if (progress > 1) {
      return "red";
    } else {
      return "green";
    }
  };

  var [update, setUpdate] = useState();

  const giveWarning = () => {
    Alert.alert("Stop wasting your money bruh");
  };

  return (
    <ProgressBar
      progress={progress}
      color={changeColor()}
      style={styles.progressBar}
    ></ProgressBar>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  progressBar: {
    width: 350,
    height: 10,
    borderRadius: 20,
    margin: 10,
  },
});
