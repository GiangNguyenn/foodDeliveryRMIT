import React, { Component } from 'react'
import { View, Text, LogBox} from 'react-native'
// import { AsyncStorage } from '@react-native-async-storage/async-storage'
import * as firebase from 'firebase'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

import { Home } from './Home'
import Login from './components/auth/Login'
import LandingScreen from './components/auth/Landing'
import { SignUp } from './components/auth/Signup'
import { RestaurantListing } from './components/restaurant/RestaurantListing'
import { RestaurantDetail } from './components/restaurant/restaurant-detail/RestaurantDetail'
import { UserProfile } from './components/profile/UserProfile'
import { SearchEngine } from './components/search/SearchEngine'

LogBox.ignoreAllLogs()

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

// const getCache = async (key) => {
//     try {
//         let value = await AsyncStorage.getItem(key)
//         return value
//     } catch (e) {
//         console.log('caught error', e)
//     }
// }

const AppStack = createStackNavigator()
const RootStack = createStackNavigator()
const AuthStack = createStackNavigator()
const RestaurantStack = createStackNavigator()
const Tab = createBottomTabNavigator()

const AuthStackScreen = () => (
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

const RestaurantStackScreen = () => (
    <RestaurantStack.Navigator initialRouteName={'restaurant-listing'}>
        <RestaurantStack.Screen
            name="restaurant-listing"
            component={RestaurantListing}
            options={{ headerShown: false }}
        ></RestaurantStack.Screen>
        <RestaurantStack.Screen
            name="restaurant-detail"
            component={RestaurantDetail}
            options={{ headerShown: false }}
        ></RestaurantStack.Screen>
    </RestaurantStack.Navigator>
)

const RootTabs = () => (
    <Tab.Navigator initialRouteName={'restaurant-stack'}>
        <Tab.Screen name="restaurant-stack" component={RestaurantStackScreen} />
        <Tab.Screen name="profile" component={UserProfile} />
        <Tab.Screen name="search" component={SearchEngine} />
    </Tab.Navigator>
)

const AppStackScreen = () => (
    <AppStack.Navigator initialRouteName={'root-tabs'}>
        <AppStack.Screen
            name="root-tabs"
            component={RootTabs}
            options={{ headerShown: false }}
        ></AppStack.Screen>
    </AppStack.Navigator>
)

export class App extends Component {
    constructor(props) {
        super()
        this.state = {
            loaded: false,
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                this.setState({
                    loggedIn: false,
                    loaded: true,
                })
            } else {
                this.setState({
                    loggedIn: true,
                    loaded: true,
                })
            }
        })
    }

    render() {
        const { loggedIn, loaded } = this.state

        // if (!loaded) {
        //     return (
        //         <View style={{ flex: 1, justifyContent: 'center' }}>
        //             <Text>Loading</Text>
        //         </View>
        //     )
        // }

        if (!loggedIn) {
            return (
                <NavigationContainer>
                    <RootStack.Navigator>
                        <RootStack.Screen
                            name="App"
                            component={AppStackScreen}
                            options={{ headerShown: false }}
                        ></RootStack.Screen>
                    </RootStack.Navigator>
                </NavigationContainer>
            )
        }

        return (
            <NavigationContainer>
                <RootStack.Screen
                    name="Auth"
                    component={AuthStackScreen}
                    options={{ headerShown: false }}
                ></RootStack.Screen>
            </NavigationContainer>
        )
    }
}
export default App
