import React from 'react';
import {
  StyleSheet, View, Text, Image, TouchableHighlight, Alert
  ,
} from 'react-native';
import { Icon } from 'react-native-elements';
import DialogInput from 'react-native-dialog-input';


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

class FoodItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRemoveDialogVisible: false,
      isAddDialogVisible: false,
    };
  }

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
                type="material-community"
                color="#517fa4"
                size={20}
                onPress={() => {
                  Alert.alert(
                    'Confirmation de suppression',
                    'Voulez-vous supprimer ce produit de votre liste ?',
                    [
                      {
                        text: 'Non',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      { text: 'Oui', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: true },
                  );
                }}
              />
              <Icon
                reverse
                name="playlist-minus"
                type="material-community"
                color="#517fa4"
                size={20}
                onPress={() => {
                  this.setState({ isRemoveDialogVisible: true });
                }}
              />
              <Icon
                reverse
                name="playlist-plus"
                type="material-community"
                color="#517fa4"
                size={20}
                onPress={() => {
                  this.setState({ isAddDialogVisible: true });
                }}
              />

            </View>
          </View>
          <DialogInput
            isDialogVisible={this.state.isRemoveDialogVisible}
            title="Quantité à supprimer"
            message="Entrer la quantité du produit à supprimer de la liste"
            submitText="Supprimer"
            cancelText="Annuler"
            textInputProps={{ keyboardType: 'numeric' }}
            submitInput={(inputText) => { this.sendInput(inputText); }}
            closeDialog={() => { this.setState({ isRemoveDialogVisible: false }); }}
          />

          <DialogInput
            isDialogVisible={this.state.isAddDialogVisible}
            title="Quantité à ajouter"
            message="Entrer la quantité du produit à ajouter à la liste"
            submitText="Ajouter"
            cancelText="Annuler"
            textInputProps={{ keyboardType: 'numeric' }}
            submitInput={(inputText) => { this.sendInput(inputText); }}
            closeDialog={() => { this.setState({ isAddDialogVisible: false }); }}
          />
        </View>
      </TouchableHighlight>
    );
  }
}


export default FoodItem;
