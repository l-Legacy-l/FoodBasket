import React from 'react';
import Navigation from './Navigation/Navigation';
import { getSettings } from './DB/DB';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodList: [],
      shoppingList: [],
      settingsObject: {},
      finishedFetching: false,
    };
    console.disableYellowBox = true;
  }

  componentDidMount = () => {
    getSettings().then(res => this.setState({ settingsObject: res, finishedFetching: true }));
  };

  updateFoodList = (foodList) => {
    this.setState({ foodList });
  }

  updateShoppingList = (shoppingList) => {
    this.setState({ shoppingList });
  }

  updateSettingsObject = (settingsObject) => {
    this.setState({ settingsObject });
  }

  render() {
    return this.state.finishedFetching ? (
      <Navigation
        screenProps={{
          foodList: this.state.foodList,
          updateFoodList: this.updateFoodList,
          shoppingList: this.state.shoppingList,
          updateShoppingList: this.updateShoppingList,
          settingsObject: this.state.settingsObject,
          updateSettingsObject: this.updateSettingsObject,
        }}
      />
    ) : null;
  }
}
