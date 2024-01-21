import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ProgressBar } from "react-native-paper";

export default function MyProgressBar({ progress }) {
  return (
    <ProgressBar
      progress={progress}
      color="green"
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
