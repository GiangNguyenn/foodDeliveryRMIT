import React, { Component } from 'react'
import { Dimensions, Text, View } from 'react-native'
import { Button, Overlay, ListItem, Badge } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { landingPage } from '../../style/landing'
export default class UserOrderHistoryDetail extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isVisible: false,
        }
        this.setVibile = this.setVibile.bind(this)
    }
    setVibile () {
        this.setState({ isVisible: !this.state.isVisible })
    }

    render () {
        const { data } = this.props
        const { title } = this.props
        const order_detail = data.order_detail
        const MealComponent = order_detail
            ? Object.keys(order_detail).map(item => (
                  <Text style={{ fontSize: 14 }}>
                      {item} x {order_detail[item]}
                  </Text>
              ))
            : null
        return (
            <View>
                {!title ? (
                    <ListItem.Chevron onPress={this.setVibile} />
                ) : (
                    <Text
                        style={{
                            color: 'blue',
                            textDecorationLine: 'underline',
                        }}
                        onPress={this.setVibile}
                    >
                        View Detail.
                    </Text>
                )}
                <Overlay
                    isVisible={this.state.isVisible}
                    onBackdropPress={this.setVibile}
                    style={{}}
                >
                    <View
                        style={{
                            padding: 10,
                            width: Dimensions.get('window').width - 100,
                            height: Dimensions.get('window').height - 450,
                        }}
                    >
                        <View
                            style={{
                                borderBottomWidth: 1,
                                flexDirection: 'column',
                            }}
                        >
                            <Text
                                style={{
                                    paddingTop: 20,
                                    fontSize: 30,
                                }}
                            >
                                Order Detail
                            </Text>
                            <Text
                                style={{
                                    fontSize: 15,
                                    opacity: 0.7,
                                }}
                            >
                                Date: {data.order_time}
                            </Text>
                            <Badge
                                value={data.order_status}
                                textStyle={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                }}
                                status='success'
                                containerStyle={{
                                    position: 'absolute',
                                    top: -4,
                                    right: -4,
                                }}
                            />
                        </View>

                        {MealComponent}

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
                                TOTAL PRICE: {data.total_amount} VND
                            </Text>
                        </View>
                        <Button
                            onPress={() => this.setVibile()}
                            style={{
                                ...landingPage.button,
                                flex: 3,
                                height: '50%',
                            }}
                            title='Return'
                            type='outline'
                        ></Button>
                    </View>
                </Overlay>
            </View>
        )
    }
}
