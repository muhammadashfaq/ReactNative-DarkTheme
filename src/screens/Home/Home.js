import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import styles from './styles';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
  Headline,
  withTheme,
} from 'react-native-paper';
import CardRow from './components/Card';
import HTMLRender from 'react-native-render-html';
import moment from 'moment';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastestpost: '',
      isFetching: false,
      page: 1,
    };
  }

  componentDidMount() {
    this.fetchLastestPost();
  }

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.fetchLastestPost();
      },
    );
  };

  onRefresh = () => {
    this.setState({isFetching: true}, () => {
      this.fetchLastestPost();
    });
  };

  fetchLastestPost = async () => {
    const {page} = this.state;
    const response = await fetch(
      `https://kriss.io/wp-json/wp/v2/posts?per_page=5&page=${page}`,
    );
    const post = await response.json();
    this.setState({
      lastestpost: page === 1 ? post : [...this.state.lastestpost, ...post],
      isFetching: false,
    });
  };

  renderFooter = () => {
    if (this.state.isFetching) return null;
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  renderItem = () => {
    return (
      <View>
        <Card
          style={{
            shadowOffset: {width: 5, height: 5},
            width: '90%',
            borderRadius: 12,
            alignSelf: 'center',
            marginBottom: 10,
          }}>
          <Card.Content>
            <Title>Blog post</Title>
            <Card.Cover
              style={{
                width: 350,
                height: 190,
                alignSelf: 'center',
              }}
              source={{
                uri: '',
              }}
            />
            <Paragraph>just a blog post</Paragraph>
          </Card.Content>
        </Card>
      </View>
    );
  };

  render() {
    const {colors} = this.props.theme;
    return (
      <View style={styles.mainContianer}>
        <Headline style={{marginLeft: 10, fontSize: 16}}>Lastest Post</Headline>
        <FlatList
          data={this.state.lastestpost}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderFooter}
          renderItem={({item}) => (
            <CardRow
              item={item}
              navigation={this.props.navigation}
              textColor={colors.text}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export default withTheme(Home);
