import React, {Component, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import HTMLRender from 'react-native-render-html';
import moment from 'moment';

export default ({item, navigation, textColor}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SinglePost', {
          post_id: item.id,
        });
      }}>
      <Card
        style={[
          {
            shadowOffset: {width: 5, height: 5},
            width: '90%',
            borderRadius: 12,
            alignSelf: 'center',
            marginBottom: 10,
          },
        ]}>
        <Card.Cover source={{uri: item.jetpack_featured_media_url}} />
        <Card.Content>
          <Title style={{fontSize: 16}}>{item.title.rendered}</Title>
          <Paragraph style={{fontSize: 14}}>
            Published on {moment(item.date).fromNow()}
          </Paragraph>
        </Card.Content>
        {/* <Card.Content>
          <Card.Content>
            <HTMLRender
              html={item.excerpt.rendered}
              tagsStyles={{p: {color: textColor}}}
            />
          </Card.Content>
        </Card.Content> */}
      </Card>
    </TouchableOpacity>
  );
};
