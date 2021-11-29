import React, { Component } from 'react'
import { SafeAreaView } from 'react-native'
import RestaurantListing from './components/restaurant/RestaurantListing'
import BottomTabs from './components/navigation/BottomTabs'

export default class Home extends Component {
    render() {
        return (
            <SafeAreaView>
                <RestaurantListing />
                <BottomTabs />
            </SafeAreaView>
        )
    }
}
