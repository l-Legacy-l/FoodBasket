import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'

class FoodItem extends React.Component
{
    render()
    {
        return(
            <TouchableOpacity style={styles.mainContainer}>
                <Image
                    style={styles.image}
                    source={{uri: "bini" }} 
                />

                <View styles={styles.contentContainer}>
                    <View style={styles.contentHeader}>
                        <Text style={styles.titleText}>
                            {"rlkrrrrrrrkjhj"}
                        </Text>
                    </View>

                    <View style={styles.contentBarcode}>
                        <Text style={styles.descriptionText}>
                        {"ikkkkkkkk"}
                        </Text> 
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create(
{
    mainContainer:
    {
        height: 250,
        flexDirection: 'row'
    },
    image:
    {
        width: 170,
        height: 250,
        margin: 5,
        backgroundColor: 'grey'
    },
    contentContainer:
    {
        flex: 1,
        margin: 5,     
    },
    contentHeader:
    {
        flex: 1,
        width: 180
    },
    contentBarcode:
    {
        flex:1,
        width: 180
    },
    titleText: 
    {
        fontWeight: 'bold',
        fontSize: 22,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5,
        textAlign:"center"
    },
    descriptionText:
    {
        fontStyle: 'italic',
        fontSize: 16,
        textAlign:'center'
    }
})

export default FoodItem