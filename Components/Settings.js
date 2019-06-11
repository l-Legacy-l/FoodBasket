import React, { Component } from 'react';
import {
  ScrollView, Text, StyleSheet,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import _ from 'lodash';
import RNPickerSelect from 'react-native-picker-select';
import { storeSettings } from '../DB/DB';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 10,
    flex: 1,
  },
  sectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.12)',
    backgroundColor: '#efefef',
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 24,
    opacity: 0.8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: '#dadada',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const sorts = [
  {
    label: 'Alphabétique',
    value: 'Alphabétique',
  },
  {
    label: 'Quantité',
    value: 'Quantité',
  },
];


export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      foodStockSort: this.props.screenProps.settingsObject.foodStockSort,
      shoppingListSort: this.props.screenProps.settingsObject.shoppingListSort,
    };
  }

  render() {
    /*     const placeholder = {
      label: 'Selectionner une valeur',
      value: null,
      color: '#9EA0A4',
    }; */
    return (
      <ScrollView style={styles.container}>
        <Text>Stock de nourriture</Text>
        <RNPickerSelect
          placeholder={{}}
          items={sorts}
          onValueChange={(value) => {
            this.setState({
              foodStockSort: value,
            });
            const { screenProps } = this.props;
            const settingsTemp = _.cloneDeep(screenProps.settingsObject);
            settingsTemp.foodStockSort = value;
            screenProps.updateSettingsObject(settingsTemp);
            storeSettings(settingsTemp);
          }}
          style={pickerSelectStyles}
          value={this.state.foodStockSort}

        />

        <Text>Liste de courses</Text>
        <RNPickerSelect
          placeholder={{}}
          items={sorts}
          onValueChange={(value) => {
            this.setState({
              shoppingListSort: value,
            });

            const { screenProps } = this.props;
            const settingsTemp = _.cloneDeep(screenProps.settingsObject);
            settingsTemp.shoppingListSort = value;
            screenProps.updateSettingsObject(settingsTemp);
            storeSettings(settingsTemp);
          }}
          style={pickerSelectStyles}
          value={this.state.shoppingListSort}
        />
      </ScrollView>
    );
  }
}
