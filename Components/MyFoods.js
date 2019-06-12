import React, { Component } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';
import Toast from 'react-native-simple-toast';
import PushNotification from 'react-native-push-notification';
import _ from 'lodash';
import { storeData } from '../DB/DB';
import sort from '../Sortings/Sorting';

export default class MyFoods extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    // Edit button is useless if there is no food
    if (params.foodList && params.foodList.length > 0) {
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

  componentWillReceiveProps(nextProps) {
    if (this.props.screenProps.foodList !== nextProps.screenProps.foodList) {
      this.props.navigation.setParams({
        foodList: nextProps.screenProps.foodList,
      });
    }
  }

  sendInput = (inputText, operation) => {
    const inputNumber = parseInt(inputText, 10);

    // Check if inputText is a valid number
    if (!Number.isNaN(inputNumber) && inputNumber >= 1 && inputNumber <= 20) {
      const { screenProps } = this.props;
      const foodName = this.foodListItem.name !== undefined ? this.foodListItem.name : '';
      const foodListTemp = _.cloneDeep(screenProps.foodList);
      const foodListItemIndex = _.findIndex(screenProps.foodList, foodListItem => foodListItem.barcode === this.foodListItem.barcode);
      const food = foodListTemp[foodListItemIndex];
      let quantity = parseInt(food.quantity, 10);
      if (operation === 'add') {
        quantity += inputNumber;
        food.quantity = quantity;
      } else {
        quantity -= inputNumber;
        if (quantity <= 0) {
          // delete the food object of the foodList array
          foodListTemp.splice(foodListItemIndex, 1);
          PushNotification.cancelLocalNotifications({ id: `${food.barcode.slice(0, 8)}1` });
          PushNotification.cancelLocalNotifications({ id: `${food.barcode.slice(0, 8)}2` });
        } else {
          food.quantity = quantity;
        }
        // Check if the quantity has reach the limit
        if (quantity <= parseInt(food.minQuantity, 10)) {
          this.addFoodToShoppingList();
        }
      }

      this.setState({ isAddDialogVisible: false, isRemoveDialogVisible: false });
      const sortedFoodListTemp = sort(foodListTemp, screenProps.settingsObject.idFoodStockSort);
      storeData('foodList', sortedFoodListTemp);
      Toast.show(`La quantité de ${foodName} a bien été modifée`);
    } else {
      this.setState({ isAddDialogVisible: false, isRemoveDialogVisible: false });
      Toast.show('Vous devez rentrer un entier valide compris entre 1 et 20');
    }
  }

    addFoodToShoppingList = () => {
      const { screenProps } = this.props;
      const shoppingListTemp = _.cloneDeep(screenProps.shoppingList);
      const shoppingListItemIndex = _.findIndex(screenProps.shoppingList, shoppingListItem => shoppingListItem.barcode === this.foodListItem.barcode);
      // Ignore the adding if there is already the food in the shoppingList
      if (shoppingListItemIndex === -1) {
        // Set the quantity to one by default
        const foodToAdd = this.foodListItem;
        foodToAdd.quantity = 1;
        shoppingListTemp.push(foodToAdd);
        const sortedShoppingListTemp = sort(shoppingListTemp, screenProps.settingsObject.idShoppingListSort);
        storeData('shoppingList', sortedShoppingListTemp);
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
                    source: item.imageFront !== undefined
                      ? { uri: item.imageFront }
                      : require('../assets/noPicture.png'),
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
                                        const foodName = item.product_name_fr !== undefined ? item.product_name_fr : '';
                                        const foodListTemp = _.cloneDeep(screenProps.foodList);
                                        const foodListItemIndex = _.findIndex(screenProps.foodList, foodListItem => foodListItem.barcode === item.barcode);
                                        foodListTemp.splice(foodListItemIndex, 1);
                                        const sortedFoodListTemp = sort(foodListTemp, screenProps.settingsObject.idFoodStockSort);
                                        storeData('foodList', sortedFoodListTemp);
                                        Toast.show(`Le produit ${foodName} a bien été supprimée`);
                                        PushNotification.cancelLocalNotifications({ id: `${item.barcode.slice(0, 8)}1` });
                                        PushNotification.cancelLocalNotifications({ id: `${item.barcode.slice(0, 8)}2` });
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
