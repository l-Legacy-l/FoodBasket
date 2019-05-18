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

  Camera: {
    screen: Camera,
  },

  AddFoodItem: {
    screen: AddFoodItem,
    navigationOptions: {
      title: 'Ajouter un produit',
    },
  },
});

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
