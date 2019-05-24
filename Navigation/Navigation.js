import {
  createStackNavigator, createAppContainer, createBottomTabNavigator, createMaterialTopTabNavigator,
} from 'react-navigation';
import Search from '../Components/Search';
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
      backgroundColor: '#517fa4',
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
  },

  MyFoods: {
    screen: MyFoodsStackNavigator,
  },

  MyShopping: {
    screen: MyShoppingStackNavigator,
  },
});

const App = createAppContainer(MainTabNavigator);

export default App;
