import React, { Component } from 'react'

import { View, Text, Image, StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    titleStyle: {
        fontSize: 19,
        fontWeight: '600',
    },
})
export function FoodInfo(props) {
    console.log('props from food info ', props)
    return (
        <View style={{ width: 240, justifyContent: 'space-evenly' }}>
            <Text style={styles.titleStyle}>{props.food.title}</Text>
            <Text>{props.food.description}</Text>
            <Text>{props.food.price} VND</Text>
        </View>
    )
}

export function FoodImage({ marginLeft, ...props }) {
    return (
        <View>
            <Image
                source={{ uri: props.food.images[0].url }}
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 8,
                    marginLeft: marginLeft,
                }}
            />
        </View>
    )
}
