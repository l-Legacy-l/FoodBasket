import React, { PureComponent } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Button, Icon } from 'react-native-elements';

const styles = StyleSheet.create(
  {
    buttonStyles: {
      backgroundColor: '#517fa4',
      borderRadius: 20,
      width: '80%',
      height: 75,
    },
  },
);

export default class Search extends PureComponent {
  render() {
    const { navigation } = this.props;

    return (
      <ImageBackground
        source={require('../assets/backgroundApp.jpg')}
        blurRadius={1}
        style={{ width: '100%', height: '100%' }}
      >

        <View style={{ marginTop: '40%' }}>
          <Button
            icon={(
              <Icon
                name="barcode-scan"
                type="material-community"
                size={40}
                iconStyle={{ marginLeft: 40 }}
                color="white"
              />
          )}
            title="Scanner un produit pour votre liste d'aliments"
            buttonStyle={styles.buttonStyles}
            titleStyle={{ marginRight: 30 }}
            containerStyle={{ alignItems: 'center' }}
            onPress={() => navigation.navigate('FoodListSearch')}
          />

          <Button
            icon={(
              <Icon
                name="magnify"
                type="material-community"
                size={40}
                iconStyle={{ marginLeft: 40 }}
                color="white"
              />
          )}
            title="Rechercher un produit pour votre liste de courses"
            buttonStyle={styles.buttonStyles}
            titleStyle={{ marginRight: 50 }}
            containerStyle={{ marginTop: '30%', alignItems: 'center' }}
            onPress={() => navigation.navigate('ShoppingListSearch')}
          />
        </View>
      </ImageBackground>
    );
  }
}
