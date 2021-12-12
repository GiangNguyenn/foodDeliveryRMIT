import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../auth/Login'
import LandingScreen from '../auth/Landing'
import { SignUp } from '../auth/Signup'

const AuthStack = createStackNavigator()

function AuthStackScreen() {
    return (
        <AuthStack.Navigator initialRouteName={'Landing'}>
            <AuthStack.Screen
                name="Landing"
                component={LandingScreen}
                options={{ headerShown: false }}
            ></AuthStack.Screen>
            <AuthStack.Screen
                name="login"
                component={Login}
                options={{ headerShown: false }}
            ></AuthStack.Screen>
            <AuthStack.Screen
                name="signup"
                component={SignUp}
                options={{ headerShown: false }}
            ></AuthStack.Screen>
        </AuthStack.Navigator>
    )
}

export default AuthStackScreen
