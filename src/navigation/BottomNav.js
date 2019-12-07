import React, {Component} from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

//screens
import Home from '../screens/Home/Home';
import Categories from '../screens/Catogory/Catogory';
import Setting from '../screens/Setting/Setting';
import Bookmark from '../screens/Bookmark/Bookmark';
import SinglePost from '../screens/SinglePost/SinglePost';

const HomeNav = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: 'React Native Pro',
      },
    },
    SinglePost: {
      screen: SinglePost,
      navigationOptions: {
        title: 'Post Details',
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

const CategoryNav = createStackNavigator(
  {
    Categories: {
      screen: Categories,
      navigationOptions: {
        title: 'Categoires',
      },
    },
  },
  {
    initialRouteName: 'Categories',
  },
);

const BookmarkNav = createStackNavigator(
  {
    Bookmark: {
      screen: Bookmark,
      navigationOptions: {
        title: 'Bookmark',
      },
    },
  },
  {
    initialRouteName: 'Bookmark',
  },
);
const SettingNav = createStackNavigator(
  {
    Setting: {
      screen: Setting,
      navigationOptions: {
        title: 'Setting',
      },
    },
  },
  {
    initialRouteName: 'Setting',
  },
);

const bottomTabs = createBottomTabNavigator({
  Home: {
    screen: HomeNav,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => (
        <Ionicons name="md-home" style={{color: tintColor}} size={30} />
      ),
    },
  },
  Category: {
    screen: CategoryNav,
    navigationOptions: {
      tabBarLabel: 'Category',
      tabBarIcon: ({tintColor}) => (
        <Ionicons name="md-apps" style={{color: tintColor}} size={30} />
      ),
    },
  },
  Bookmark: {
    screen: BookmarkNav,
    navigationOptions: {
      tabBarLabel: 'Bookmark',
      tabBarIcon: ({tintColor}) => (
        <Ionicons name="ios-bookmark" style={{color: tintColor}} size={30} />
      ),
    },
  },
  Setting: {
    screen: SettingNav,
    navigationOptions: {
      tabBarLabel: 'Setting',
      tabBarIcon: ({tintColor}) => (
        <Ionicons name="md-settings" size={30} style={{color: tintColor}} />
      ),
    },
  },
});

export default bottomTabs;
