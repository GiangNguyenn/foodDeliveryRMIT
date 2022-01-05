import React, { Component } from 'react'
import { Text, View, Button, Dimensions } from 'react-native'
import { landingPage } from '../../style/landing'
import firebase from 'firebase'
import { Overlay, Badge } from 'react-native-elements'

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
            completedModelPopUp: false,
        }
        this.setVibile = this.setVibile.bind(this)
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
                        if (this.isLatest(currentOrder.order_time)) {
                            this.setState({ completedModelPopUp: true })
                        }
                        console.log(
                            'component ',
                            this.state.completedModelPopUp
                        )
                    }
                }
            })
    }
    isLatest (time) {
        var d1 = new Date() //"now"
        var d2 = new Date(time) // some date
        return Math.abs(d1 - d2) > 600000
    }
    setVibile () {
        this.setState({ completedModelPopUp: false })
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
                <Overlay
                    isVisible={this.state.completedModelPopUp}
                    onBackdropPress={() => this.setVibile()}
                >
                    <View
                        style={{
                            padding: 10,
                            width: Dimensions.get('window').width - 100,
                            height: Dimensions.get('window').height - 450,
                        }}
                    >
                        <Text>123123213123 </Text>

                        <Button
                            onPress={() => this.setVibile()}
                            style={{
                                flex: 3,
                                height: '50%',
                            }}
                            title='Return'
                            type='outline'
                        ></Button>
                    </View>
                </Overlay>
            </View>
        ) : null
    }
}
