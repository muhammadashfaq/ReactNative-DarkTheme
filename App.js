import React, {useContext, useEffect} from 'react';
import Navigation from './src/navigation/MainNav';
import {ThemeManager} from './src/components/ThemeManager';

const App = () => {
  useEffect(() => {
    console.disableYellowBox = true;
  });

  return (
    <ThemeManager>
      <Navigation />
    </ThemeManager>
  );
};

export default App;
