import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import RestaurantListing from './components/restaurant/RestaurantListing'
import BottomTabs from './components/navigation/BottomTabs'
import { CurrentOrder } from './components/order/CurrentOrder'
export default function Home (props) {
    return (
        <SafeAreaView>
            <RestaurantListing />
            <BottomTabs />
        </SafeAreaView>
    )
}
