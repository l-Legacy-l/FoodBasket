import React from 'react'
import{StyleSheet,View, Button, TextInput} from 'react-native'

class Search extends React.Component
{
    render()
    {
        return(
            <View style={styles.mainContainer}>
                <TextInput style={styles.textInput} placeholder="Insere the food's barcode">
                </TextInput>

                <Button style={{height: 100}} title="Search" onPress={()=>{}} ></Button>

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