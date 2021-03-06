import React, { Component } from 'react'
import {
    View,
    Button,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native'
import { Divider } from 'react-native-elements'
import { FoodInfo, FoodImage } from './ProductInfo'

const styles = StyleSheet.create({
    menuItemStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 20,
    },

    titleStyle: {
        fontSize: 19,
        fontWeight: '600',
    },
})
export class ProductListing extends Component {
    _isMounted = false

    constructor(props) {
        super(props)
    }

    render() {
        const foods = this.props.foods
        return this.props ? (
            <ScrollView>
                {foods.map((food, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => this.props.onProductSelect(food)}
                    >
                        <View style={styles.menuItemStyle}>
                            <FoodInfo food={food} />
                            <FoodImage food={food} marginLeft={0} />
                        </View>
                        <Divider
                            width={0.5}
                            orientation="vertical"
                            style={{ marginHorizontal: 20 }}
                        />
                    </TouchableOpacity>
                ))}
            </ScrollView>
        ) : null
    }
}
