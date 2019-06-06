import React, { PureComponent } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ScrollView,
} from 'react-native';
import Form from './Form';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#455a64',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signupTextCont: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingVertical: 16,
    flexDirection: 'row',
  },
  signupText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 16,
  },
  signupButton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default class Signup extends PureComponent {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Form navigate={() => this.props.navigation.navigate('Tabs')} type="Se connecter" screenProps={this.props.screenProps} />
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Vous n'êtes pas encore inscris ?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
            <Text style={styles.signupButton}> S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    );
  }
}
