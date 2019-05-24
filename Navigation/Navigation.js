import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Search from '../Components/Search';
import FoodListSearch from '../Components/FoodListSearch';
import ShoppingListSearch from '../Components/ShoppingListSearch';
import Camera from '../Components/Camera';
import AddFoodItem from '../Components/AddFoodItem';
import MyFoods from '../Components/MyFoods';

const SearchStackNavigator = createStackNavigator({
  // Match the component Search (name is free)
  Search: {
    screen: Search,
    navigationOptions: {
      header: null,
    },
  },

  FoodListSearch: {
    screen: FoodListSearch,
    navigationOptions: {
      title: 'Scanner un produit',
    },
  },

  ShoppingListSearch: {
    screen: ShoppingListSearch,
    navigationOptions: {
      title: 'Rechercher des produits',
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
  if (nextView[2] !== undefined && nextView[2].routeName === 'Camera') {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const MyFoodsStackNavigator = createStackNavigator({
  MyFoods: {
    screen: MyFoods,
    navigationOptions: {
      title: 'Mes aliments',
    },
  },
});

const MainTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
  },

  MyFoods: {
    screen: MyFoodsStackNavigator,
  },
});


const App = createAppContainer(MainTabNavigator);

export default App;
