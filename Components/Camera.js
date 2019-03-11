import React from 'react';
import {StyleSheet, View } from 'react-native';
import  { RNCamera }  from 'react-native-camera';


export default class Camera extends React.Component {

  constructor(props) {
      super(props)
  }

  onBarCodeRead = (scan) => {
    this.props.navigation.state.params.onNavigateBack(scan.data);
    this.props.navigation.goBack();
  }

  render() {
    return (
      <RNCamera
        onBarCodeRead={this.onBarCodeRead}
        style={[StyleSheet.absoluteFill, styles.container]}
        captureAudio={false}
      >
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </RNCamera>
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