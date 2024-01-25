import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
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

import { setData, getData, clearAllData } from "../helper/SaveLoad";
import { useRoute } from "@react-navigation/native";

var curTotalDailyCost = 0;

export default function HomeScreen({ route, navigation }) {
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

  //title & price of each item
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);

  //total cost
  const [totalDailyCost, setTotalDailyCost] = useState(0);

  //dailylist array
  const [dailyList, setDailyList] = useState([]);
  //daily delete list: currently just updating not showing anywhere
  const [dailyDeleteList, setDailyDeleteList] = useState([]);

  //limit
  const [limit, setLimit] = useState(100);
  const limitFromSettings = useRoute().params?.lim;

  //history array
  const [historyList, setHistoryList] = useState([]);

  const addItem = async () => {
    const itemObj = {
      title: title,
      price: price,
    };

    if (!isNaN(price)) {
      dailyList.push(itemObj);
      setDailyList(dailyList);

      curTotalDailyCost = await getData("cur_total_daily_cost");

      if (curTotalDailyCost == 0) {
        curTotalDailyCost = Number(price);
      } else {
        curTotalDailyCost += Number(price);
      }

      setTotalDailyCost(curTotalDailyCost);

      setData("daily_list", dailyList);
      setData("cur_total_daily_cost", curTotalDailyCost);

      setTitle("");
      setPrice(0);

      if (totalDailyCost > (await getData("limit"))) {
        showWarningModal();
      }
    } else {
      return Alert.alert("Price needs to be a number");
    }

    hideModal();
  };

  const deleteItem = async (id) => {
    curTotalDailyCost = await getData("cur_total_daily_cost");

    curTotalDailyCost -= Number(dailyList[id].price);
    setTotalDailyCost(curTotalDailyCost);

    dailyDeleteList.push(dailyList[id]);
    setDailyDeleteList(dailyDeleteList);

    dailyList.splice(id, 1);
    setDailyList(dailyList);

    setData("daily_list", dailyList);
    setData("cur_total_daily_cost", curTotalDailyCost);

    hideDeleteModal();
  };

  const getProgressValue = () => {
    let tmp = 0;
    if (limitFromSettings == null && limit != null) {
      tmp = totalDailyCost / limit;
    } else if (limitFromSettings != null) {
      tmp = totalDailyCost / limitFromSettings;
    }
    return tmp;
  };

  const newDay = () => {
    var date = new Date().toLocaleDateString();
    let histItem = {
      date: date,
      total: totalDailyCost,
    };
    historyList.push(histItem);
    setHistoryList(historyList);
    setData("history", historyList);

    //store previous day's data, at least totalcost
    setData("daily_list", []);
    setData("cur_total_daily_cost", 0);

    setDailyList([]);
    setDailyDeleteList([]);
    setTotalDailyCost(0);
    curTotalDailyCost = 0;

    hideNewDayModal();
  };

  useEffect(() => {
    async function getEverything() {
      //clearAllData();

      let dl = await getData("daily_list");
      let ctdc = await getData("cur_total_daily_cost");

      if (dl != null) {
        setDailyList(dl);
      } else {
        setDailyList([]);
      }

      if (ctdc != null) {
        setTotalDailyCost(ctdc);
      } else {
        setTotalDailyCost(0);
      }

      let savedL = await getData("limit");

      if (savedL != null) {
        setLimit(savedL);
      } else {
        setLimit(100);
      }
    }

    getEverything();
  }, [limit]);

  const theme = useTheme();

  return (
    <PaperProvider>
      <Appbar.Header
        mode="small"
        elevated={true}
        style={{ backgroundColor: "#f3edf6" }}
      >
        <Appbar.Content title="Home"></Appbar.Content>
        <Appbar.Action
          icon="chart-box-plus-outline"
          onPress={showNewDayModal}
        ></Appbar.Action>

        {/**debug button 
        <Appbar.Action
          icon="rotate-right"
          onPress={() => console.log(historyList)}
        ></Appbar.Action>
        */}
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
          buttonIcon="chart-box-plus-outline"
          onPress={newDay}
        ></MyModal>

        {/**Warning Modal */}
        <MyModal
          visible={warningVisible}
          onDismiss={hideWarningModal}
          text="Stop wasting money bruh!"
          buttonText="Gotchu"
          buttonIcon="hand-okay"
          onPress={hideWarningModal}
        ></MyModal>

        {/**Delete Modal */}
        <MyModal
          visible={delModVisible}
          onDismiss={hideDeleteModal}
          text={
            "Wanna save some money on " +
            (delModVisible ? dailyList[deleteId].title : "")
          }
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
              outlineStyle={{ borderRadius: 20 }}
              onChangeText={(title) => setTitle(title)}
              multiline={true}
            ></TextInput>
            <TextInput
              label="Price"
              mode="outlined"
              outlineStyle={{ borderRadius: 20 }}
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
