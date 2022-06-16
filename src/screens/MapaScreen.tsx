import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function MapaScreen() {
  return (
    <SafeAreaView>
      <Text>MapaScreen</Text>
      <Icon
        name="search"
        color={'red'}
        size={30}
      />
    </SafeAreaView>
  );
}
