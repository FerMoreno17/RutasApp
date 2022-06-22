import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export interface FabProps {
    iconName?: string;
    iconSize?: number;
    iconColor?: string;
    backColor?: string;
    onPress: () => void;
}

export default function Fab({
    iconName = 'add',
    iconSize = 20,
    iconColor = 'white',
    onPress,
    backColor = 'black' }: FabProps) {

    const styles = StyleSheet.create({
        button: {
            backgroundColor: backColor,
            zIndex: 999,
            height: 50,
            width: 50,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 5,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
        },
        icon: {
            left: 1.5,
        },
    });

    return (
        <Pressable
            style={styles.button}
            onPress={onPress}
        >
            <Icon
                name={iconName}
                color={iconColor}
                size={iconSize}
                style={styles.icon}
            />
        </Pressable>
    );
}
