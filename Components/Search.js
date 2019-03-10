import React from 'react'
import{StyleSheet,View, Button, TextInput, Text} from 'react-native'
import FoodItem from './FoodItem.js'
import { getFoodFromApi } from '../API/OFFApi.js'
import Toast from 'react-native-simple-toast';

class Search extends React.Component
{
    //On définit les propriétés dans le constructeur du component
    constructor(props) {
        super(props)

        this.state = {
            food:[],
            showButtonAdd: false
        }

        this.searchedText="";
    }

    _loadFood() {
        getFoodFromApi(this.searchedText).then(data => {
            if(data.status === 1 && !isNaN(this.searchedText)) {
               this.setState({
                    food: data.product,
                    showButtonAdd: false 
                })
            }
            else {
                Toast.show("Le code barre ne renvoie vers aucun produit");
                this.setState({
                    showButtonAdd: true,
                    food: []
                })
            }
        })
    }

    _searchTextInputChanged(text) {
        this.searchedText = text;
    }

    render() {
        
        const { navigation } = this.props;
        const textScan = navigation.getParam("textScan","Default");
        console.log(textScan);

        if(textScan != "Default") {
            this.searchedText = textScan;
            this._loadFood();
        }

        return(
            <View style={styles.mainContainer}>
                <TextInput style={styles.textInput} placeholder="Insere the food's barcode" 
                    onChangeText={(text)=>this._searchTextInputChanged(text)}>
                </TextInput>
  
                <Button style={{height: 100}} title="Search" onPress={()=>{this._loadFood()}} ></Button>
                <Button style={{height: 400}} title="Ouvrir la caméra" onPress={() => {this.props.navigation.navigate("Camera")}}></Button>

                {
                   this.state.showButtonAdd ? 
                    <Button 
                        style={{height: 400}} 
                        title="Ajouter dans la base de données" 
                        onPress={() => {this.props.navigation.navigate("AddFoodItem")}}>
                    </Button> 
                : null}
            
                <FoodItem food={this.state.food}/>         
            </View>
        )
    }
}

const styles = StyleSheet.create(
{
    container: {
        flex: 1,
        flexDirection: 'column'
      },
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