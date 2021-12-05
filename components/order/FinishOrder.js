import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import { landingPage } from '../../style/landing'
import Constants from 'expo-constants'
export class FinishOrder extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: this.props.order,
        }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.order !== prevState.order) {
            this.setState({ order: nextProps.order })
            console.log(this.state.order)
        }
    }
    render() {
        return (
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        paddingTop: Constants.statusBarHeight + 10,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                        }}
                    >
                        Thank You For Using
                    </Text>
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: 'bold',
                        }}
                    >
                        {' '}
                        RMIT Canteen
                    </Text>
                </View>
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        padding: 10,
                    }}
                >
                    Your food is comming soon...
                </Text>
                <Image
                    style={{ width: 300, height: 200, marginBottom: 30 }}
                    source={{
                        uri: 'https://i.pinimg.com/originals/71/28/f4/7128f41b9a653cc70f522bb6f275637f.gif',
                    }}
                />
                <TouchableOpacity style={{ ...landingPage.button }}>
                    <Text style={landingPage.text}> Back To Homepage </Text>
                </TouchableOpacity>
            </View>
        )
    }
}
