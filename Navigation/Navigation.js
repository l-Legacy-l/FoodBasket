import React from 'react';
import {
  createStackNavigator, createAppContainer, createBottomTabNavigator, createMaterialTopTabNavigator,
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import Search from '../Components/Search';
import SignUp from '../Components/authentification/SignUp';
import SignIn from '../Components/authentification/SignIn';
import FoodListSearch from '../Components/FoodListSearch';
import ShoppingListSearch from '../Components/ShoppingListSearch';
import Camera from '../Components/Camera';
import AddFoodItem from '../Components/AddFoodItem';
import MyFoods from '../Components/MyFoods';
import MyShopping from '../Components/MyShopping';
import FoodOptions from '../Components/FoodOptions';
import FoodIngredients from '../Components/FoodIngredients';
import FoodNutritions from '../Components/FoodNutritions';


const FoodDetailsTopNavigator = createMaterialTopTabNavigator({
  Options: FoodOptions,
  Ingrédients: FoodIngredients,
  Nutritions: FoodNutritions,
},
{
  initialRouteName: 'Options',
  tabBarOptions: {
    style: {
      backgroundColor: 'white',
    },
    activeTintColor: '#517fa4',
    inactiveTintColor: 'black',
    indicatorStyle: {
      backgroundColor: '#517fa4',
      height: 3,
    },
  },
  tabBarPosition: 'top',
  swipeEnabled: true,
  animationEnabled: true,
});

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
  FoodDetails: {
    screen: FoodDetailsTopNavigator,
    navigationOptions: {
      title: 'Détails d\'un aliment',
      headerStyle: { backgroundColor: 'white', elevation: 0 },
      headerTitleStyle: { color: 'black' },
      headerTintColor: 'black',
    },
  },
});

const MyShoppingStackNavigator = createStackNavigator({
  MyShopping: {
    screen: MyShopping,
    navigationOptions: {
      title: 'Mes courses',
    },
  },
});

const MainTabNavigator = createBottomTabNavigator({
  Search: {
    screen: SearchStackNavigator,
    navigationOptions: {
      title: 'Recherche',
      tabBarIcon: <Icon
        name="magnify"
        type="material-community"
        color="#517fa4"
      />,
    },
  },

  MyFoods: {
    screen: MyFoodsStackNavigator,
    navigationOptions: {
      title: 'Stock de nourritures',
      tabBarIcon: <Icon
        name="food-fork-drink"
        type="material-community"
        color="#517fa4"
      />,
    },
  },

  MyShopping: {
    screen: MyShoppingStackNavigator,
    navigationOptions: {
      title: 'Liste de courses',
      tabBarIcon: <Icon
        name="cart-outline"
        type="material-community"
        color="#517fa4"
      />,
    },
  },
});

const AuthentificationStackNavigator = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      header: null,
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      header: null,
    },
  },
  Tabs: {
    screen: MainTabNavigator,
    navigationOptions: {
      header: null,
    },
  },
});

const App = createAppContainer(AuthentificationStackNavigator);

export default App;
