import React from 'react'
import { Text, View, Button, Pressable } from 'react-native'
import { landingPage } from '../../style/landing'

export default function Landing({ navigation }) {
    return (
        <View style={landingPage.view}>
            <Pressable
                style={landingPage.button}
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={landingPage.text}>Sign Up</Text>
            </Pressable>
            <Pressable
                style={landingPage.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={landingPage.text}>Log In</Text>
            </Pressable>
        </View>
    )
}
