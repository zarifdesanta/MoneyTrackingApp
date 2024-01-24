import AsyncStorage from "@react-native-async-storage/async-storage";

export function setData(key, value) {
  AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function getData(key) {
  const data = await AsyncStorage.getItem(key);
  //console.log(data);
  return JSON.parse(data);
}

export async function clearAllData() {
  await AsyncStorage.clear();
}

export async function removeData(key) {
  await AsyncStorage.removeItem(key);
}
