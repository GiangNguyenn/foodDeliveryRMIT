import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import { landingPage } from '../../style/landing'
import firebase from 'firebase'
import { fetchWithCondition } from '../../backend/get'
import UserOrderHistoryDetail from '../profile/UserOrderHistoryDetail'
export class CurrentOrder extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isVisible: false,
            isLoading: true,
            currentOrder: {},
            orders: [],
        }
    }
    async componentDidMount () {
        const uid = firebase.auth().currentUser.uid
        const orders = firebase
            .firestore()
            .collection('order')
            .where('uid', '==', uid)
            .onSnapshot(querySnapshot => {
                const orders = querySnapshot.docs.map(item => item.data())
                orders.sort(function (a, b) {
                    return new Date(b.order_time) - new Date(a.order_time)
                })
                const currentOrder = orders[0]
                if (currentOrder) {
                    if (currentOrder.order_status !== 'paid') {
                        this.setState({ currentOrder: currentOrder })
                    } else {
                        this.setState({ currentOrder: {} })
                    }
                }
            })
    }
    render () {
        return this.state.currentOrder &&
            Object.keys(this.state.currentOrder).length !== 0 ? (
            <View
                style={{
                    backgroundColor: 'gray',
                    flexDirection: 'row',
                    paddingBottom: 65,
                    opacity: 0.7,
                    paddingTop: 5,
                }}
            >
                <Text
                    style={{
                        paddingHorizontal: 5,
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    You Have
                </Text>
                <Text
                    style={{
                        paddingHorizontal: 5,
                        color: 'red',
                        fontWeight: 'bold',
                    }}
                >
                    1
                </Text>
                <Text
                    style={{
                        paddingHorizontal: 5,
                        color: 'white',
                        fontWeight: 'bold',
                    }}
                >
                    {this.state.currentOrder.order_status} order
                </Text>
                <UserOrderHistoryDetail
                    title={'View Detail'}
                    data={this.state.currentOrder}
                />
            </View>
        ) : null
    }
}
