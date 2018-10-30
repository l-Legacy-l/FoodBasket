import React from 'react'
import{StyleSheet,View, Button, TextInput, FlatList} from 'react-native'
import FoodItem from './FoodItem.js'
import itemFood from '../Helpers/data.js'

class Search extends React.Component
{
    render()
    {
        return(
            <View style={styles.mainContainer}>
                <TextInput style={styles.textInput} placeholder="Insere the food's barcode">
                </TextInput>

                <Button style={{height: 100}} title="Search" onPress={()=>{}} ></Button>
                <FlatList
                    //correspond à mon aliment
                    data = {itemFood}
                    // On identifie une proriété qui va servir d'identifiant unique
                    keyExtractor={(item) => item.code.toString()}
                    // Correspond au rendu des données de la liste
                    renderItem={({item}) => <FoodItem food={item}/>}
                />
                
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