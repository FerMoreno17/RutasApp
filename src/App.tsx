import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigator from './navigation/navigator';
import { PermissionsProvider } from './context/PermisosContext';

const App = () => {
  return (
    <NavigationContainer>
      <PermissionsProvider>
        <Navigator />
      </PermissionsProvider>
    </NavigationContainer>
  );
};

export default App;
