import React from 'react'
import{StyleSheet,View, Button, TextInput} from 'react-native'
import FoodItem from './FoodItem.js'
import { getFoodFromApi } from '../API/OFFApi.js'
import Toast from 'react-native-simple-toast';

class Search extends React.Component
{
    //On définit les propriétés dans le constructeur du component
    constructor(props)
    {
        super(props)

        this.state = {
            food:[]
        }

        this.searchedText="";
    }

    _loadFood()
    {
        getFoodFromApi(this.searchedText).then(data => {
            if(data.status == 1)
            {
               this.setState({
                    food: data.product
                })
            }
            else
            {
                Toast.show("Le code barre ne renvoie vers aucun produit");
            }
        })

    }

    _searchTextInputChanged(text)
    {
        this.searchedText = text;
    }
    render()
    {

        return(
            <View style={styles.mainContainer}>
                <TextInput style={styles.textInput} placeholder="Insere the food's barcode" 
                    onChangeText={(text)=>this._searchTextInputChanged(text)}>
                </TextInput>
  
                <Button style={{height: 100}} title="Search" onPress={()=>{this._loadFood()}} ></Button>
                <FoodItem food={this.state.food}/>
                                            
            </View>
        )
    }
}

const styles = StyleSheet.create(
{
    mainContainer:
    {
        flex:1
    },
    textInput:
    {
        marginLeft:5, 
        marginRight: 5,
        height:50,
        borderColor:'#FFFF',
        borderWidth:1, 
        paddingLeft: 5
    }
})

export default Search