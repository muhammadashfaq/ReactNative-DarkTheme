import React, {useContext} from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import BottomTabs from './BottomNav';
import {
  Provider as PaperProvider,
  DarkTheme,
  DefaultTheme,
} from 'react-native-paper';
import {ThemeContext} from './../components/ThemeManager';

const Navigator = createAppContainer(BottomTabs);

export default () => {
  const {theme} = useContext(ThemeContext);
  let paper_theme = theme ? DarkTheme : DefaultTheme;
  let nav_theme = theme ? 'dark' : 'light';

  return (
    <PaperProvider theme={paper_theme}>
      <Navigator theme={nav_theme} />
    </PaperProvider>
  );
};
