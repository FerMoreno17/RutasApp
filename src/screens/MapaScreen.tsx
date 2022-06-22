/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-return-assign */
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import MapView,
{
  Polyline,
  PROVIDER_GOOGLE, /*, Marker*/
} from 'react-native-maps';
import Fab from '../components/Fab.component';
import useLocation from '../hooks/useLocation';
import LoadingScreen from './LoadingScreen';


export default function MapaScreen() {
  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines } = useLocation();
  const mapViewRef = useRef<MapView>();
  const followingUser = useRef<boolean>(true);
  const [showPolilyne, setShowPolilyne] = useState(false);

  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    fabContainer: {
      position: 'absolute',
      bottom: 15,
      right: 15,
    },
  });

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    if (followingUser.current === false) { return; }

    const { latitude, longitude } = userLocation;
    mapViewRef.current?.animateCamera({
      center: {
        latitude: latitude,
        longitude: longitude,
      },
    });
  }, [userLocation]);

  async function centerPosition() {
    const respuesta = await getCurrentLocation();
    followingUser.current = true;

    mapViewRef.current?.animateCamera({
      center: {
        latitude: respuesta.latitude,
        longitude: respuesta.longitude,
      },
    });
  }

  function handleShowPolilyne() {
    setShowPolilyne(!showPolilyne);
  }

  if (hasLocation === false) { return <LoadingScreen />; }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.fabContainer}>
        <Fab
          iconName="pencil"
          iconSize={30}
          onPress={handleShowPolilyne}
        />
        <Fab
          iconName="compass-outline"
          iconSize={40}
          onPress={centerPosition}
        />
      </View>
      <MapView
        ref={(element) => mapViewRef.current = element!}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation
        region={{
          latitude: initialPosition!.latitude,
          longitude: initialPosition!.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onTouchStart={() => followingUser.current = false}
      >
        {showPolilyne && <Polyline
          coordinates={routeLines}
          strokeColor="blue"
          strokeWidth={3}
        />}
        {/* <Marker
          image={require('../asssets/custom-marker.png')}
          coordinate={{
            latitude: -34.717925,
            longitude: -58.566791,
          }}
          title={'Prueba'}
          description={'Marcador de prueba'}
        /> */}
      </MapView>
    </SafeAreaView>
  );
}
