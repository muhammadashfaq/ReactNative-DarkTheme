import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Card, Headline, Title, Paragraph} from 'react-native-paper';
import HTMLRender from 'react-native-render-html';
import moment from 'moment';

import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';

class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmark_post: [],
      isFetching: false,
    };
  }

  componentDidMount = () => {
    this.fetchBookMark();
  };

  fetchBookMark = async () => {
    let bookmark = await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token);
      if (res != null) {
        const result = res.map(post_id => {
          return 'include[]=' + post_id;
        });
        return result.join('&');
      } else {
        return null;
      }
    });
    const url = `https://kriss.io/wp-json/wp/v2/posts?${bookmark}`;
    console.log(url);
    const response = await fetch(url);
    const post = await response.json();
    //this.setState({ posts: post });
    this.setState({bookmark_post: post});
  };

  render() {
    return (
      <View>
        <Headline style={{marginLeft: 30}}>Bookmark Post</Headline>
        <FlatList
          data={this.state.bookmark_post}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('SinglePost', {
                  post_id: item.id,
                })
              }>
              <Card
                style={{
                  shadowOffset: {width: 5, height: 5},
                  width: '90%',
                  borderRadius: 12,
                  alignSelf: 'center',
                  marginBottom: 10,
                }}>
                <Card.Cover source={{uri: item.jetpack_featured_media_url}} />

                <Card.Content>
                  <Title>{item.title.rendered}</Title>
                  <Paragraph>
                    Published on {moment(item.date).fromNow()}
                  </Paragraph>
                </Card.Content>
                {/* <Card.Content>
                  <Card.Content>
                    <HTMLRender html={item.excerpt.rendered} />
                  </Card.Content>
                </Card.Content> */}
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

export default Bookmark;
