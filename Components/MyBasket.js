import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class MyBasket extends PureComponent {
  render() {
    return (
      <ScrollView>
        {
          this.props.screenProps.foodList.map(item => (
            <ListItem
              key={item.barcode}
              title={item.name}
              titleStyle={{ fontSize: 22 }}
              leftAvatar={{
                source: { uri: item.image },
                size: 'large',
                rounded: false,
                avatarStyle: { borderRadius: 20 },
                overlayContainerStyle: { backgroundColor: 'transparent' },

              }}
              subtitle={item.barcode}
              subtitleStyle={{ marginTop: 10 }}
              badge={{ value: item.quantity, badgeStyle: { backgroundColor: '#517fa4', width: 40, height: 25 }, textStyle: { fontSize: 18 } }}
              chevron
              bottomDivider
              onPress={() => console.log('press')}
            />
          ))
        }
      </ScrollView>
    );
  }
}
