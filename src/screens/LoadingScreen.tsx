import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';

export default function LoadingScreen() {
  const styles = StyleSheet.create({
    spinner: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.spinner}>
      <ActivityIndicator
        color={'green'}
        size={30}
      />
      <Text>Cargando...</Text>
    </View>
  );
}
