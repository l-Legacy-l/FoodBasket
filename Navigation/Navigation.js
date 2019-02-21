import { createStackNavigator, createAppContainer } from 'react-navigation'
import Search from '../Components/Search'
import Camera from '../Components/Camera'

const SearchStackNavigator = createStackNavigator(
{
    //Correspond à la vue du component Search (on met le nom qu'on veut)
    Search:
    {
        screen: Search,
        navigationOptions:
        {
            title: "Search"
        }
    },

    Camera:
    {
        screen: Camera
    },
})
const App = createAppContainer(SearchStackNavigator);

export default App;