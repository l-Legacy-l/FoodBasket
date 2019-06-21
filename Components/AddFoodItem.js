/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import {
  StyleSheet, View, Button, ScrollView,
} from 'react-native';
import t from 'tcomb-form-native';
import ImageFactory from 'react-native-image-picker-form';
import Toast from 'react-native-simple-toast';
import { writeFoodDataToApi, writeFoodDataToApiWithImage } from '../API/OFFApi';

const { Form } = t.form;

const FoodItem = t.struct({
  Titre: t.String,
  Code: t.String,
  Image: t.String,
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
      color: '#517fa4',
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
      editable: false,
      placeholder: '123456789',
    },
    Image: {
      config: {
        title: 'Selectionner une image',
        options: ['Ouvrir la caméra', 'Selectionner depuis la gallerie', 'Annuler'],
        // Used on Android to style BottomSheet
        style: {
          titleFontFamily: 'Roboto',
        },
      },
      error: "Pas d'image fournie",
      factory: ImageFactory,
    },
  },
  stylesheet: formStyles,
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 20,
  },
});

export default class AddFoodItem extends Component {
  constructor(props) {
    super(props);
    this.value = {
      Code: this.props.navigation.state.params.textToScan,
    };
  }

  handleSubmit = () => {
    const value = this._form.getValue();
    // Check if the form is fill
    if (value !== null) {
      // TODO Loading + Toast
      writeFoodDataToApi(value.Code, value.Titre).then(
        () => writeFoodDataToApiWithImage(value.Image, value.Code).then((res) => {
          if (res.status === 200) {
            Toast.show('Le produit a bien été sauvegardé');
          }
          console.log(`je passe add image ${JSON.stringify(res)}`);
        }),
      );
    }
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Form ref={c => (this._form = c)} type={FoodItem} options={options} value={this.value} />
        </View>

        <View style={{ padding: 20 }}>
          <Button style={{ marginTop: 10 }} color="#517fa4" title="Envoyer" onPress={this.handleSubmit} />
        </View>

      </ScrollView>
    );
  }
}
