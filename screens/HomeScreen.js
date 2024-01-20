import { View, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import React from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  FAB,
  Text,
  Modal,
  Portal,
  PaperProvider,
  TextInput,
  Button,
  Appbar,
} from "react-native-paper";

var curTotalDailyCost = 0;

export default function HomeScreen() {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  const [totalDailyCost, setTotalDailyCost] = useState(0);

  const [dailyList, setDailyList] = useState([]);

  const addItem = () => {
    const itemObj = {
      title: title,
      price: price,
    };

    dailyList.push(itemObj);
    setDailyList(dailyList);

    if (curTotalDailyCost == 0) {
      curTotalDailyCost = Number(price);
    } else {
      curTotalDailyCost += Number(price);
    }

    setTotalDailyCost(curTotalDailyCost);

    setTitle("");
    setPrice(0);

    hideModal();
  };

  return (
    <PaperProvider>
      <Appbar.Header>
        <Appbar.Content title="Home"></Appbar.Content>
      </Appbar.Header>
      <View style={styles.container}>
        <Text>Daily Expenses</Text>
        <ScrollView
          style={{ flex: 1, margin: 5 }}
          contentContainerStyle={{ alignItems: "center" }}
        >
          {dailyList.map((item, key) => {
            return (
              <View style={styles.item}>
                <Text>{item.title}</Text>
                <Text>
                  {item.price}
                  <Icon name="currency-bdt" size={16}></Icon>
                </Text>
              </View>
            );
          })}

          <View
            style={[
              styles.item,
              {
                borderWidth: 1,
                borderColor: "#49454f",
              },
            ]}
          >
            <Text>Total</Text>
            <Text>
              {totalDailyCost}
              <Icon name="currency-bdt" size={16}></Icon>
            </Text>
          </View>
        </ScrollView>

        <FAB icon="plus" style={styles.fab} onPress={() => showModal()}></FAB>

        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            <TextInput
              label="Title"
              mode="outlined"
              value={title}
              onChangeText={(title) => setTitle(title)}
              multiline={true}
            ></TextInput>
            <TextInput
              label="Price"
              mode="outlined"
              keyboardType="numeric"
              value={price}
              onChangeText={(price) => setPrice(price)}
              right={<TextInput.Icon icon="currency-bdt" />}
            ></TextInput>
            <Button
              icon="plus"
              mode="elevated"
              style={styles.modalButton}
              onPress={() => addItem()}
            >
              Add
            </Button>
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
  item: {
    flex: 1,
    flexDirection: "row",
    width: "95%",
    height: "100%",
    backgroundColor: "#eaddff",
    margin: 7,
    justifyContent: "space-between",
    padding: 10,
    borderRadius: 20,
    elevation: 10,
  },
});
