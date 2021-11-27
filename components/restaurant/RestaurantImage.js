import { Image, TouchableOpacity } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function RestaurantImage(props) {
    return (
        <>
            <Image
                source={{
                    uri: props.image,
                }}
                style={{ width: '100%', height: 180 }}
            />
            <TouchableOpacity
                style={{ position: 'absolute', right: 20, top: 20 }}
            >
                <MaterialCommunityIcons
                    name="heart-outline"
                    size={25}
                    color="#fff"
                />
            </TouchableOpacity>
        </>
    )
}
