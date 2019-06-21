/* eslint-disable react/no-unused-state */
import React from 'react';
import {
  StyleSheet, View, Button, TextInput,
} from 'react-native';
import Toast from 'react-native-simple-toast';
import { SearchBar, Icon } from 'react-native-elements';
import FoodItem from './FoodItem';
import { getFoodFromApi } from '../API/OFFApi';

const styles = StyleSheet.create(
  {
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    mainContainer: {
      flex: 1,
    },
    bottomButton: {
      position: 'absolute',
      bottom: 10,
      right: 10,
    },
  },
);

export default class FoodListSearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      food: [],
      showButtonAdd: false,
      showFood: false,
      textToScan: '',
    };
  }

    handleOnNavigateBack = (textToScan) => {
      this.setState({
        textToScan,
      }, () => {
        if (textToScan !== 'Default') {
          this._loadFood();
        }
      });
    }

    _loadFood() {
      getFoodFromApi(this.state.textToScan).then((data) => {
        // eslint-disable-next-line no-restricted-globals
        if (data.status === 1 && !isNaN(this.state.textToScan)) {
          this.setState({
            food: data.product,
            showFood: true,
            showButtonAdd: false,
          });
        } else {
          Toast.show('Le code-barre ne renvoie vers aucun produit');
          this.setState({
            showButtonAdd: true,
            showFood: false,
            food: [],
          });
        }
      });
    }

    _searchTextInputChanged(text) {
      this.setState({ textToScan: text });
    }

    render() {
      const { navigation } = this.props;
      return (
        <View style={styles.mainContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <SearchBar
              containerStyle={{ width: '85%', backgroundColor: 'white', fontSize: 12 }}
              placeholder="Insérer le code barre du produit"
              lightTheme
              round
              inputStyle={{ color: 'black', fontSize: 16 }}
              onChangeText={text => this._searchTextInputChanged(text)}
              value={this.state.textToScan}
            />

            <Icon
              reverse
              name="magnify"
              type="material-community"
              color="#517fa4"
              size={20}
              onPress={() => this._loadFood()}
            />

          </View>

          <View style={styles.bottomButton}>
            <Icon
              reverse
              name="barcode-scan"
              type="material-community"
              color="#517fa4"
              size={24}
              onPress={() => { navigation.navigate('Camera', { onNavigateBack: this.handleOnNavigateBack }); }}
            />
          </View>


          {
            this.state.showButtonAdd
              ? (
                <View style={[styles.bottomButton, { right: 80 }]}>
                  <Icon
                    reverse
                    name="database-plus"
                    type="material-community"
                    color="#517fa4"
                    size={24}
                    onPress={() => { navigation.navigate('AddFoodItem', { textToScan: this.state.textToScan }); }}
                  />
                </View>
              )
              : null}
          {this.state.showFood
            ? <FoodItem food={this.state.food} screenProps={this.props.screenProps} />
            : <View />

          }
        </View>
      );
    }
}
