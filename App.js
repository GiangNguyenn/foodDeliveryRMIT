import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as firebase from 'firebase'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import LandingScreen from './components/auth/Landing'

const firebaseConfig = {
    apiKey: 'AIzaSyCA-73uydGV9cFM2ha4ngUuWHNmp-byeFE',
    authDomain: 'rmit-canteen.firebaseapp.com',
    projectId: 'rmit-canteen',
    storageBucket: 'rmit-canteen.appspot.com',
    messagingSenderId: '586872016263',
    appId: '1:586872016263:web:786533cb45fb1826c69722',
    measurementId: 'G-3038RMVNHE',
}

firebase.apps.length === 0 ? firebase.initializeApp(firebaseConfig) : {}

const Stack = createStackNavigator()
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing">
                <Stack.Screen
                    name="Landing"
                    component={LandingScreen}
                    options={{ headerShown: false }}
                ></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}