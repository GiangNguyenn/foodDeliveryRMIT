import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default function RestaurantInfo(props) {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
            }}
        >
            <View>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                    {props.name}
                </Text>
                <Text style={{ fontSize: 13, color: 'gray' }}>30-45 • min</Text>
            </View>
            <View
                style={{
                    backgroundColor: '#eee',
                    height: 30,
                    width: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                }}
            >
                <Text>{props.rating}</Text>
            </View>
        </View>
    )
}
