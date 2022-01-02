import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { getAllDocuments } from '../../backend/get'
import RestaurantImage from '../restaurant/RestaurantImage'
import RestaurantInfo from '../restaurant/RestaurantInfor'
import { ScrollView } from 'react-native-gesture-handler'
import Emitter from '../services/EventEmitterService'
import { SearchBar } from 'react-native-elements'

export class SearchEngine extends Component {
    _isMounted = false

    constructor (props) {
        super(props)
        this.state = {
            restaurants: [],
            currentOrder: {},
            search: '',
        }
        this.updateSearch = this.updateSearch.bind(this)
    }
    updateSearch = search => {
        this.setState({ search })
    }
    async componentDidMount () {
        this._isMounted = true
        const fetchedRestaurants = await getAllDocuments('restaurant')
        if (this._isMounted) {
            this.setState({ restaurants: fetchedRestaurants })
        }
        Emitter.on('OUTPUT_CURRENT_ORDER', newValue => {
            this.setState({ currentOrder: newValue.order })
        })
    }
    componentWillUnmount () {
        this._isMounted = false
    }

    render () {
        const { search } = this.state
        const searchItems = [...this.state.restaurants].filter(item => {
            if (
                item.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
                item?.introduction
                    ?.toLowerCase()
                    ?.includes(search?.toLocaleLowerCase()) ||
                item.moto.toLowerCase().includes(search.toLocaleLowerCase())
            )
                return item
        })
        const a = searchItems.map((restaurant, index) => (
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
        return (
            <View style={{ flex: 1 }}>
                <SearchBar
                    placeholder='Search Your Restaurant'
                    onChangeText={this.updateSearch}
                    value={search}
                />
                <ScrollView>{a}</ScrollView>
            </View>
        )
    }
}
export default SearchEngine
