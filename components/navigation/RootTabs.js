import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { themeColor } from '../../style/constants'
import { UserProfile } from '../profile/UserProfile'
import SearchStackScreen from './SearchStackScreen'
import RestaurantStackScreen from './RestaurantStackScreen'

const Tab = createBottomTabNavigator()

export default function RootTabs () {
    return (
        <Tab.Navigator
            initialRouteName={'restaurant-stack'}
            screenOptions={screenOptions}
        >
            <Tab.Screen
                name='restaurant-stack'
                component={RestaurantStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name='home'
                            color={color}
                            size={29}
                            style={{ marginTop: 1 }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name='profile'
                component={UserProfile}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name='person'
                            color={color}
                            size={29}
                            style={{ marginTop: 1 }}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name='search'
                component={SearchStackScreen}
                options={{
                    tabBarLabel: 'Search',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons
                            name='search'
                            color={color}
                            size={29}
                            style={{ marginTop: 1 }}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

const screenOptions = {
    tabBarInactiveBackgroundColor: 'white',
    tabBarActiveBackgroundColor: 'white',
    tabBarInactiveTintColor: 'grey',
    tabBarActiveTintColor: themeColor.RMITRed,
    tabBarIconStyle: { marginTop: 4 },
    tabBarLabelStyle: {
        fontSize: 13,
        color: 'grey',
        paddingBottom: 0,
    },
    tabBarStyle: {
        height: 55,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 4,
        borderTopWidth: 1,
    },
    style: { borderColor: '#011f3b' },
    headerShown: false,
    unmountOnBlur: true,
}
