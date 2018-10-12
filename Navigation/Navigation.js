import {createStackNavigator} from 'react-navigation'
import Search from '../Components/Search'

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
    }
})

export default SearchStackNavigator