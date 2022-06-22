/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { check, openSettings, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';

export interface PermissionsState {
    //aca van todos los permisos que necesitemos para la app
    locationStatus: PermissionStatus
}

export const permissionInitialState: PermissionsState = {
    locationStatus: 'unavailable',
};

type PermisosContextProps = {
    permissions: PermissionsState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
}

export const PermissionContext = createContext({} as PermisosContextProps);

export const PermissionsProvider = ({ children }: any) => {
    const [permissions, setPermissions] = useState(permissionInitialState);
    let respuesta: PermissionStatus;

    useEffect(() => {
        checkLocationPermission();
        AppState.addEventListener('change', state => {
            if (state !== 'active') { return; }
            checkLocationPermission();
        });
    }, []);

    const askLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            respuesta = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }
        if (Platform.OS === 'android') {
            respuesta = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        if (respuesta === 'blocked') {
            openSettings();
        }

        setPermissions({ ...permissions, locationStatus: respuesta });
    };

    const checkLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            respuesta = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        }
        if (Platform.OS === 'android') {
            respuesta = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        setPermissions({ ...permissions, locationStatus: respuesta });
    };

    return (
        <PermissionContext.Provider
            value={{
                permissions,
                askLocationPermission,
                checkLocationPermission,
            }}
        >
            {children}
        </PermissionContext.Provider>
    );
};
