import React, { Component } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import Toast from 'react-native-simple-toast';
import _ from 'lodash';
import { storeData } from '../DB/DB';

export default class MyFoods extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    // Edit button is useless if there is no food
    if (params.foodList !== undefined && params.foodList.length > 0) {
      return {
        headerRight:
  <Icon
    containerStyle={{ marginRight: 15 }}
    name="pencil-outline"
    color="#517fa4"
    type="material-community"
    size={28}
    onPress={() => params.handleThis()}
  />,
      };
    }
    return <View />;
  };


  constructor(props) {
    super(props);
    this.state = {
      isRemoveDialogVisible: false,
      isAddDialogVisible: false,
      isEditIconsVisible: false,
    };
    this.foodListItem = {};
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleThis: this.handleEditIcons,
      foodList: this.props.screenProps.foodList,
    });
  }


  sendInput = (inputText, operation) => {
    const inputNumber = parseInt(inputText, 10);

    // Check if inputText is a valid number
    if (!Number.isNaN(inputNumber) && inputNumber >= 1 && inputNumber <= 20) {
      const { screenProps } = this.props;
      let foodName = '';
      foodName = this.foodListItem.name !== undefined ? this.foodListItem.name : '';
      const foodListTemp = screenProps.foodList;
      const foodListItemIndex = _.findIndex(screenProps.foodList, foodListItem => foodListItem.barcode === this.foodListItem.barcode);

      let quantity = parseInt(foodListTemp[foodListItemIndex].quantity, 10);

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

  handleEditIcons = () => {
    if (this.state.isEditIconsVisible) {
      this.setState({
        isEditIconsVisible: false,
      });
    } else {
      this.setState({
        isEditIconsVisible: true,
      });
    }
  }

  render() {
    const { screenProps, navigation } = this.props;
    return (
      <View>
        <ScrollView>
          {
          screenProps.foodList.map(item => (
            <ListItem
              key={item.barcode}
              title={item.name}
              titleStyle={{ fontSize: 20 }}
              leftAvatar={{
                source: { uri: item.imageFront },
                size: 'large',
                rounded: false,
                avatarStyle: { borderRadius: 20 },
                overlayContainerStyle: { backgroundColor: 'transparent' },
              }}
              subtitle={item.barcode}
              subtitleStyle={{ marginTop: 10 }}
              chevron
              bottomDivider
              rightIcon={(
                <View>
                  {this.state.isEditIconsVisible
                    ? (
                      <View>
                        <Icon
                          reverse
                          name="delete"
                          type="material-community"
                          color="#517fa4"
                          size={16}
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
                                    let foodName = '';
                                    foodName = item.product_name_fr !== undefined ? item.product_name_fr : '';
                                    const foodListTemp = screenProps.foodList;
                                    const foodListItemIndex = _.findIndex(screenProps.foodList, foodListItem => foodListItem.barcode === item.barcode);
                                    foodListTemp.splice(foodListItemIndex, 1);
                                    screenProps.updateFoodList(foodListTemp);
                                    storeData('foodList', foodListTemp);
                                    Toast.show(`Le produit ${foodName} a bien été supprimée`);
                                  },
                                },
                              ],
                              { cancelable: true },
                            );
                          }}
                        />
                        <Icon
                          reverse
                          name="minus"
                          type="material-community"
                          color="#517fa4"
                          size={16}
                          onPress={() => {
                            this.foodListItem = item;
                            this.setState({ isRemoveDialogVisible: true });
                          }}
                        />
                        <Icon
                          reverse
                          name="plus"
                          type="material-community"
                          color="#517fa4"
                          size={16}
                          onPress={() => {
                            this.foodListItem = item;
                            this.setState({ isAddDialogVisible: true });
                          }}
                        />
                      </View>
                    )
                    : <View />

                 }

                </View>
              )}
              badge={{ value: `x ${item.quantity}`, badgeStyle: { backgroundColor: '#517fa4', height: 25 }, textStyle: { fontSize: 18 } }}

              onPress={() => navigation.navigate('FoodDetails', { barcode: item.barcode })}
            />
          ))
        }
        </ScrollView>
        {/*            TODO REWORK
           A bug appear when DialoInput is into the ScrollView component */}
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
