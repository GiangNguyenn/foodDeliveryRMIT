import React, { Component } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Text, Pressable, StyleSheet } from 'react-native'
import { getProducts } from '../../../backend/get'
import About from './RestaurantAbout'
import { ProductListing } from './ProductListing'
import { Divider } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { landingPage } from '../../../style/landing'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Emitter from '../../services/EventEmitterService'
export class RestaurantDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            selectedProducts: [],
            totalPrice: 0,
        }
        this.onProductSelect = this.onProductSelect.bind(this)
        this.onIncrease = this.onIncrease.bind(this)
        this.onDecrease = this.onDecrease.bind(this)
    }
    async componentDidMount() {
        const { id } = this.props.route.params
        const fetchedProducts = await getProducts('restaurant', id)
        this.setState({ products: fetchedProducts })
        Emitter.on('OUTPUT_FROM_CART', (newValue) => {
            if (newValue.type) this.onIncrease(newValue.item)
            if (!newValue.type) this.onDecrease(newValue.item)
        })
    }

    onProductSelect(item) {
        this.setState({
            selectedProducts: [...this.state.selectedProducts, item],
            totalPrice: (this.state.totalPrice += Number(item.price)),
        })
    }

    onIncrease(item) {
        const newArr = [...this.state.selectedProducts]
        const element = newArr.find((ele) => ele.title == item)
        this.setState({
            selectedProducts: [...this.state.selectedProducts, element],
            totalPrice: this.state.totalPrice + Number(element.price),
        })
        return this.state.selectedProducts
    }
    onDecrease(item) {
        const newArr = [...this.state.selectedProducts]
        for (let i = 0; i < newArr.length; i++) {
            if (newArr[i].title == item) {
                this.setState({
                    totalPrice: this.state.totalPrice - Number(newArr[i].price),
                })
                newArr.splice(i, 1)
                this.setState({ selectedProducts: newArr })
                return
            }
        }
    }

    render() {
        return this.props ? (
            <ScrollView stickyHeaderIndices={[4]}>
                <About
                    imageUrl={this.props.route.params.imageUrl}
                    rating={this.props.route.params.rating}
                    name={this.props.route.params.name}
                    introduction={this.props.route.params.introduction}
                    categories={this.props.route.params.categories}
                />
                <Divider />
                <ProductListing
                    foods={this.state.products}
                    onProductSelect={this.onProductSelect}
                />
                {this.state.selectedProducts.length > 0 ? (
                    <Pressable
                        style={landingPage.button}
                        onPress={() =>
                            this.props.navigation.navigate(
                                'restaurant-shopping-cart',
                                {
                                    products: this.state.selectedProducts,
                                    total: this.state.totalPrice,
                                    restaurantName:
                                        this.props.route.params.name,
                                    imageUrl: this.props.route.params.imageUrl,
                                }
                            )
                        }
                    >
                        <Text style={landingPage.text}>
                            {this.state.selectedProducts.length} items || Total
                            Price: {this.state.totalPrice} VND
                        </Text>
                    </Pressable>
                ) : null}
            </ScrollView>
        ) : null
    }
}
