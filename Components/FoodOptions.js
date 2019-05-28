import React, { Component } from 'react';
import {
  View, Text, Modal, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Alert,
} from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import ImageViewer from 'react-native-image-zoom-viewer';
import _ from 'lodash';
import Toast from 'react-native-simple-toast';
import DialogInput from 'react-native-dialog-input';
import DatePicker from 'react-native-datepicker';
import { storeData } from '../DB/DB';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);


const styles = StyleSheet.create({
  image: {
    width: screenWidth / 3,
    height: screenWidth / 3,
    resizeMode: 'contain',
    marginTop: 3,
    marginBottom: 3,
  },
  viewContainer: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 22,
    flexWrap: 'wrap',
    paddingRight: 5,
    textAlign: 'center',
  },
  extraText: {
    fontStyle: 'italic',
    fontSize: 16,
    textAlign: 'center',
  },
});
export default class FoodOptions extends Component {
  constructor(props) {
    super(props);
    this.food = _.find(this.props.screenProps.foodList, food => food.barcode === this.props.navigation.state.params.barcode);

    this.state = {
      isVisible: false,
      isAddDialogVisible: false,
      isRemoveDialogVisible: false,
      date: this.food.expirationDate,
    };
  }

  sendInput = (inputText, operation) => {
    const inputNumber = parseInt(inputText, 10);

    // Check if inputText is a valid number
    if (!Number.isNaN(inputNumber) && inputNumber >= 1 && inputNumber <= 20) {
      const { screenProps } = this.props;
      let foodName = '';
      foodName = this.food.name !== undefined ? this.food.name : '';
      const foodListTemp = screenProps.foodList;
      const foodListItemIndex = _.findIndex(screenProps.foodList, foodListItem => foodListItem.barcode === this.food.barcode);

      let quantity = parseInt(this.food.quantity, 10);

      if (operation === 'add') {
        quantity += inputNumber;
        foodListTemp[foodListItemIndex].quantity = quantity;
      } else {
        quantity -= inputNumber;
        if (quantity <= 0) {
          // delete the food object of the foodList array
          foodListTemp.splice(foodListItemIndex, 1);
        } else {
          foodListTemp[foodListItemIndex].quantity = quantity;
        }
      }

      screenProps.updateFoodList(foodListTemp);
      this.setState({ isAddDialogVisible: false, isRemoveDialogVisible: false });
      storeData('foodList', foodListTemp);
      Toast.show(`La quantité de ${foodName} a bien été modifée`);
    } else {
      this.setState({ isAddDialogVisible: false, isRemoveDialogVisible: false });
      Toast.show('Vous devez rentrer un entier valide compris entre 1 et 20');
    }
  }

  render() {
    const { screenProps } = this.props;

    return (
      <View>
        <ScrollView>
          <Modal
            visible={this.state.isVisible}
            onRequestClose={() => this.setState({ isVisible: false })}
            animationType="fade"
            transparent
          >
            <ImageViewer imageUrls={[{ url: this.food.imageFront }]} />
          </Modal>
          <View style={[styles.viewContainer, { elevation: 2 }]}>
            <TouchableOpacity
              onPress={() => this.setState({ isVisible: true })}
            >
              <Image
                source={{ uri: this.food.imageFront }}
                style={styles.image}
              />
              <Text style={styles.extraText}>{this.food.barcode}</Text>
            </TouchableOpacity>
            <View style={{ justifyContent: 'center' }}>
              <View style={{ width: screenWidth - screenWidth / 2.8 }}>
                <Text style={styles.titleText}>{this.food.name}</Text>
              </View>

              <View>
                <View style={{ width: screenWidth - screenWidth / 2.8, marginTop: 5 }}>
                  <Text style={styles.extraText}>{this.food.brands}</Text>
                </View>

                <View style={{ width: screenWidth - screenWidth / 2.8, marginTop: 5 }}>
                  <Text style={styles.extraText}>{this.food.productWeight}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.viewContainer, { marginTop: 20 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.titleText}> Quantité: </Text>
              <Badge value={`x ${this.food.quantity} `} badgeStyle={{ backgroundColor: '#517fa4', height: 25 }} textStyle={{ fontSize: 18 }} />
              <View style={{ width: screenWidth / 1.85 }}>
                <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                  <Icon
                    reverse
                    name="playlist-plus"
                    type="material-community"
                    color="#517fa4"
                    size={16}
                    onPress={() => {
                      this.setState({ isAddDialogVisible: true });
                    }}
                  />
                  <Icon
                    reverse
                    name="playlist-minus"
                    type="material-community"
                    color="#517fa4"
                    size={16}
                    onPress={() => {
                      this.setState({ isRemoveDialogVisible: true });
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.viewContainer, { marginTop: 30, alignItems: 'center' }]}>
            <Text style={[styles.titleText, { fontSize: 16 }]}> Date de péremption: </Text>
            <DatePicker
              style={{ width: 195 }}
              date={this.state.date}
              mode="date"
              androidMode="spinner"
              placeholder="Sélection"
              minDate={new Date().toISOString().substring(0, 10)}
              format="YYYY-MM-DD"
              confirmBtnText="Confirmer"
              cancelBtnText="Annuler"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  top: 4,
                  marginRight: 65,
                },
                dateInput: {
                  marginLeft: 1,
                  marginRight: '55%',
                },
              // ... You can check the source to find the other keys.
              }}
              onDateChange={(date) => {
                this.setState({ date });
                const foodListItemIndex = _.findIndex(screenProps.foodList, foodListItem => foodListItem.barcode === this.food.barcode);
                const foodListTemp = screenProps.foodList;
                foodListTemp[foodListItemIndex].expirationDate = date;
                screenProps.updateFoodList(foodListTemp);
                storeData('foodList', foodListTemp);
              }}
            />
          </View>
          <View style={{ height: screenHeight / 4 }}>
            <Icon
              reverse
              containerStyle={{ position: 'absolute', bottom: 10, right: 10 }}
              name="delete"
              type="material-community"
              color="#517fa4"
              size={18}
              onPress={() => {
                Alert.alert(
                  'Confirmation de suppression',
                  'Voulez-vous supprimer ce produit de votre liste ?',
                  [
                    {
                      text: 'Non',
                      style: 'cancel',
                    },
                    {
                      text: 'Oui',
                      onPress: () => {
                        const foodName = this.food.name !== undefined ? this.food.name : '';
                        const foodListTemp = screenProps.foodList;
                        const foodListItemIndex = _.findIndex(screenProps.foodList, foodListItem => foodListItem.barcode === this.food.barcode);
                        foodListTemp.splice(foodListItemIndex, 1);
                        screenProps.updateFoodList(foodListTemp);
                        storeData('foodList', foodListTemp);
                        Toast.show(`Le produit ${foodName} a bien été supprimée`);
                        this.props.navigation.goBack(null);
                      },
                    },
                  ],
                  { cancelable: true },
                );
              }}
            />
          </View>
        </ScrollView>
        <DialogInput
          isDialogVisible={this.state.isRemoveDialogVisible}
          title="Quantité à supprimer"
          message="Entrer la quantité du produit à supprimer de la liste"
          submitText="Supprimer"
          cancelText="Annuler"
          textInputProps={{ keyboardType: 'numeric' }}
          submitInput={inputText => this.sendInput(inputText, 'delete')}
          closeDialog={() => this.setState({ isRemoveDialogVisible: false })}
        />

        <DialogInput
          isDialogVisible={this.state.isAddDialogVisible}
          title="Quantité à ajouter"
          message="Entrer la quantité du produit à ajouter à la liste"
          submitText="Ajouter"
          cancelText="Annuler"
          textInputProps={{ keyboardType: 'numeric' }}
          submitInput={inputText => this.sendInput(inputText, 'add')}
          closeDialog={() => this.setState({ isAddDialogVisible: false })}
        />
      </View>
    );
  }
}
