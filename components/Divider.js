import { View, StyleSheet } from "react-native";
import React from "react";

export default function Divider() {
  return <View style={styles.line}></View>;
}

const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 1,
    backgroundColor: "#49454f",
    alignItems: "center",
    margin: 0,
    marginTop: 7,
    opacity: 0.3,
    elevation: 5,
  },
});
