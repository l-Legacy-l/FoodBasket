import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'

class FoodItem extends React.Component
{
    render()
    {
        const food = this.props.food
        return(
            <TouchableOpacity style={styles.mainContainer}>
                <Image
                    style={styles.image}
                    source={{uri: food.image_front_url}} 
                />

                <View styles={styles.contentContainer}>
                    <View style={styles.contentHeader}>
                        <Text style={styles.titleText}>
                            {food.product_name_fr}
                        </Text>
                    </View>

                    <View style={styles.contentBarcode}>
                        <Text style={styles.barcodeText}>
                        {food.code}
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
        flexDirection: 'row',
    },
    image:
    {
        width: 170,
        height: 250,
        margin: 5,
        backgroundColor: 'white'
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
    barcodeText:
    {
        fontStyle: 'italic',
        fontSize: 16,
        textAlign:'center'
    }
})

export default FoodItem