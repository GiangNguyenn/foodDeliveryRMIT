import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import AdminHome from '../admin/AdminHome'

const AdminStack = createStackNavigator()

function AdminStackScreen() {
    return (
        <AdminStack.Navigator initialRouteName={'Landing'}>
            <AdminStack.Screen
                name="AdminHome"
                component={AdminHome}
                options={{ headerShown: false }}
            ></AdminStack.Screen>
        </AdminStack.Navigator>
    )
}

export default AdminStackScreen
