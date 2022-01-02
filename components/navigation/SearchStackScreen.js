import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RestaurantDetail } from '../restaurant/restaurant-detail/RestaurantDetail'
import { ShoppingCart } from '../restaurant/restaurant-detail/ShoppingCart'
import { FinishOrder } from '../order/FinishOrder'
import { RestaurantListing } from '../restaurant/RestaurantListing'

import SearchEngine from '../search/SearchEngine'

const SearchStack = createStackNavigator()

function SearchStackScreen () {
    return (
        <SearchStack.Navigator initialRouteName={'search-engine'}>
            <SearchStack.Screen
                name='search-engine'
                component={SearchEngine}
                options={{ headerShown: false }}
            ></SearchStack.Screen>
            <SearchStack.Screen
                name='restaurant-detail'
                component={RestaurantDetail}
                options={{ headerShown: false }}
            ></SearchStack.Screen>
            <SearchStack.Screen
                name='restaurant-shopping-cart'
                component={ShoppingCart}
                options={{ headerShown: false }}
            ></SearchStack.Screen>
            <SearchStack.Screen
                name='restaurant-finish-order'
                component={FinishOrder}
                options={{ headerShown: false }}
            ></SearchStack.Screen>
            <SearchStack.Screen
                name='Restaurant Listing'
                component={RestaurantListing}
                options={{ headerShown: true }}
            ></SearchStack.Screen>
        </SearchStack.Navigator>
    )
}

export default SearchStackScreen
