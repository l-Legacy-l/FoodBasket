import React, { Component } from 'react';
import { StyleSheet, View, Button } from 'react-native';
import t from 'tcomb-form-native';
import ImageFactory from 'react-native-image-picker-form'

const Form = t.form.Form;

const FoodItem = t.struct({
  Titre: t.String,
  Code: t.String,
  Image: t.String
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10,
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600',
    },
  },
};

const options = {
  order: ['Titre', 'Code', 'Image'],
  fields: {
    Titre: {
      placeholder: 'Titre du produit',
      error: 'Le titre du produit est vide',
    },
    Code: {
      placeholder: '123456789',
    },
    Image: {
    config: {
      title: 'Selectionner une image',
      options: ['Ouvrir la caméra', 'Selectionner depuis la gallerie', 'Annuler'],
      // Used on Android to style BottomSheet
      style: {
        titleFontFamily: 'Roboto'
      }
    },
    error: "Pas d'image fournie",
    factory: ImageFactory
    }
  },
  stylesheet: formStyles,
};

export default class AddFoodItem extends Component {
  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
  };

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Form ref={c => (this._form = c)} type={FoodItem} options={options} />
        </View>

        <View style={{padding: 20}}>
          <Button style={{marginTop: 10}} title="Envoyer" onPress={this.handleSubmit} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 20,
  },
});
