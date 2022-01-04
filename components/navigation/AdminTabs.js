import React, { Component } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import AddInventory from '../admin/AddInventory'
import DeleteInventory from '../admin/DeleteInventory'
import AdminHome from '../admin/AdminHome'
import AdminStackScreen from './AdminStackScreen'

import { themeColor } from '../../style/constants'

const AdminTab = createBottomTabNavigator()

export class AdminTabs extends Component {
    render() {
        return (
            <AdminTab.Navigator
                initialRouteName={'admin-stack'}
                screenOptions={screenOptions}
            >
                <AdminTab.Screen
                    name="admin-stack"
                    component={AdminStackScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons
                                name="home"
                                color={color}
                                size={29}
                                style={{ marginTop: 1 }}
                            />
                        ),
                    }}
                />
                <AdminTab.Screen
                    name="admin-add"
                    component={AddInventory}
                    options={{
                        tabBarLabel: 'Add',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons
                                name="person"
                                color={color}
                                size={29}
                                style={{ marginTop: 1 }}
                            />
                        ),
                    }}
                />
                <AdminTab.Screen
                    name="admin-deleteÏ"
                    component={DeleteInventory}
                    options={{
                        tabBarLabel: 'Delete',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons
                                name="search"
                                color={color}
                                size={29}
                                style={{ marginTop: 1 }}
                            />
                        ),
                    }}
                />
            </AdminTab.Navigator>
        )
    }
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

export default AdminTabs
