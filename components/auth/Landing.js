import React from 'react'
import { Text, View, Button, Pressable } from 'react-native'
import { landingPageButtons } from '../../style/landing'

export default function Landing({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Pressable
                style={landingPageButtons.button}
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={landingPageButtons.text}>Sign Up</Text>
            </Pressable>
            <Pressable
                style={landingPageButtons.button}
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={landingPageButtons.text}>Log In</Text>
            </Pressable>
        </View>
    )
}
