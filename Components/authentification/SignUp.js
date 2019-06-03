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
        <Form navigate={() => this.props.navigation.navigate('SignIn')} type="SignUp" />
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Vous avez déjà un compte ?</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignIn')}>
            <Text style={styles.signupButton}> Se connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    );
  }
}
