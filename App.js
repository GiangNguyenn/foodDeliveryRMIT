import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import * as firebase from 'firebase'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import { getWithDocument } from './backend/get'

import AuthStackScreen from './components/navigation/AuthStackScreen'
import RootTabs from './components/navigation/RootTabs'
import AdminStackScreen from './components/navigation/AdminStackScreen'

import { LogBox } from 'react-native'
import { View } from 'react-native'

LogBox.ignoreLogs(['AsyncStorage has been extracted'])
LogBox.ignoreLogs(['Setting a timer'])
LogBox.ignoreLogs(['[Unhandled promise rejection:'])

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

const AppStack = createStackNavigator()
const RootStack = createStackNavigator()

const AppStackScreen = () => (
    <AppStack.Navigator initialRouteName={'root-tabs'}>
        <AppStack.Screen
            name="root-tabs"
            component={RootTabs}
            options={{ headerShown: false }}
        ></AppStack.Screen>
    </AppStack.Navigator>
)

export default class App extends Component {
    constructor(props) {
        super()
        this.state = {
            loaded: true,
            loggedIn: false,
            isAdmin: false,
        }
    }

    async componentDidMount() {
        this.fireBaseListener = firebase
            .auth()
            .onAuthStateChanged(async (user) => {
                if (user) {
                    const currentUser = await getWithDocument(
                        'user',
                        firebase.auth().currentUser.uid
                    )
                    currentUser?.isAdmin === true
                        ? this.setState({
                              loggedIn: true,
                              loaded: true,
                              isAdmin: true,
                          })
                        : this.setState({
                              loggedIn: true,
                              loaded: true,
                              isAdmin: false,
                          })
                } else {
                    this.setState({
                        loggedIn: false,
                        loaded: true,
                        isAdmin: false,
                    })
                }
            })
    }

    async componentWillUnmount() {
        this.fireBaseListener && this.fireBaseListener()
    }

    render() {
        const { loggedIn, isAdmin } = this.state
        // firebase.auth().signOut()
        console.log(`this.state`, this.state)

        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <NavigationContainer>
                    <RootStack.Navigator>
                        {loggedIn ? (
                            !isAdmin ? (
                                <RootStack.Screen
                                    name="AppStack"
                                    component={AppStackScreen}
                                    options={{ headerShown: false }}
                                ></RootStack.Screen>
                            ) : (
                                <RootStack.Screen
                                    name="AdminStack"
                                    component={AdminStackScreen}
                                    options={{ headerShown: false }}
                                ></RootStack.Screen>
                            )
                        ) : (
                            <RootStack.Screen
                                name="AuthStack"
                                component={AuthStackScreen}
                                options={{ headerShown: false }}
                            ></RootStack.Screen>
                        )}
                    </RootStack.Navigator>
                </NavigationContainer>
            </View>
        )
    }
}
