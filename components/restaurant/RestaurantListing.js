import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { getAllDocuments } from '../../backend/get'
import RestaurantImage from './RestaurantImage'
import RestaurantInfo from './RestaurantInfor'
import { ScrollView } from 'react-native-gesture-handler'
import { SpeedDial } from 'react-native-elements'
import Emitter from '../services/EventEmitterService'
import { CurrentOrder } from '../order/CurrentOrder'
export class RestaurantListing extends Component {
    _isMounted = false

    constructor(props) {
        super(props)
        this.state = {
            restaurants: [],
            currentOrder: {},
        }
    }
    async componentDidMount() {
        this._isMounted = true
        const fetchedRestaurants = await getAllDocuments('restaurant')
        if (this._isMounted) {
            this.setState({ restaurants: fetchedRestaurants })
        }
        const order = this.props.route.params.order
        Emitter.on('OUTPUT_CURRENT_ORDER', (newValue) => {
            this.setState({ currentOrder: newValue.order })
        })
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        const a = this.state.restaurants.map((restaurant, index) => (
            <TouchableOpacity
                key={index}
                activeOpacity={1}
                style={{ marginBottom: 30 }}
                onPress={() =>
                    this.props.navigation.navigate('restaurant-detail', {
                        name: restaurant.name,
                        categories: restaurant.categories,
                        id: restaurant.id,
                        imageUrl: restaurant.imageUrl,
                        rating: restaurant.rating,
                        introduction: restaurant.introduction,
                        meals: restaurant.meals,
                    })
                }
            >
                <View
                    style={{
                        marginTop: 10,
                        padding: 15,
                        backgroundColor: 'white',
                    }}
                >
                    <RestaurantImage image={restaurant.imageUrl} />
                    <RestaurantInfo
                        name={restaurant.name}
                        moto={restaurant.moto}
                        rating={restaurant.rating}
                    />
                    <Text> {restaurant.introduction} </Text>
                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
                        {restaurant.moto}
                    </Text>
                </View>
            </TouchableOpacity>
        ))
        return <ScrollView>{a}</ScrollView>
    }
}
