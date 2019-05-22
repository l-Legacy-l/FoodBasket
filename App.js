import React from 'react';
import Navigation from './Navigation/Navigation';
import { getData } from './DB/DB';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodList: [],
    };
  }

  componentDidMount = () => {
    getData('foodList').then(res => this.setState({ foodList: res }));
  };

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
