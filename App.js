import React from 'react'
import { AsyncStorage } from 'react-native'
import * as firebase from 'firebase'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from './components/auth/Login'
import LandingScreen from './components/auth/Landing'
import { SignUp } from './components/auth/Signup'
import { RestaurantListing } from './components/restaurant/RestaurantListing'
import { LogBox } from 'react-native'
LogBox.ignoreLogs(['Setting a timer'])
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

const getCache = async (key) => {
    try {
        let value = await AsyncStorage.getItem(key)
        return value
    } catch (e) {
        console.log('caught error', e)
    }
}
const Stack = createStackNavigator()
export default function App() {
    // const user = getCache('user')
    const user = ''
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={user ? 'restaurant-listing' : 'landing'}
            >
                <Stack.Screen
                    name="Landing"
                    component={LandingScreen}
                    options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen
                    name="login"
                    component={Login}
                    options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen
                    name="signup"
                    component={SignUp}
                    options={{ headerShown: false }}
                ></Stack.Screen>
                <Stack.Screen
                    name="restaurant-listing"
                    component={RestaurantListing}
                    options={{ headerShown: false }}
                ></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
