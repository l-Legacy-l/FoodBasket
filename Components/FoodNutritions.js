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
    paddingRight: 5,
  },
  nutritionColor: {
    width: 15,
    height: 15,
    borderRadius: 10,
    marginTop: 17,
    marginRight: 10,
  },
  viewNutrition: {
    margin: 5,
    flexDirection: 'row',
  },
  textNutrition: {
    marginTop: 15,
  },
});

export default class FoodNutritions extends Component {
  constructor(props) {
    super(props);
    this.food = _.find(this.props.screenProps.foodList, food => food.barcode === this.props.navigation.state.params.barcode);
    this.state = {
      isVisible: false,
    };
    this.colorBadge = '';
    this.extraMessageNutrient = '';
    // Check if the product is a drink
    this.coeff = 1;
    if (this.food.categorie !== 'en:beverages') {
      this.coeff = 2;
    }
  }

  evaluateNutritionColor = (nutrient, value) => {
    console.log(`je passe ${nutrient} ${value}`);
    if (nutrient === 'Matières grasses') {
      if (value >= 10 * this.coeff) {
        this.colorBadge = 'red';
      } else if (value >= 1.5 * this.coeff) {
        this.colorBadge = 'orange';
      } else {
        this.colorBadge = 'green';
      }
    } else if (nutrient === 'Graisses saturées') {
      if (value >= 2.5 * this.coeff) {
        this.colorBadge = 'red';
      } else if (value >= 0.75 * this.coeff) {
        this.colorBadge = 'orange';
      } else {
        this.colorBadge = 'green';
      }
    } else if (nutrient === 'Sucres') {
      if (value >= 6.25 * this.coeff) {
        this.colorBadge = 'red';
      } else if (value >= 2.5 * this.coeff) {
        this.colorBadge = 'orange';
      } else {
        this.colorBadge = 'green';
      }
    } else {
      if (value >= 0.75 * this.coeff) {
        this.colorBadge = 'red';
      }
      if (value >= 0.15 * this.coeff) {
        this.colorBadge = 'orange';
      } else {
        this.colorBadge = 'green';
      }
    }

    return this.colorBadge;
  }

  evaluateNutritionMessage = () => {
    if (this.colorBadge === 'green') {
      return 'en faible quantité';
    }
    if (this.colorBadge === 'orange') {
      return 'en quantité modérée';
    }
    return 'en quantité élevée';
  }

  render() {
    const images = {
      a: {
        uri: require('../assets/nutriscore-a.png'),
      },
      b: {
        uri: require('../assets/nutriscore-b.png'),
      },
      c: {
        uri: require('../assets/nutriscore-c.png'),
      },
      d: {
        uri: require('../assets/nutriscore-d.png'),
      },
      e: {
        uri: require('../assets/nutriscore-e.png'),
      },
    };

    return (
      <ScrollView>
        {this.food.imageNutrients

          ? (
            <View>
              <Modal
                visible={this.state.isVisible}
                onRequestClose={() => this.setState({ isVisible: false })}
                animationType="fade"
                transparent
              >
                <ImageViewer imageUrls={[{ url: this.food.imageNutrients }]} />
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
              source={{ uri: this.food.imageNutrients }}
              style={styles.image}
            />
          </TouchableOpacity>
          {this.food.nutriscore !== undefined
            ? (
              <View style={styles.viewContainer}>
                <Image
                  source={images[this.food.nutriscore].uri}
                  style={{
                    width: screenWidth / 3,
                    height: screenWidth / 3,
                    resizeMode: 'contain',
                    marginTop: 10,
                  }}
                />
              </View>
            )

            : <View />
          }
        </View>
        {Object.keys(this.food.nutrients).length !== 0

          ? (
            <View>
              <View style={{ justifyContent: 'center', margin: 10, alignItems: 'center' }}>
                <Text style={styles.titleText}>Repère nutritionnels pour 100g: </Text>
              </View>
              <View style={{ marginRight: screenWidth / 8, marginLeft: screenWidth / 8 }}>
                <View style={styles.viewNutrition}>
                  <View style={[styles.nutritionColor, { backgroundColor: this.evaluateNutritionColor('Matières grasses', this.food.nutrients.fat_100g) }]} />

                  <Text style={styles.textNutrition}>
                    {this.food.nutrients.fat_100g}
                    {' '}
                g
                    {' '}
                    <Text style={{ fontWeight: 'bold' }}>
                    Matières grasses
                      {' '}
                    </Text>
                    <Text>{this.evaluateNutritionMessage()}</Text>
                  </Text>
                </View>

                <View style={{
                  margin: 5,
                  flexDirection: 'row',
                }}
                >

                  <View style={[styles.nutritionColor, { backgroundColor: this.evaluateNutritionColor('Graisses saturées', this.food.nutrients['saturated-fat_100g']) }]} />

                  <Text style={styles.textNutrition}>
                    {this.food.nutrients['saturated-fat_100g']}
                    {' '}
                g
                    {' '}
                    <Text style={{ fontWeight: 'bold' }}>
                    Graisses saturées
                      {' '}
                    </Text>
                    <Text>{this.evaluateNutritionMessage()}</Text>
                  </Text>
                </View>
                <View style={styles.viewNutrition}>
                  <View style={[styles.nutritionColor, { backgroundColor: this.evaluateNutritionColor('Sucres', this.food.nutrients.sugars_100g) }]} />

                  <Text style={styles.textNutrition}>
                    {this.food.nutrients.sugars_100g}
                    {' '}
                g
                    {' '}
                    <Text style={{ fontWeight: 'bold' }}>
                    Sucres
                      {' '}
                    </Text>
                    <Text>{this.evaluateNutritionMessage()}</Text>
                  </Text>
                </View>

                <View style={styles.viewNutrition}>
                  <View style={[styles.nutritionColor, { backgroundColor: this.evaluateNutritionColor('Sel', this.food.nutrients.salt_100g) }]} />

                  <Text style={styles.textNutrition}>
                    {this.food.nutrients.salt_100g}
                    {' '}
                g
                    {' '}
                    <Text style={{ fontWeight: 'bold' }}>
                    Sel
                      {' '}
                    </Text>
                    <Text>{this.evaluateNutritionMessage()}</Text>
                  </Text>
                </View>
              </View>
            </View>
          )

          : <View />

        }
      </ScrollView>
    );
  }
}
