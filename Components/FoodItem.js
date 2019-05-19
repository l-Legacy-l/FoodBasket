import React from 'react';
import {
  StyleSheet, View, Text, Image, TouchableHighlight
  ,
} from 'react-native';
import { Icon } from 'react-native-elements';

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
      resizeMode: 'cover',
      backgroundColor: 'white',
    },
    contentContainer:
    {
      flex: 1,
      margin: 5,
    },
    contentHeader:
    {
      flex: 1,
      width: 180,
    },
    contentBarcode:
    {
      flex: 1,
      width: 180,
    },
    titleText:
    {
      fontWeight: 'bold',
      fontSize: 22,
      flex: 1,
      flexWrap: 'wrap',
      paddingRight: 5,
      textAlign: 'center',
    },
    barcodeText:
    {
      fontStyle: 'italic',
      fontSize: 16,
      textAlign: 'center',
    },
    contentIcons:
    {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  },
);

class FoodItem extends React.PureComponent {
  render() {
    const { food } = this.props;
    return (
      <TouchableHighlight>
        <View style={styles.mainContainer}>
          <Image
            style={styles.image}
            source={{ uri: food.image_front_url }}
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

            <View style={styles.contentIcons}>
              <Icon
                reverse
                name="delete"
                type="material"
                color="#517fa4"
                size={22}
                onPress={() => console.log('hello')}
              />

              <Icon
                reverse
                name="playlist-add"
                type="material"
                color="#517fa4"
                size={22}
                onPress={() => console.log('hello')}
              />

            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}


export default FoodItem;
