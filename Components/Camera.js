import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

const { width } = Dimensions.get('window');

export default class Camera extends React.Component {

  constructor(props)
  {
      super(props)

      this.state = {
        hasCameraPermission: null,
      }

  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
    }

  render() {

    const hasCameraPermission  = this.state;

    if (hasCameraPermission === null) {
      return <Text>Demande de permission pour la caméra</Text>;
    }

    if (hasCameraPermission === false) {
      return <Text>Accès à la caméra non autorisé</Text>;
    }

    return (
      <BarCodeScanner
        onBarCodeRead={(scan) => this.props.navigation.navigate("Search", {textScan: scan.data})}
        style={[StyleSheet.absoluteFill, styles.container]}
      >
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </BarCodeScanner>
    );
  }
}

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row'
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity
  },
  focused: {
    flex: 10
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity
  },
});