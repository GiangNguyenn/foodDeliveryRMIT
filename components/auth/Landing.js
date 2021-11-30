import React from 'react'
import { Text, View, Image, SafeAreaView } from 'react-native'
import { Button, Card } from 'react-native-paper'
import { landingPage } from '../../style/landing'

export default function Landing({ navigation }) {
    return (
        <View style={landingPage.view}>
            <Image
                style={landingPage.canteenIcon}
                source={require('../../assets/RMIT/canteenIcon.png')}
            />
            <Button
                style={landingPage.button}
                mode="contained"
                onPress={() => navigation.navigate('signup')}
            >
                Sign Up
            </Button>
            <Button
                style={landingPage.button}
                mode="contained"
                onPress={() => navigation.navigate('login')}
            >
                Log In
            </Button>
        </View>
    )
}
