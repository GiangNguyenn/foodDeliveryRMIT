import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import * as firebase from 'firebase'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import Login from './components/auth/Login'
import LandingScreen from './components/auth/Landing'
import { SignUp } from './components/auth/Signup'
import { RestaurantListing } from './components/restaurant/RestaurantListing'
import { RestaurantDetail } from './components/restaurant/restaurant-detail/RestaurantDetail'
import { UserProfile } from './components/profile/UserProfile'
import { SearchEngine } from './components/search/SearchEngine'
import { LogBox } from 'react-native'
import { View, Text } from 'react-native'
import { ShoppingCart } from './components/restaurant/restaurant-detail/ShoppingCart'
import { FinishOrder } from './components/order/FinishOrder'

LogBox.ignoreLogs(['AsyncStorage has been extracted'])
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
        <RestaurantStack.Screen
            name="restaurant-shopping-cart"
            component={ShoppingCart}
            options={{ headerShown: false }}
        ></RestaurantStack.Screen>
        <RestaurantStack.Screen
            name="restaurant-finish-order"
            component={FinishOrder}
            options={{ headerShown: false }}
        ></RestaurantStack.Screen>
    </RestaurantStack.Navigator>
)

const RootTabs = () => (
    <Tab.Navigator
        initialRouteName={'restaurant-stack'}
        screenOptions={{
            tabBarInactiveBackgroundColor: '#011f3b',
            tabBarActiveBackgroundColor: '#032845',
            tabBarInactiveTintColor: '#f8ca12',
            tabBarActiveTintColor: '#ffffff',
            tabBarIconStyle: { marginTop: 4 },
            tabBarLabelStyle: {
                fontSize: 13,
                color: '#f8ca12',
                paddingBottom: 3,
            },
            tabBarStyle: {
                height: 55,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 4,
                borderTopWidth: 0,
            },
            style: { borderColor: '#011f3b' },
            headerShown: false,
            unmountOnBlur: true,
        }}
    >
        <Tab.Screen
            name="restaurant-stack"
            component={RestaurantStackScreen}
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
        <Tab.Screen
            name="profile"
            component={UserProfile}
            options={{
                tabBarLabel: 'Profile',
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
        <Tab.Screen
            name="search"
            component={SearchEngine}
            options={{
                tabBarLabel: 'Profile',
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

export default class App extends Component {
    constructor(props) {
        super()
        this.state = {
            loaded: true,
            loggedIn: false,
        }
    }

    componentDidMount() {
        this.fireBaseListener = firebase.auth().onAuthStateChanged((user) => {
            user
                ? this.setState({
                      loggedIn: true,
                      loaded: true,
                  })
                : this.setState({
                      loggedIn: false,
                      loaded: true,
                  })
        })
    }

    componentWillUnmount() {
        this.fireBaseListener && this.fireBaseListener()
    }

    render() {
        const { loggedIn, loaded } = this.state

        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <NavigationContainer>
                    <RootStack.Navigator>
                        {loggedIn ? (
                            <RootStack.Screen
                                name="AppStack"
                                component={AppStackScreen}
                                options={{ headerShown: false }}
                            ></RootStack.Screen>
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
