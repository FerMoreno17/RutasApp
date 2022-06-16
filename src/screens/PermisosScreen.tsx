import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useContext } from 'react';
import { PermissionContext } from '../context/PermisosContext';

export default function PermisosScreen() {
  const { permissions, askLocationPermission } = useContext(PermissionContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: 'orange',
      padding: 10,
      borderRadius: 4,
    },
    label: {
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <Text>PermisosScreen</Text>
      <Pressable
        style={styles.button}
        onPress={askLocationPermission}
      >
        <Text style={styles.label}>Permiso GPS</Text>
      </Pressable>
      <Text >
        {JSON.stringify(permissions, null, 2)}
      </Text>
    </View>
  );
}
