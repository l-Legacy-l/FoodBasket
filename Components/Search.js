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

        this.searchedText=""
    }

    _loadFood()
    {
        getFoodFromApi("302933000353").then(data => {
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

        console.log(this.state.food)
    }
    render()
    {

        return(
            <View style={styles.mainContainer}>
                <TextInput style={styles.textInput} placeholder="Insere the food's barcode">
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