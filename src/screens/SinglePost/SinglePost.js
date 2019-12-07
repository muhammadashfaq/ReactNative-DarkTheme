import React, {Component} from 'react';
import {Share, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
  withTheme,
} from 'react-native-paper';
import HTML from 'react-native-render-html';
import {View, ScrollView, ActivityIndicator, Dimensions} from 'react-native';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      post: [],
      already_bookmark: false,
    };
  }

  componentDidMount = () => {
    this.fetchPost().then(() => {
      this.renderBookMark(this.props.navigation.getParam('post_id'));
    });
  };
  fetchPost = async () => {
    let post_id = this.props.navigation.getParam('post_id');
    const response = await fetch(
      `https://kriss.io/wp-json/wp/v2/posts?_embed&include=${post_id}`,
    );
    const post = await response.json();
    this.setState({
      post: post,
      isloading: false,
    });
  };

  saveBookMark = async post_id => {
    this.setState({already_bookmark: true});
  };

  saveBookMark = async post_id => {
    this.setState({already_bookmark: true});
    await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find(value => value === post_id);
        if (data == null) {
          res.push(post_id);
          AsyncStorage.setItem('bookmark', JSON.stringify(res));
        }
      } else {
        let bookmark = [];
        bookmark.push(post_id);
        AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
      }
    });
  };

  removeBookMark = async post_id => {
    this.setState({already_bookmark: false});
    const bookmark = await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token);
      return res.filter(e => e !== post_id);
    });
    await AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
  };

  renderBookMark = async post_id => {
    await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token);
      let data = res.find(value => value === post_id);
      return data == null
        ? this.setState({already_bookmark: false})
        : this.setState({already_bookmark: true});
    });
  };

  onShare = async (title, uri) => {
    Share.share({
      title: title,
      url: uri,
    });
  };

  render() {
    let post = this.state.post;
    const {colors} = this.props.theme;
    if (this.state.isloading) {
      return (
        <View
          style={{
            flex: 1,
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: '#CED0CE',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    }
    return (
      <ScrollView>
        <Card>
          <Card.Content>
            <Title>{post[0].title.rendered} </Title>
            <List.Item
              title={`${post[0]._embedded.author[0].name}`}
              description={`${post[0]._embedded.author[0].description}`}
              left={props => {
                return (
                  <Avatar.Image
                    size={55}
                    source={{
                      uri: `${post[0]._embedded.author[0].avatar_urls[96]}`,
                    }}
                  />
                );
              }}
              right={props => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.onShare(post[0].title.rendered, post[0].link)
                    }>
                    <FontAwesome name="share" size={30} />
                  </TouchableOpacity>
                );
              }}
            />
            <List.Item
              title={`Published on ${moment(
                post[0].date,
                'YYYYMMDD',
              ).fromNow()}`}
              right={props => {
                if (this.state.already_bookmark == true) {
                  return (
                    <TouchableOpacity
                      onPress={() => this.removeBookMark(post[0].id)}>
                      <FontAwesome name="bookmark" size={30} />
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      onPress={() => this.saveBookMark(post[0].id)}>
                      <FontAwesome name="bookmark-o" size={30} />
                    </TouchableOpacity>
                  );
                }
              }}
            />
            <Paragraph />
          </Card.Content>
          <Card.Cover source={{uri: post[0].jetpack_featured_media_url}} />
          <Card.Content>
            <HTML
              html={post[0].content.rendered}
              imagesInitialDimensions={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').width * 2,
              }}
              tagsStyles={{p: {color: colors.text}}}
            />
          </Card.Content>
        </Card>
      </ScrollView>
    );
  }
}

export default withTheme(SinglePost);
