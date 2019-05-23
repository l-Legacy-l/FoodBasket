import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { SearchBar, Icon, ListItem } from 'react-native-elements';
import { searchFoodByName } from '../API/OFFApi';


export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showLoading: false,
    };
    this.page = 1;
    this.totalPages = 1;
  }

  updateSearch = (search) => {
    this.page = 1;
    this.totalPages = 1;
    this.setState({ search });
    this.displayFoods(search);
  };

  displayFoods = (search) => {
    if (search !== '') {
      this.setState({ showLoading: true });
      searchFoodByName(search, this.pageToReach).then((data) => {
        /*  // Defining the max food displayed
        if ((data.count > 0 && data.count < 700) || data.count === 0) */
        this.totalPages = Math.ceil(data.count / 20);
        this.setState({ data: data.products });

        this.setState({ showLoading: false });
      });
    } else {
      this.setState({ data: [] });
    }
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      key={item.code}
      title={item.product_name_fr}
      titleStyle={{ fontSize: 20 }}
      leftAvatar={{
        source: { uri: item.image_front_url },
        size: 'large',
        rounded: false,
        avatarStyle: { borderRadius: 20 },
        overlayContainerStyle: { backgroundColor: 'transparent' },
      }}
      bottomDivider
      rightIcon={(
        <Icon
          reverse
          name="cart-plus"
          type="material-community"
          color="#517fa4"
          size={16}
          onPress={() => {
            console.log('je passe icon');
          }}
        />
      )}
    />
  )

  render() {
    const { search } = this.state;

    return (
      <View>
        <SearchBar
          placeholder="Entrer le nom du produit ici"
          onChangeText={this.updateSearch}
          value={search}
          lightTheme
          round
          showLoading={this.state.showLoading}
          inputStyle={{ color: 'black' }}
          searchIcon={(
            <Icon
              name="magnify"
              type="material-community"
              color="black"
            />
        )}
        />

        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.data}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            this.page += 1;
            if (this.state.data.length > 0 && this.page < this.totalPages) {
              this.setState({ showLoading: true });
              searchFoodByName(search, this.page).then((data) => {
                // Defining the max food displayed
                console.log(`je passe data ${JSON.stringify([...this.state.data, ...data.products])}`);
                this.setState({ data: [...this.state.data, ...data.products] });

                this.setState({ showLoading: false });
              });
            }
          }}
        />
      </View>
    );
  }
}
