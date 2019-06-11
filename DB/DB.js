import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';
import NetInfo from '@react-native-community/netinfo';

const alphabetize = require('alphabetize-object-keys');

const storeOnlineData = async (key, data) => {
  // Get the users ID
  const { uid } = firebase.auth().currentUser;
  // Create a reference
  const ref = firebase.database().ref(`/${key}/users/${uid}`);

  await ref.set(data);
};

const getOnlineData = async (key) => {
  // Get the users ID
  const { uid } = firebase.auth().currentUser;

  // Create a reference
  const ref = firebase.database().ref(`/${key}/users/${uid}`);

  const snapshot = await ref.once('value');
  return snapshot.val();
};

const getOfflineData = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log(`je passe ${error}`);
  }
  return [];
};

export const storeData = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
    storeOnlineData(key, data);
  } catch (error) {
    console.log(`je passe ${error}`);
  }
};

export const getData = key => getOfflineData(key).then(data => NetInfo.isConnected.fetch().then((isConnected) => {
  if (isConnected) {
    return getOnlineData(key).then((res) => {
      const offlineData = data === null ? [] : data;
      let onlineData = res === null ? [] : res;

      onlineData = onlineData.map(element => alphabetize(element));

      if (JSON.stringify(onlineData) !== offlineData.toString()) {
        AsyncStorage.setItem(key, JSON.stringify(onlineData));
      }

      return onlineData;
    });
  }

  return data === null ? [] : JSON.parse(data);
}));


export const storeSettings = async (data) => {
  try {
    await AsyncStorage.setItem('Settings', JSON.stringify(data));
  } catch (error) {
    console.log(`je passe ${error}`);
  }
};

export const getSettings = async () => {
  try {
    const data = await AsyncStorage.getItem('Settings');
    if (data !== null) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.log(`je passe ${error}`);
  }
  return {};
};
