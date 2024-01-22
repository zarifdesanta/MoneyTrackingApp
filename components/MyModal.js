import { View, StyleSheet } from "react-native";
import React from "react";
import { Portal, Modal, Text, Button } from "react-native-paper";

export default function MyModal({
  visible,
  onDismiss,
  buttonIcon,
  onPress,
  text,
  buttonText,
  id,
}) {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modal}
      >
        <Text style={{ alignSelf: "center" }}>{text}</Text>
        <Button
          icon={buttonIcon}
          mode="elevated"
          style={styles.modalButton}
          onPress={() => onPress(id)}
        >
          {buttonText}
        </Button>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    alignSelf: "center",
    backgroundColor: "white",
    height: "auto",
    width: "90%",
    borderRadius: 20,
    padding: 20,
  },
  modalButton: {
    alignSelf: "center",

    width: "40%",
    margin: 7,
  },
});
