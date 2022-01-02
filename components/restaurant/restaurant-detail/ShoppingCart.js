import React, { Component, useState, useEffect } from 'react'
import { themeColor } from '../../../style/constants'
import Emitter from '../../services/EventEmitterService'
import AppLoading from 'expo-app-loading'
import firebase from 'firebase'
import {
    Text,
    View,
    Pressable,
    Image,
    SafeAreaView,
    Button,
    NativeBaseProvider,
} from 'native-base'
import { AsyncStorage } from 'react-native'
import { Divider } from 'react-native-elements'
import { landingPage } from '../../../style/landing'
import { addToCollection } from '../../../backend/add'

export function ShoppingCart (props) {
    const [inputValues, setInputValues] = useState({})
    const [amount, setAmount] = useState({})
    const [loading, setLoading] = useState(false)
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
            const image = products.find(ele => {
                if (ele.title == item) {
                    return ele
                }
            }).images[0].url
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
                                        amount =>
                                            (amount -= Number(
                                                findProduct(item).price
                                            ))
                                    )
                                }}
                            >
                                <Text> - </Text>
                            </Button>
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
                                        amount =>
                                            (amount += Number(
                                                findProduct(item).price
                                            ))
                                    )
                                }}
                            >
                                <Text> + </Text>
                            </Button>
                        </View>
                    </View>
                )
            }

            return content
        })
    const findProduct = title => {
        for (let item of products) {
            if (title == item.title) {
                return item
            }
        }
    }
    const onConfirm = async () => {
        const uid = firebase.auth().currentUser.uid
        const restaurantName = props.route.params.restaurantName
        const imageUrl = props.route.params.imageUrl

        var order_time = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Jakarta',
        })
        const order = {
            uid,
            order_time,
            order_status: 'preparing',
            payment_method: 'COD',
            total_amount: amount + 15000,
            order_detail: inputValues,
            delivery: true,
            restaurant_name: restaurantName,
            imageUrl: imageUrl,
        }
        await addToCollection('order', order)
        await Emitter.emit('OUTPUT_CURRENT_ORDER', {
            order: order,
        })
        props.navigation.navigate('restaurant-finish-order', { order })
    }
    return (
        <NativeBaseProvider>
            <View style={{ padding: 10 }}>
                <Text
                    style={{
                        paddingTop: 20,
                        fontSize: 30,
                        borderBottomWidth: 1,
                    }}
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
                    <Button
                        onPress={() => props.navigation.goBack(null)}
                        style={{
                            ...landingPage.button,
                            flex: 3,
                            height: '50%',
                        }}
                    >
                        <Text style={landingPage.text}> Return </Text>
                    </Button>
                    <Button
                        style={{
                            ...landingPage.button,
                            flex: 3,
                            height: '50%',
                        }}
                        onPress={() => onConfirm()}
                    >
                        <Text style={landingPage.text}> Confirm </Text>
                    </Button>
                </View>
            </View>
        </NativeBaseProvider>
    )
}
