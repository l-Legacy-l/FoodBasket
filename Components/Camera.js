import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Icon } from 'react-native-elements';

const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 10,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity,
  },
});

export default class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.isBarCodeRead = false;

    this.state = {
      flashState: 'off',
    };
  }

  onBarCodeRead = (scan) => {
    if (!this.isBarCodeRead) {
      this.props.navigation.state.params.onNavigateBack(scan.data);
      this.props.navigation.goBack();
      this.isBarCodeRead = true;
    }
  }

  render() {
    return (
      <RNCamera
        onBarCodeRead={this.onBarCodeRead}
        style={[StyleSheet.absoluteFill, styles.container]}
        captureAudio={false}
        flashMode={this.state.flashState}
      >
        <View style={styles.layerTop}>
          <View style={{
            position: 'absolute',
            top: 10,
            left: 10,
          }}
          >
            <Icon
              name="flash-outline"
              type="material-community"
              size={34}
              color="white"
              onPress={() => {
                if (this.state.flashState === 'torch') {
                  this.setState({ flashState: 'off' });
                } else {
                  this.setState({ flashState: 'torch' });
                }
              }}
            />
          </View>
        </View>
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
