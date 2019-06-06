import { AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

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

export const getData = key => getOfflineData(key).then(data => getOnlineData(key).then((res) => {
  if ((res !== null)) {
    const offlineData = data;
    let onlineData = res;
    console.log(`je passe onlinedata ${JSON.stringify(onlineData)}`);

    if (onlineData !== null) {
      onlineData = onlineData.map(element => alphabetize(element));
    }

    /*     console.log(`je passe offlinedata ${offlineData.toString()}`);
    console.log(`je passe onlinedata ${JSON.stringify(onlineData)}`); */

    /*       console.log(`je passe comparaison ${JSON.stringify(res)} res ${key}`);
      console.log(`je passe comparaison ${data.toString()} data ${key}`); */

    if (offlineData !== null) {
      if (JSON.stringify(onlineData) !== offlineData.toString()) {
        console.log('je passe c differenttt');
        AsyncStorage.setItem(key, JSON.stringify(onlineData));
      }
    }

    return onlineData;
  }
  return [];
}));
