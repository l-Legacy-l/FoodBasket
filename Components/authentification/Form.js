import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TextInput, Image, TouchableOpacity,
} from 'react-native';
import firebase from 'react-native-firebase';
import Toast from 'react-native-simple-toast';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

  translateErrorMessage = (message) => {
    let frMessage = message;
    if (message.includes('given password')) {
      frMessage = 'Erreur, le mot de passe saisi est invalide. Il doit contenir au minimum 6 caractères.';
    } else if (message.includes('network')) {
      frMessage = 'Erreur, le réseau n\'est pas disponible';
    } else if (message.includes('badly')) {
      frMessage = 'Erreur, l\'adresse e-mail est incorrecte';
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

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{ width: 130, height: 130 }}
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
          placeholder="Email"
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
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#ffffff"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          ref={input => this.password = input}
        />
        <TouchableOpacity
          onPress={this.handleSignUp}
          style={styles.button}
        >
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
