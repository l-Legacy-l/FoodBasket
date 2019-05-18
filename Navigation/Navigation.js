import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Search from '../Components/Search';
import Camera from '../Components/Camera';
import AddFoodItem from '../Components/AddFoodItem';
import MyBasket from '../Components/MyBasket';

const SearchStackNavigator = createStackNavigator({
  // Match the component Search (name is free)
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher un produit',
    },
  },

  AddFoodItem: {
    screen: AddFoodItem,
    navigationOptions: {
      title: 'Ajouter un produit',
    },
  },

  Camera: {
    screen: Camera,
    navigationOptions: {
      tabBarVisible: false,
    },
  },


});

SearchStackNavigator.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;

  const nextView = navigation.state.routes;
  if (nextView[1] !== undefined && nextView[1].routeName === 'Camera') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const MyBasketStackNavigator = createStackNavigator({
  MyBasket: {
    screen: MyBasket,
    navigationOptions: {
      title: 'Mes aliments',
    },
  },
});

const MainTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
  },

  MyBasket: {
    screen: MyBasketStackNavigator,
  },
});


const App = createAppContainer(MainTabNavigator);

export default App;
