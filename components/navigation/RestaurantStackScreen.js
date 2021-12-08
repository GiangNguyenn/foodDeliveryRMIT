import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { RestaurantListing } from '../restaurant/RestaurantListing'
import { RestaurantDetail } from '../restaurant/restaurant-detail/RestaurantDetail'
import { ShoppingCart } from '../restaurant/restaurant-detail/ShoppingCart'
import { FinishOrder } from '../order/FinishOrder'

const RestaurantStack = createStackNavigator()

function RestaurantStackScreen() {
    return (
        <RestaurantStack.Navigator initialRouteName={'restaurant-listing'}>
            <RestaurantStack.Screen
                name="Restaurant Listing"
                component={RestaurantListing}
                options={{ headerShown: true }}
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
}

export default RestaurantStackScreen
