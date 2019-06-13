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
    getSettings().then((res) => {
      // if it's the first time the user open the app, the default values for the expiration date notification are set
      if (!res.firstRemindTime) {
        res.isNotificationEnabled = true;
        res.firstRemindTime = 604800;
        res.firstRemindTimeString = '1 semaine';
        res.secondRemindTime = 172800;
        res.secondRemindTimeString = '2 jours';
      }
      this.setState({ settingsObject: res, finishedFetching: true });
    });
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
