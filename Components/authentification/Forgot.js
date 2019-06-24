import React, { Component } from 'react';
import {
  View, Text, StyleSheet, Image, TextInput, TouchableOpacity,
} from 'react-native';
import firebase from 'react-native-firebase';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
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


export default class Forgot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      errorMessage: null,
    };
  }

  translateErrorMessage = (message) => {
    let frMessage = message;

    if (message.includes('network')) {
      frMessage = 'Erreur, le réseau n\'est pas disponible';
    } else if (message.includes('badly')) {
      frMessage = 'Erreur, l\'adresse e-mail est incorrecte';
    } else {
      frMessage = 'Erreur, cette adresse n\'est associé à aucun compte';
    }
    this.setState({ errorMessage: frMessage });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 25, alignItems: 'center' }}>
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
          />
          <TouchableOpacity
            style={styles.button}
            onPress={
              () => {
                if (this.state.email) {
                  firebase.auth().sendPasswordResetEmail(this.state.email).then(() => {
                    // eslint-disable-next-line no-alert
                    // eslint-disable-next-line no-undef
                    alert('L\'e-mail de récupération a bien été envoyé');
                    this.setState({ errorMessage: null });
                  })
                    .catch(err => this.translateErrorMessage(err.message));
                }
                this.setState({ errorMessage: 'Erreur, vous devez remplir tous les champs' });
              }
            }
          >
            <Text style={styles.buttonText}>Envoyer le mail de récupération</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
