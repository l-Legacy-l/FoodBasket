/* eslint-disable react/no-unused-state */
import React from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
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
      keyboardOpened: false,
    };
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
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

  _keyboardDidShow = () => {
    this.setState({
      keyboardOpened: true,
    });
  }

  _keyboardDidHide = () => {
    this.setState({
      keyboardOpened: false,
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
      } else if (data.status === 0) {
        Toast.show('Le code-barre ne renvoie vers aucun produit');
        this.setState({
          showButtonAdd: true,
          showFood: false,
          food: [],
        });
      } else {
        Toast.show('Le code-barre introduit est incorrect');
        this.setState({
          showButtonAdd: false,
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
            containerStyle={{ width: '83%', backgroundColor: 'white' }}
            placeholder="Insérer le code barre du produit"
            lightTheme
            round
            inputStyle={{ color: 'black', fontSize: 13 }}
            onChangeText={text => this._searchTextInputChanged(text)}
            value={this.state.textToScan}
            keyboardType="number-pad"
          />

          <Icon
            reverse
            name="magnify"
            type="material-community"
            color="#517fa4"
            size={20}
            onPress={() => {
              if (this.state.textToScan) {
                this._loadFood();
              }
            }}
          />

        </View>

        {!this.state.keyboardOpened
          ? (
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
          )
          : <View />
        }


        {
            this.state.showButtonAdd && !this.state.keyboardOpened
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
