import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapaScreen from '../screens/MapaScreen';
import LoadingScreen from '../screens/LoadingScreen';
import PermisosScreen from '../screens/PermisosScreen';
import { PermissionContext } from '../context/PermisosContext';

export default function Navigator() {
  const Stack = createNativeStackNavigator();
  const { permissions } = useContext(PermissionContext);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName="PermisosScreen"
    >
      {
        permissions.locationStatus === 'granted'
          ? <Stack.Screen name="MapaScreen" component={MapaScreen} />
          : <Stack.Screen name="PermisosScreen" component={PermisosScreen} />
      }
    </Stack.Navigator>
  );
}
