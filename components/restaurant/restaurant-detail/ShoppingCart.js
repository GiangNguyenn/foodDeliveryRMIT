import React, { Component, useState, useEffect } from 'react'
import { themeColor } from '../../../style/constants'
import Emitter from '../../services/EventEmitterService'

import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Button,
    AsyncStorage,
} from 'react-native'
import { Divider } from 'react-native-elements'
import { landingPage } from '../../../style/landing'
import { addToCollection } from '../../../backend/add'
export function ShoppingCart(props) {
    const [inputValues, setInputValues] = useState({})
    const [amount, setAmount] = useState({})

    const products = props.route.params.products
    let shoppingList = {}

    useEffect(() => {
        if (products) {
            shoppingList = products.reduce((p, c) => {
                var name = c.title
                if (!p.hasOwnProperty(name)) {
                    p[name] = 0
                }
                p[name]++
                return p
            }, {})
        }
        setInputValues(shoppingList)
        setAmount(props.route.params.total)
    }, [props])
    const shoppingListComponent = Object.keys(inputValues)
        .sort()
        .map((item, index) => {
            const image = products.find((ele) => {
                if (ele.title == item) {
                    return ele
                }
            }).images[0].url
            console.log('imageeee ', image)
            let content = null
            if (inputValues[item] > 0) {
                content = (
                    <View
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 10,
                            borderBottomColor: '#999',
                            borderBottomWidth: 1,
                        }}
                        key={index}
                    >
                        <Image
                            style={{ flex: 2 }}
                            source={{
                                uri: image,
                            }}
                        />
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 2,
                                padding: 10,
                            }}
                        >
                            <Text style={{ fontWeight: '600', fontSize: 16 }}>
                                {item}
                            </Text>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                flex: 2,
                                padding: 10,
                            }}
                        >
                            <Button
                                title={'-'}
                                onPress={() => {
                                    Emitter.emit('OUTPUT_FROM_CART', {
                                        type: false,
                                        item: item,
                                    })
                                    setInputValues({
                                        ...inputValues,
                                        [item]: inputValues[item] - 1,
                                    })
                                    setAmount(
                                        (amount) =>
                                            (amount -= Number(
                                                findProduct(item).price
                                            ))
                                    )
                                }}
                            />
                            <Text>{inputValues[item]}</Text>
                            <Button
                                title={'+'}
                                onPress={() => {
                                    Emitter.emit('OUTPUT_FROM_CART', {
                                        type: true,
                                        item: item,
                                    })
                                    setInputValues({
                                        ...inputValues,
                                        [item]: inputValues[item] + 1,
                                    })
                                    setAmount(
                                        (amount) =>
                                            (amount += Number(
                                                findProduct(item).price
                                            ))
                                    )
                                }}
                            />
                        </View>
                    </View>
                )
            }

            return content
        })
    const findProduct = (title) => {
        for (let item of products) {
            if (title == item.title) {
                return item
            }
        }
    }
    const onConfirm = async () => {
        const uid = await AsyncStorage.getItem('uid')
        var order_time = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta',
        })
        const order = {
            uid,
            order_time,
            order_status: 'preparing',
            payment_method: 'COD',
            total_amount: amount,
            order_detail: inputValues,
            delivery: true,
        }
        await addToCollection('order', order)
        props.navigation.navigate('restaurant-finish-order', { order })
    }
    return (
        <View style={{ padding: 10 }}>
            <Text
                style={{ paddingTop: 20, fontSize: 30, borderBottomWidth: 1 }}
            >
                Order Summary
            </Text>
            {shoppingListComponent}
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 3 }}> </Text>
                <Text style={{ flex: 3, fontSize: 17 }}>
                    Food Price: {props.route.params.total}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={{ flex: 3 }}> </Text>
                <Text style={{ flex: 3, fontSize: 17 }}>
                    Booking Fee: 15000
                </Text>
            </View>
            <View style={{ flexDirection: 'row', borderBottomWidth: 1 }}>
                <Text style={{ flex: 3 }}> </Text>
                <Text style={{ flex: 3, fontSize: 17 }}>
                    Payment Method: COD
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: 'center',
                        padding: 10,
                        fontWeight: 'bold',
                    }}
                >
                    TOTAL PRICE: {amount + 15000}
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack(null)}
                    style={{ ...landingPage.button, flex: 3 }}
                >
                    <Text style={landingPage.text}> Return </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ ...landingPage.button, flex: 3 }}
                    onPress={() => onConfirm()}
                >
                    <Text style={landingPage.text}> Confirm </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
