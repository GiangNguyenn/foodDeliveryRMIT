import React from 'react'
import { View, Text, Image } from 'react-native'

export default function About(props) {
    const { name, imageUrl, rating, categories, introduction } = props
    const formattedCategories = categories.map((cat) => cat.title).join(' • ')

    const description = `${formattedCategories} ${rating} ⭐`
    return (
        <View>
            <RestaurantImage image={imageUrl} />
            <RestaurantName name={name} />
            <RestaurantDescription
                description={description}
                introduction={introduction}
            />
        </View>
    )
}

const RestaurantImage = (props) => (
    <Image
        source={{ uri: props.image }}
        style={{ width: '100%', height: 180 }}
    />
)

const RestaurantName = (props) => (
    <Text
        style={{
            fontSize: 29,
            fontWeight: '600',
            marginTop: 10,
            marginHorizontal: 15,
        }}
    >
        {props.name}
    </Text>
)

const RestaurantDescription = (props) => (
    <Text
        style={{
            marginTop: 10,
            marginHorizontal: 15,
            fontWeight: '400',
            fontSize: 15.5,
        }}
    >
        {props.introduction}
        {props.description}
    </Text>
)
