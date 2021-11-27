import React, { Component } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { Text, View } from 'react-native'
import { getProducts } from '../../../backend/get'
import About from './RestaurantAbout'
import { ProductListing } from './ProductListing'
import { Divider } from 'react-native-elements'

export class RestaurantDetail extends Component {
    _isMounted = false

    constructor(props) {
        super(props)
        this.state = {
            products: [],
        }
    }
    async componentDidMount() {
        this._isMounted = true
        const { id } = this.props.route.params
        const fetchedProducts = await getProducts('restaurant', id)
        if (this._isMounted) {
            this.setState({ products: fetchedProducts })
        }
        console.log(fetchedProducts)
    }
    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        console.log('propssssssssssssssssss', this.props)
        return this.props ? (
            <ScrollView>
                <About
                    imageUrl={this.props.route.params.imageUrl}
                    rating={this.props.route.params.rating}
                    name={this.props.route.params.name}
                    introduction={this.props.route.params.introduction}
                    categories={this.props.route.params.categories}
                />
                <Divider />
                <ProductListing foods={this.state.products} />
            </ScrollView>
        ) : null
    }
}
