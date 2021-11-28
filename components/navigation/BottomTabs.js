import React, { Component, useRef } from 'react'
import {
    Alert,
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native'
import { CurvedBottomBar } from 'react-native-curved-bottom-bar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { UserProfile } from '../profile/UserProfile'
import { SearchEngine } from '../search/SearchEngine'
import Transaction from '../transaction/Transaction'
import Orders from '../order/Orders'

export const BottomTabs = () => {
    const _renderIcon = (routeName, selectedTab) => {
        let icon = ''

        switch (routeName) {
            case 'Home':
                icon = 'home-outline'
                break
            case 'Profile':
                icon = 'person-outline'
                break
            case 'Transactions':
                icon = 'wallet-outline'
                break
            case 'Orders':
                icon = 'reorder-four-outline'
                break
        }

        return (
            <Ionicons
                name={icon}
                size={25}
                color={routeName === selectedTab ? 'red' : 'black'}
            />
        )
    }
    const renderTabBar = ({ routeName, selectedTab, navigate }) => {
        return (
            <TouchableOpacity
                onPress={() => navigate(routeName)}
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {_renderIcon(routeName, selectedTab)}
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <CurvedBottomBar.Navigator
                type="up"
                style={styles.bottomBar}
                strokeWidth={0.5}
                height={55}
                circleWidth={55}
                bgColor="white"
                initialRouteName="Home"
                borderTopLeftRight
                swipeEnabled
                renderCircle={({ selectedTab, navigate }) => (
                    <Animated.View style={styles.btnCircleUp}>
                        <TouchableOpacity
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                            }}
                            onPress={() => Alert.alert('Click Action')}
                        >
                            <Ionicons
                                name={'search-outline'}
                                color="red"
                                size={25}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                )}
                tabBar={renderTabBar}
            >
                <CurvedBottomBar.Screen
                    name="Home"
                    position="left"
                    component={({ navigate }) => SearchEngine}
                />
                <CurvedBottomBar.Screen
                    name="Orders"
                    component={({ navigate }) => Orders}
                    position="left"
                />
                <CurvedBottomBar.Screen
                    name="Transactions"
                    component={({ navigate }) => Transaction}
                    position="right"
                />
                <CurvedBottomBar.Screen
                    name="Profile"
                    component={({ navigate }) => UserProfile}
                    position="right"
                />
            </CurvedBottomBar.Navigator>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    button: {
        marginVertical: 5,
    },
    bottomBar: {},
    btnCircleUp: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        bottom: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,
    },
    imgCircle: {
        width: 30,
        height: 30,
        tintColor: 'gray',
    },
    img: {
        width: 30,
        height: 30,
    },
})

export default BottomTabs
