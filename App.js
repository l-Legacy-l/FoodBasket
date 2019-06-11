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
    };
    console.disableYellowBox = true;
  }

  componentDidMount = () => {
    getSettings().then(res => this.setState({ settingsObject: res }));
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
    return (
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
    );
  }
}
