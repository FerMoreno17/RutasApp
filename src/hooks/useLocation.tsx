/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';

export interface Location {
    latitude: number;
    longitude: number;
}

export default function useLocation() {
    const watchId = useRef<number>();
    const isMounted = useRef(true);
    const [hasLocation, setHasLocation] = useState(false);
    const [routeLines, setRouteLines] = useState<Location[]>([]);
    const [initialPosition, setInitialPosition] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });
    const [userLocation, setUserLocation] = useState<Location>({
        latitude: 0,
        longitude: 0,
    });

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }
    }, []);

    useEffect(() => {
        getCurrentLocation()
            .then(location => {
                if (!isMounted.current) { return; }

                setInitialPosition(location);
                setUserLocation(location);
                setRouteLines(routes => [...routes, location]);
                setHasLocation(true);
            });
    }, []);

    function getCurrentLocation(): Promise<Location> {
        return new Promise((resolve, rejected) => {
            const config = {
                enableHighAccuracy: true,
            };

            Geolocation.getCurrentPosition(
                info => {
                    resolve({
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude,
                    });
                },
                error => rejected({ error }),
                config,
            );
        });
    }

    function followUserLocation() {
        const config = {
            enableHighAccuracy: true,
            distanceFilter: 10,
        };

        watchId.current = Geolocation.watchPosition(
            info => {
                const location: Location = ({
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                });
                setUserLocation(location);
                setRouteLines(routes => [...routes, location]);

            },
            error => console.log('Error==>', error),
            config,
        );
    }

    function stopFollowUserLocation() {
        if (watchId.current) {
            Geolocation.clearWatch(watchId.current);
        }
    }

    return {
        hasLocation,
        initialPosition,
        getCurrentLocation,
        followUserLocation,
        userLocation,
        stopFollowUserLocation,
        routeLines,
    };
}
