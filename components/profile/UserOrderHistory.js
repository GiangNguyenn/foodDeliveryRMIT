import { ListItem, Avatar, Badge } from 'react-native-elements'
import React, { Component } from 'react'
import { Text, View, FlatList } from 'react-native'
import { fetchWithCondition } from '../../backend/get'
import firebase from 'firebase'
import { Dimensions } from 'react-native'
import UserOrderHistoryDetail from './UserOrderHistoryDetail'
export default class UserOrderHistory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: this.props.orders,
        }
    }
    async componentDidMount() {}
    render() {
        const keyExtractor = (item, index) => index.toString()

        return (
            <View
                style={{
                    width: Dimensions.get('window').width,
                    alignSelf: 'stretch',
                    textAlign: 'center',
                }}
            >
                {this.props.orders.map((item, index) => (
                    <ListItem bottomDivider key={index}>
                        <Avatar
                            source={{
                                uri:
                                    item.imageUrl ||
                                    'https://samui-multimedia.com/wp-content/uploads/A4-CANTINA-1-1-01.jpg',
                            }}
                        />
                        <ListItem.Content>
                            <ListItem.Title>
                                {item.restaurant_name || 'Lacatina'}
                            </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Content>
                            <ListItem.Title>
                                {item.total_amount} VND
                            </ListItem.Title>
                            <ListItem.Subtitle>
                                {item.payment_method}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        <Badge
                            value={item.order_status}
                            textStyle={{ color: 'white', fontWeight: 'bold' }}
                            status="success"
                        />
                        <UserOrderHistoryDetail data={item} />
                    </ListItem>
                ))}
            </View>
        )
    }
}
