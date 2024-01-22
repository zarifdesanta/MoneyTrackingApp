import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
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
  Tooltip,
  useTheme,
} from "react-native-paper";
import MyProgressBar from "../components/MyProgressBar";
import Divider from "../components/Divider";
import MyModal from "../components/MyModal";
import { maxLimit } from "./SettingsScreen";

var curTotalDailyCost = 0;

export default function HomeScreen() {
  //add modal
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  //delete modal
  const [delModVisible, setDelModVisible] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const showDeleteModal = (id) => {
    setDeleteId(id);
    setDelModVisible(true);
  };
  const hideDeleteModal = () => setDelModVisible(false);

  //warning modal
  const [warningVisible, setWarningVisible] = useState(false);
  const showWarningModal = () => setWarningVisible(true);
  const hideWarningModal = () => setWarningVisible(false);

  //new day modal
  const [newDayVisible, setNewDayVisible] = useState(false);
  const showNewDayModal = () => setNewDayVisible(true);
  const hideNewDayModal = () => setNewDayVisible(false);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  const [totalDailyCost, setTotalDailyCost] = useState(0);

  const [dailyList, setDailyList] = useState([]);
  const [dailyDeleteList, setDailyDeleteList] = useState([]);

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

    if (totalDailyCost > maxLimit) {
      showWarningModal();
    }

    hideModal();
  };

  const deleteItem = (id) => {
    curTotalDailyCost -= Number(dailyList[id].price);
    setTotalDailyCost(curTotalDailyCost);

    dailyDeleteList.push(dailyList[id]);
    setDailyDeleteList(dailyDeleteList);

    dailyList.splice(id, 1);
    setDailyList(dailyList);

    hideDeleteModal();
  };

  const getProgressValue = () => {
    let tmp = totalDailyCost / maxLimit;
    return tmp;
  };

  const newDay = () => {
    //store previous day's data, at least totalcost

    setDailyList([]);
    setDailyDeleteList([]);
    setTotalDailyCost(0);
    curTotalDailyCost = 0;

    hideNewDayModal();
  };

  const theme = useTheme();

  return (
    <PaperProvider>
      <Appbar.Header mode="small" elevated={true}>
        <Appbar.Content title="Home"></Appbar.Content>
        <Appbar.Action
          icon="chart-box-plus-outline"
          onPress={showNewDayModal}
        ></Appbar.Action>
      </Appbar.Header>

      <View style={styles.container}>
        <Text>Daily Expenses</Text>

        <MyProgressBar progress={getProgressValue()}></MyProgressBar>

        {/**Total cost */}
        <View style={styles.totalItem}>
          <Text>Total</Text>
          <Text>
            {totalDailyCost}
            <Icon name="currency-bdt" size={16}></Icon>
          </Text>
        </View>

        <Divider></Divider>

        <ScrollView
          style={{ flex: 1, paddingTop: 7 }}
          contentContainerStyle={{
            alignItems: "center",
          }}
        >
          {dailyList.map((item, id) => {
            return (
              <TouchableOpacity
                key={id}
                style={styles.item}
                onLongPress={() => showDeleteModal(id)}
              >
                <Text>{item.title}</Text>
                <Text>
                  {item.price}
                  <Icon name="currency-bdt" size={16}></Icon>
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <FAB icon="plus" style={styles.fab} onPress={() => showModal()}></FAB>

        {/**New Day Modal */}
        <MyModal
          visible={newDayVisible}
          onDismiss={hideNewDayModal}
          text="Wanna start a new day?"
          buttonText="Start"
          buttonIcon="delete"
          onPress={newDay}
        ></MyModal>

        {/**Warning Modal */}
        <MyModal
          visible={warningVisible}
          onDismiss={hideWarningModal}
          text="Stop wasting money bruh!"
          buttonText="Gotchu"
          buttonIcon="delete"
          onPress={hideWarningModal}
        ></MyModal>

        {/**Delete Modal */}
        <MyModal
          visible={delModVisible}
          onDismiss={hideDeleteModal}
          text="Wanna save some money on"
          buttonText="Delete"
          buttonIcon="delete"
          onPress={deleteItem}
          id={deleteId}
        ></MyModal>

        {/**Add modal */}
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            <TextInput
              label="Title"
              mode="outlined"
              onChangeText={(title) => setTitle(title)}
              multiline={true}
            ></TextInput>
            <TextInput
              label="Price"
              mode="outlined"
              keyboardType="numeric"
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
    paddingTop: 7,
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
    width: "90%",
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
    alignItems: "center",
    width: "95%",
    height: 40,
    backgroundColor: "#eaddff",
    marginTop: 5,
    marginBottom: 10,
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
    elevation: 5,
  },
  totalItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
  },
});
