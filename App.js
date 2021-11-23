import { StatusBar } from 'expo-status-bar'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as firebase from 'firebase'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import LandingScreen from './components/auth/Landing'
import Login from './components/auth/Login'

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

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            loggedIn: false,
        }
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            !user
                ? this.setState({
                      loaded: true,
                      loggedIn: false,
                  })
                : this.setState({
                      loaded: true,
                      loggedIn: true,
                  })
        })
    }
    render() {
        const { loggedIn, loaded } = this.state
        !loaded ? (
            <View>
                <Text>Loading</Text>
            </View>
        ) : (
            {}
        )
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Landing">
                    <Stack.Screen
                        name="Landing"
                        component={LandingScreen}
                        options={{ headerShown: false }}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={{ headerShown: false }}
                    ></Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default App
