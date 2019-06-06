import React from 'react';
import Navigation from './Navigation/Navigation';
// import { getData } from './DB/DB';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodList: [],
      shoppingList: [],
    };
    console.disableYellowBox = true;
  }

  /*   componentDidMount = () => {
    getData('foodList').then(res => this.setState({ foodList: res }));
    getData('shoppingList').then(res => this.setState({ shoppingList: res }));
  }; */

  updateFoodList = (foodList) => {
    this.setState({ foodList });
  }

  updateShoppingList = (shoppingList) => {
    this.setState({ shoppingList });
  }

  render() {
    return (
      <Navigation
        screenProps={{
          foodList: this.state.foodList,
          updateFoodList: this.updateFoodList,
          shoppingList: this.state.shoppingList,
          updateShoppingList: this.updateShoppingList,
        }}
      />
    );
  }
}
