/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import {
  StyleSheet, View, Button,
} from 'react-native';
import t from 'tcomb-form-native';
import Toast from 'react-native-simple-toast';
import _ from 'lodash';
import { storeData } from '../DB/DB';
import sort from '../Sortings/Sorting';

const { Form } = t.form;

const QuantityNumber = t.refinement(t.Number, n => Number.isInteger(n) && n > 0 && n <= 99);

QuantityNumber.getValidationErrorMessage = (value) => {
  if (value === null) {
    return 'La quantité du produit est vide';
  }
  return 'La quantité du produit indiqué n\'est pas valide';
};

const ShoppingItem = t.struct({
  Nom: t.String,
  Quantité: QuantityNumber,
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
  order: ['Nom', 'Quantité'],
  fields: {
    Nom: {
      placeholder: 'Entrer le nom du produit',
      error: 'Le nom du produit est vide',
    },
    Quantité: {
      placeholder: 'Entrer la quantité du produit',
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

export default class AddShoppingItem extends PureComponent {
  addToShoppingList = () => {
    const value = this._form.getValue();
    if (value !== null) {
      const shoppingItem = {};
      const { screenProps } = this.props;
      const shoppingListTemp = _.cloneDeep(screenProps.shoppingList);

      shoppingItem.name = value.Nom;
      shoppingItem.quantity = parseInt(value.Quantité, 10);

      shoppingListTemp.push(shoppingItem);
      const sortedShoppingListTemp = sort(shoppingListTemp, screenProps.settingsObject.idShoppingListSort);
      storeData('shoppingList', sortedShoppingListTemp);

      Toast.show(`L'aliment ${`${value.Nom}`} a bien été ajoutée à la liste de course`);
    }
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <Form ref={c => (this._form = c)} type={ShoppingItem} options={options} />
        </View>

        <View style={{ padding: 20 }}>
          <Button style={{ marginTop: 7, width: '80%' }} color="#517fa4" title="Ajouter" onPress={this.addToShoppingList} />
        </View>

      </View>
    );
  }
}
