import React, { Component } from 'react';
import {
  View, Text, Modal, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions,
} from 'react-native';
import _ from 'lodash';
import ImageViewer from 'react-native-image-zoom-viewer';

const screenWidth = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  image: {
    width: screenWidth / 2,
    height: screenWidth / 2,
    resizeMode: 'contain',
    marginTop: 3,
    marginBottom: 3,
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'white',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 16,
    flexWrap: 'wrap',
    paddingRight: 5,
  },
});

export default class FoodIngredients extends Component {
  constructor(props) {
    super(props);
    this.food = _.find(this.props.screenProps.foodList, food => food.barcode === this.props.navigation.state.params.barcode);
    this.state = {
      isVisible: false,
    };
  }

  render() {
    const foodIngredients = this.food.ingredients !== undefined ? this.food.ingredients.replace(/_/g, ' ') : '';

    const images = {
      1: {
        uri: require('../assets/nova-group-1.png'),
        text: 'Groupe 1 - Aliments non transformés ou transformés minimalement',
      },
      2: {
        uri: require('../assets/nova-group-2.png'),
        text: 'Groupe 2 - Ingrédients culinaires transformés',
      },
      3: {
        uri: require('../assets/nova-group-3.png'),
        text: 'Groupe 3 - Aliments transformés',
      },
      4: {
        uri: require('../assets/nova-group-4.png'),
        text: 'Groupe 4 - Produits alimentaires et boissons ultra-transformés',
      },
    };

    return (
      <ScrollView>
        {this.food.imageIngredients

          ? (
            <View>
              <Modal
                visible={this.state.isVisible}
                onRequestClose={() => this.setState({ isVisible: false })}
                animationType="fade"
                transparent
              >
                <ImageViewer imageUrls={[{ url: this.food.imageIngredients }]} />
              </Modal>
            </View>
          )
          : <View />
        }
        <View style={[styles.viewContainer, { elevation: 2 }]}>
          <TouchableOpacity
            onPress={() => this.setState({ isVisible: true })}
          >
            <Image
              source={this.food.imageIngredients !== undefined
                ? { uri: this.food.imageIngredients }
                : require('../assets/noPicture.png')
            }
              style={styles.image}
            />
          </TouchableOpacity>
          {this.food.nutrients && this.food.nutrients['nova-group'] !== undefined
            ? (
              <View style={styles.viewContainer}>
                <Image
                  source={images[this.food.nutrients['nova-group']].uri}
                  style={{
                    width: screenWidth / 4,
                    height: screenWidth / 4,
                    resizeMode: 'contain',
                    marginTop: 10,
                  }}
                />

                <Text style={{ textAlign: 'center', marginTop: 15 }}>{images[this.food.nutrients['nova-group']].text}</Text>
              </View>
            )

            : <View />
          }
        </View>
        {foodIngredients !== ''

          ? (
            <View style={{
              justifyContent: 'center',
              margin: 10,
              flexDirection: 'row',
              flexWrap: 'wrap',

            }}
            >
              <Text>
                <Text style={styles.titleText}>Liste des ingrédients: </Text>
                <Text style={{ textAlign: 'center' }}>{foodIngredients}</Text>

              </Text>
            </View>
          )

          : <View />

        }

      </ScrollView>
    );
  }
}
