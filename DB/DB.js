import { AsyncStorage } from 'react-native';

export const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log(`je passe ${error}`);
  }
};

export const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.log(`je passe ${error}`);
  }
  return [];
};
