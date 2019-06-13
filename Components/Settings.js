import React, { Component } from 'react';
import {
  ScrollView, Text, StyleSheet, View, Switch,
} from 'react-native';
import _ from 'lodash';
import RNPickerSelect from 'react-native-picker-select';
import { Divider } from 'react-native-elements';
import PushNotification from 'react-native-push-notification';
import { storeSettings, storeOfflineData } from '../DB/DB';
import sort from '../Sortings/Sorting';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    backgroundColor: '#efefef',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
    opacity: 0.8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#dadada',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const sorts = [
  {
    label: 'Par nom',
    value: 'Nom',
  },
  {
    label: 'Par quantité',
    value: 'Quantité',
  },
];

const times = [
  {
    label: '1 jour avant',
    value: 86400,
    string: '1 jour',
  },
  {
    label: '2 jours avant',
    value: 172800,
    string: '2 jours',
  },
  {
    label: '3 jours avant',
    value: 259200,
    string: '3 jours',
  },
  {
    label: '1 semaine avant',
    value: 604800,
    string: '1 semaine',
  },
  {
    label: '2 semaines avant',
    value: 1209600,
    string: '2 semaines',
  },
  {
    label: '1 mois avant',
    value: 2629800,
    string: '1 mois',
  },
  {
    label: '3 mois avant',
    value: 7889400,
    string: '3 mois',
  },
];


export default class Settings extends Component {
  constructor(props) {
    super(props);
    const { settingsObject } = this.props.screenProps;
    this.state = {
      foodStockSort: settingsObject.foodStockSort,
      shoppingListSort: settingsObject.shoppingListSort,
      firstRemindTime: settingsObject.firstRemindTime,
      secondRemindTime: settingsObject.secondRemindTime,
      thirdRemindTime: settingsObject.thirdRemindTime,
      isNotificationEnabled: settingsObject.isNotificationEnabled,
    };
  }

  render() {
    const placeholder = {
      label: 'Selectionner une valeur',
      value: null,
      color: '#9EA0A4',
    };
    console.log(`je passe state ${this.state.firstRemindTime}`);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Configuration des triages des listes</Text>
        </View>
        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 16 }}>Stock de nourriture</Text>
          <RNPickerSelect
            placeholder={{}}
            items={sorts}
            onValueChange={(value, index) => {
              this.setState({
                foodStockSort: value,
              });
              const { screenProps } = this.props;
              const settingsTemp = _.cloneDeep(screenProps.settingsObject);
              const foodListTemp = _.cloneDeep(screenProps.foodList);
              settingsTemp.foodStockSort = value;
              // Put an ID to call the right fonction to sort the data
              settingsTemp.idFoodStockSort = index;

              const sortedFoodListTemp = sort(foodListTemp, index);
              screenProps.updateFoodList(sortedFoodListTemp);
              storeOfflineData('foodList', sortedFoodListTemp);

              screenProps.updateSettingsObject(settingsTemp);
              storeSettings(settingsTemp);
            }}
            style={pickerSelectStyles}
            value={this.state.foodStockSort}
          />
        </View>
        <Divider />
        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 16 }}>Liste de courses</Text>
          <RNPickerSelect
            placeholder={{}}
            items={sorts}
            onValueChange={(value, index) => {
              this.setState({
                shoppingListSort: value,
              });

              const { screenProps } = this.props;
              const settingsTemp = _.cloneDeep(screenProps.settingsObject);
              const shoppingListTemp = _.cloneDeep(screenProps.shoppingList);
              settingsTemp.shoppingListSort = value;
              // Put an ID to call the right fonction to sort the data
              settingsTemp.idShoppingListSort = index;

              const sortedShoppingListTemp = sort(shoppingListTemp, index);
              screenProps.updateShoppingList(sortedShoppingListTemp);
              storeOfflineData('shoppingList', sortedShoppingListTemp);

              screenProps.updateSettingsObject(settingsTemp);
              storeSettings(settingsTemp);
            }}
            style={pickerSelectStyles}
            value={this.state.shoppingListSort}
          />
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Notifications</Text>
        </View>
        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 25 }}>
          <View style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 25,
          }}
          >
            <Text style={{ fontSize: 16 }}>Autoriser les notifications</Text>
            <Switch
              onValueChange={(value) => {
                this.setState({ isNotificationEnabled: value });
                const { screenProps } = this.props;
                const settingsTemp = _.cloneDeep(screenProps.settingsObject);
                settingsTemp.isNotificationEnabled = value;
                screenProps.updateSettingsObject(settingsTemp);
                storeSettings(settingsTemp);

                if (value) {
                  screenProps.foodList.forEach((food) => {
                    if (food.expirationDate && new Date(food.expirationDate).getTime() > Date.now()) {
                      if (settingsTemp.firstRemindTime !== null && settingsTemp.firstRemindTime !== undefined) {
                        PushNotification.localNotificationSchedule({
                          /* Android Only Properties */
                          id: `${food.barcode.slice(5, 13)}1`, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                          autoCancel: true, // (optional) default: true
                          largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
                          smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
                          bigText: `Attention, votre aliment ${food.name} sera périmé dans ${settingsTemp.firstRemindTimeString}`, // (optional) default: "message" prop
                          vibrate: true, // (optional) default: true
                          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                          ongoing: false, // (optional) set whether this is an "ongoing" notification
                          priority: 'high', // (optional) set notification priority, default: high
                          visibility: 'private', // (optional) set notification visibility, default: private
                          importance: 'high', // (optional) set notification importance, default: high

                          /* iOS and Android properties */
                          title: 'Avertissement de péremption', // (optional)
                          message: `Attention, votre aliment ${food.name} sera périmé dans ${settingsTemp.firstRemindTimeString}`, // (optional) default: "message" prop
                          playSound: true, // (optional) default: true
                          soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                          number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
                          date: new Date(new Date(food.expirationDate).getTime() - (settingsTemp.firstRemindTime * 1000)), // in 60 secs
                        });
                      }

                      if (settingsTemp.secondRemindTime !== null && settingsTemp.secondRemindTime !== undefined) {
                        PushNotification.localNotificationSchedule({
                          /* Android Only Properties */
                          id: `${food.barcode.slice(5, 13)}2`, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                          autoCancel: true, // (optional) default: true
                          largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
                          smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
                          bigText: `Attention, votre aliment ${food.name} sera périmé dans ${settingsTemp.secondRemindTimeString}`, // (optional) default: "message" prop
                          vibrate: true, // (optional) default: true
                          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                          ongoing: false, // (optional) set whether this is an "ongoing" notification
                          priority: 'high', // (optional) set notification priority, default: high
                          visibility: 'private', // (optional) set notification visibility, default: private
                          importance: 'high', // (optional) set notification importance, default: high

                          /* iOS and Android properties */
                          title: 'Avertissement de péremption', // (optional)
                          message: `Attention, votre aliment ${food.name} sera périmé dans ${settingsTemp.secondRemindTimeString}`, // (optional) default: "message" prop
                          playSound: true, // (optional) default: true
                          soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                          number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
                          date: new Date(new Date(food.expirationDate).getTime() - (settingsTemp.secondRemindTime * 1000)), // in 60 secs
                        });
                      }

                      if (settingsTemp.thirdRemindTime !== null && settingsTemp.thirdRemindTime !== undefined) {
                        PushNotification.localNotificationSchedule({
                          /* Android Only Properties */
                          id: `${food.barcode.slice(5, 13)}3`, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                          autoCancel: true, // (optional) default: true
                          largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
                          smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
                          bigText: `Attention, votre aliment ${food.name} sera périmé dans ${settingsTemp.thirdRemindTimeString}`, // (optional) default: "message" prop
                          vibrate: true, // (optional) default: true
                          vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                          ongoing: false, // (optional) set whether this is an "ongoing" notification
                          priority: 'high', // (optional) set notification priority, default: high
                          visibility: 'private', // (optional) set notification visibility, default: private
                          importance: 'high', // (optional) set notification importance, default: high

                          /* iOS and Android properties */
                          title: 'Avertissement de péremption', // (optional)
                          message: `Attention, votre aliment ${food.name} sera périmé dans ${settingsTemp.thirdRemindTimeString}`, // (optional) default: "message" prop
                          playSound: true, // (optional) default: true
                          soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                          number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
                          date: new Date(new Date(food.expirationDate).getTime() - (settingsTemp.thirdRemindTime * 1000)), // in 60 secs
                        });
                      }
                    }
                  });
                } else {
                  PushNotification.cancelAllLocalNotifications();
                }
              }}
              value={this.state.isNotificationEnabled}
            />
          </View>
        </View>
        <Divider />

        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
          <Text style={{ fontSize: 16 }}>Rappel date de péremption 1</Text>
          <RNPickerSelect
            disabled={!this.state.isNotificationEnabled}
            placeholder={placeholder}
            items={times}
            onValueChange={(value, index) => {
              this.setState({
                firstRemindTime: value,
              });
              const { screenProps } = this.props;
              const settingsTemp = _.cloneDeep(screenProps.settingsObject);
              settingsTemp.firstRemindTime = value;
              settingsTemp.firstRemindTimeString = times[index - 1] ? times[index - 1].string : null;

              screenProps.updateSettingsObject(settingsTemp);
              storeSettings(settingsTemp);

              screenProps.foodList.forEach((food) => {
                if (food.expirationDate && new Date(food.expirationDate).getTime() > Date.now()) {
                  PushNotification.localNotificationSchedule({
                    /* Android Only Properties */
                    id: `${food.barcode.slice(5, 13)}1`, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                    autoCancel: true, // (optional) default: true
                    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
                    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
                    bigText: `Attention, votre aliment ${food.name} sera périmé dans ${settingsTemp.firstRemindTimeString}`, // (optional) default: "message" prop
                    vibrate: true, // (optional) default: true
                    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                    ongoing: false, // (optional) set whether this is an "ongoing" notification
                    priority: 'high', // (optional) set notification priority, default: high
                    visibility: 'private', // (optional) set notification visibility, default: private
                    importance: 'high', // (optional) set notification importance, default: high

                    /* iOS and Android properties */
                    title: 'Avertissement de péremption', // (optional)
                    message: `Attention, votre aliment ${food.name} sera périmé dans ${settingsTemp.firstRemindTimeString}`, // (optional) default: "message" prop
                    playSound: true, // (optional) default: true
                    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                    number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
                    date: new Date(new Date(food.expirationDate).getTime() - (settingsTemp.firstRemindTime * 1000)), // in 60 secs
                  });
                }
              });
            }}
            style={pickerSelectStyles}
            value={this.state.firstRemindTime}
          />
        </View>
        <Divider />
        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>

          <Text style={{ fontSize: 16 }}>Rappel date de péremption 2</Text>
          <RNPickerSelect
            disabled={!this.state.isNotificationEnabled}
            placeholder={placeholder}
            items={times}
            onValueChange={(value, index) => {
              this.setState({
                secondRemindTime: value,
              });
              const { screenProps } = this.props;
              const settingsTemp = _.cloneDeep(screenProps.settingsObject);
              settingsTemp.secondRemindTime = value;
              settingsTemp.secondRemindTimeString = times[index - 1] ? times[index - 1].string : null;

              screenProps.updateSettingsObject(settingsTemp);
              storeSettings(settingsTemp);

              screenProps.foodList.forEach((food) => {
                if (food.expirationDate && new Date(food.expirationDate).getTime() > Date.now()) {
                  PushNotification.localNotificationSchedule({
                    /* Android Only Properties */
                    id: `${food.barcode.slice(5, 13)}2`, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                    autoCancel: true, // (optional) default: true
                    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
                    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
                    bigText: `Attention, votre aliment ${food.name} sera périmé dans ${settingsTemp.secondRemindTimeString}`, // (optional) default: "message" prop
                    vibrate: true, // (optional) default: true
                    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                    ongoing: false, // (optional) set whether this is an "ongoing" notification
                    priority: 'high', // (optional) set notification priority, default: high
                    visibility: 'private', // (optional) set notification visibility, default: private
                    importance: 'high', // (optional) set notification importance, default: high

                    /* iOS and Android properties */
                    title: 'Avertissement de péremption', // (optional)
                    message: `Attention, votre aliment ${food.name} sera périmé dans ${settingsTemp.secondRemindTimeString}`, // (optional) default: "message" prop
                    playSound: true, // (optional) default: true
                    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                    number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
                    date: new Date(new Date(food.expirationDate).getTime() - (settingsTemp.secondRemindTime * 1000)), // in 60 secs
                  });
                }
              });
            }}
            style={pickerSelectStyles}
            value={this.state.secondRemindTime}
          />
        </View>
        <Divider />
        <View style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>

          <Text style={{ fontSize: 16 }}>Rappel date de péremption 3</Text>
          <RNPickerSelect
            disabled={!this.state.isNotificationEnabled}
            placeholder={placeholder}
            items={times}
            onValueChange={(value, index) => {
              this.setState({
                thirdRemindTime: value,
              });
              const { screenProps } = this.props;
              const settingsTemp = _.cloneDeep(screenProps.settingsObject);
              settingsTemp.thirdRemindTime = value;
              settingsTemp.thirdRemindTimeString = times[index - 1] ? times[index - 1].string : null;

              screenProps.updateSettingsObject(settingsTemp);
              storeSettings(settingsTemp);

              screenProps.foodList.forEach((food) => {
                if (food.expirationDate && new Date(food.expirationDate).getTime() > Date.now()) {
                  PushNotification.localNotificationSchedule({
                    /* Android Only Properties */
                    id: `${food.barcode.slice(5, 13)}3`, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
                    autoCancel: true, // (optional) default: true
                    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
                    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
                    bigText: `Attention, votre aliment ${food.name} sera périmé dans ${settingsTemp.thirdRemindTimeString}`, // (optional) default: "message" prop
                    vibrate: true, // (optional) default: true
                    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
                    ongoing: false, // (optional) set whether this is an "ongoing" notification
                    priority: 'high', // (optional) set notification priority, default: high
                    visibility: 'private', // (optional) set notification visibility, default: private
                    importance: 'high', // (optional) set notification importance, default: high

                    /* iOS and Android properties */
                    title: 'Avertissement de péremption', // (optional)
                    message: `Attention, votre aliment ${food.name} sera périmé dans ${settingsTemp.thirdRemindTimeString}`, // (optional) default: "message" prop
                    playSound: true, // (optional) default: true
                    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
                    number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
                    date: new Date(new Date(food.expirationDate).getTime() - (settingsTemp.thirdRemindTime * 1000)), // in 60 secs
                  });
                }
              });
            }}
            style={pickerSelectStyles}
            value={this.state.thirdRemindTime}
          />
        </View>
      </ScrollView>
    );
  }
}
