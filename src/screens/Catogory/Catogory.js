import React, {Component} from 'react';
import {FlatList, ScrollView, View, TouchableOpacity} from 'react-native';
import styles from './styles';

class Catogory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategorie();
  }
  fetchCategorie = async () => {
    this.setState({loading: true});
    const response = await fetch(`https://kriss.io/wpjson/wp/v2/categories`);
    const categories = await response.json();
    this.setState({
      categories: categories,
    });
  };

  render() {
    return (
      <ScrollView>
        <FlatList
          data={this.state.categories}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('CategorieList', {
                  categorie_id: item.id,
                  categorie_name: item.name,
                })
              }>
              <Card>
                <Card.Content>
                  <Title>{item.name}</Title>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index}
        />
      </ScrollView>
    );
  }
}

export default Catogory;
