/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  StyleSheet, View, Button, TextInput,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import FoodItem from './FoodItem';
import { getFoodFromApi } from '../API/OFFApi';

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    mainContainer:
    {
      flex: 1,
    },
    textInput:
    {
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      borderColor: '#FFFF',
      borderWidth: 1,
      paddingLeft: 5,
    },
  },
);

class Search extends React.Component {
  // On définit les propriétés dans le constructeur du component
  constructor(props) {
    super(props);

    this.state = {
      food: [],
      showButtonAdd: false,
      textScan: '',
    };

    this.searchedText = '';
  }

    handleOnNavigateBack = (textScan) => {
      this.setState({
        textScan,
      });

      this.searchedText = textScan;

      if (textScan !== 'Default') {
        this._loadFood();
      }
    }

    _loadFood() {
      getFoodFromApi(this.searchedText).then((data) => {
        // eslint-disable-next-line no-restricted-globals
        if (data.status === 1 && !isNaN(this.searchedText)) {
          this.setState({
            food: data.product,
            showButtonAdd: false,
          });
        } else {
          Toast.show('Le code barre ne renvoie vers aucun produit');
          this.setState({
            showButtonAdd: true,
            food: [],
          });
        }
      });
    }

    _searchTextInputChanged(text) {
      this.searchedText = text;
    }

    render() {
      const { navigation } = this.props;
      return (
        <View style={styles.mainContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Insere the food's barcode"
            onChangeText={text => this._searchTextInputChanged(text)}
          />

          <Button
            style={{ height: 100 }}
            title="Search"
            onPress={() => { this._loadFood(); }}
          />
          <Button
            style={{ height: 400 }}
            title="Ouvrir la caméra"
            onPress={() => { navigation.navigate('Camera', { onNavigateBack: this.handleOnNavigateBack }); }}
          />

          {
            this.state.showButtonAdd
              ? (
                <Button
                  style={{ height: 400 }}
                  title="Ajouter dans la base de données"
                  onPress={() => { navigation.navigate('AddFoodItem', { textScan: this.searchedText }); }}
                />
              )
              : null}

          <FoodItem food={this.state.food} />
        </View>
      );
    }
}


export default Search;
