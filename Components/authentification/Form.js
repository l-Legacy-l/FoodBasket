import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TextInput, Image, TouchableOpacity,
} from 'react-native';
import firebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';
import { getData } from '../../DB/DB';
import sort from '../../Sortings/Sorting';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255, 255,255,0.2)',
    borderRadius: 25,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#ffffff',
    marginVertical: 10,
  },
  logoText: {
    marginVertical: 15,
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  button: {
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius: 25,
    marginVertical: 10,
    paddingVertical: 13,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },

});

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
    };
  }

    componentDidMount = () => {
      const { screenProps } = this.props;

      // Automatically loged if the user is not disconected
      if (firebase.auth().currentUser) {
        const { idFoodStockSort, idShoppingListSort } = screenProps.settingsObject;
        getData('foodList').then(res => screenProps.updateFoodList(sort(res, idFoodStockSort)));
        getData('shoppingList').then(res => screenProps.updateShoppingList(sort(res, idShoppingListSort)));
        // Synchronize data between all the device on the same account when the list is updated
        const { uid } = firebase.auth().currentUser;
        const foodListRef = firebase.database().ref(`/foodList/users/${uid}`);
        foodListRef.on('value', snapshot => screenProps.updateFoodList(snapshot.val() === null ? [] : snapshot.val()));
        const shoppingListRef = firebase.database().ref(`/shoppingList/users/${uid}`);
        shoppingListRef.on('value', snapshot => screenProps.updateShoppingList(snapshot.val() === null ? [] : snapshot.val()));

        this.props.navigate();
      }
    };

  translateErrorMessage = (message) => {
    let frMessage = message;
    if (message.includes('given password')) {
      frMessage = 'Erreur, le mot de passe saisi est invalide. Il doit contenir au minimum 6 caractères.';
    } else if (message.includes('network')) {
      frMessage = 'Erreur, le réseau n\'est pas disponible';
    } else if (message.includes('badly')) {
      frMessage = 'Erreur, l\'adresse e-mail est incorrecte';
    } else if (message.includes('password is invalid') || message.includes('no user record')) {
      frMessage = 'Erreur, le mot de passe est invalide ou ce compte n\'existe pas';
    } else {
      frMessage = 'Erreur, cette adresse est déjà utilisé par un autre compte';
    }
    this.setState({ errorMessage: frMessage });
  }

  handleSignUp = () => {
    const { email, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(this.props.navigate).then(() => Toast.show('Inscription réussie'))
      .catch(error => this.translateErrorMessage(error.message));
  }


  handleSignIn = () => {
    const { email, password } = this.state;
    const { screenProps } = this.props;
    const { idFoodStockSort, idShoppingListSort } = screenProps.settingsObject;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        getData('foodList').then(res => screenProps.updateFoodList(sort(res, idFoodStockSort || 0)));
        getData('shoppingList').then(res => screenProps.updateShoppingList(sort(res, idShoppingListSort || 0)));
        // Synchronize data between all the device on the same account when the list is updated
        const { uid } = firebase.auth().currentUser;
        const foodListRef = firebase.database().ref(`/foodList/users/${uid}`);
        foodListRef.on('value', snapshot => screenProps.updateFoodList(snapshot.val() === null ? [] : snapshot.val()));
        const shoppingListRef = firebase.database().ref(`/shoppingList/users/${uid}`);
        shoppingListRef.on('value', snapshot => screenProps.updateShoppingList(snapshot.val() === null ? [] : snapshot.val()));
      })
      .then(this.props.navigate)
      .catch(error => this.translateErrorMessage(error.message));
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ height: 130, resizeMode: 'contain' }}
          source={require('../../assets/FoodBasket.png')}
        />
        <Text style={styles.logoText}>Bienvenue sur FoodBasket</Text>
        {this.state.errorMessage
          && (
          <Text style={{
            color: 'red', marginRight: 20, marginLeft: 20, textAlign: 'center',
          }}
          >
            {this.state.errorMessage}
          </Text>
          )}
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="E-mail"
          placeholderTextColor="#ffffff"
          selectionColor="#fff"
          keyboardType="email-address"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          onSubmitEditing={() => this.password.focus()}
        />
        <TextInput
          style={styles.inputBox}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Mot de passe"
          secureTextEntry
          placeholderTextColor="#ffffff"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          ref={input => this.password = input}
        />
        <TouchableOpacity
          onPress={() => {
            if (this.props.type === 'Se connecter') {
              this.handleSignIn();
            } else {
              this.handleSignUp();
            }
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{this.props.type}</Text>
        </TouchableOpacity>
        {this.props.type === 'Se connecter'
          ? (
            <TouchableOpacity
              onPress={this.props.forgotPassword}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Mot de passe oublié</Text>
            </TouchableOpacity>
          )
          : <View />
        }
      </View>
    );
  }
}
