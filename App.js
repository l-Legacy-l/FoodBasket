import React from 'react';
import Navigation from './Navigation/Navigation';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodList: [],
    };
  }

  updateFoodList = (foodList) => {
    this.setState({ foodList });
  }

  render() {
    return (
      <Navigation
        screenProps={{
          foodList: this.state.foodList,
          updateFoodList: this.updateFoodList,
        }}
      />
    );
  }
}
