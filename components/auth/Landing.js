import React from 'react'
import {
    Text,
    View,
    Button,
    Pressable,
    Image,
    SafeAreaView,
} from 'react-native'
import { landingPage } from '../../style/landing'

export default function Landing({ navigation }) {
    return (
        <View style={landingPage.view}>
            <Image
                style={landingPage.canteenIcon}
                source={require('../../assets/RMIT/canteenIcon.png')}
            />
            <Pressable
                style={landingPage.button}
                onPress={() => navigation.navigate('signup')}
            >
                <Text style={landingPage.text}>Sign Up</Text>
            </Pressable>
            <Pressable
                style={landingPage.button}
                onPress={() => navigation.navigate('login')}
            >
                <Text style={landingPage.text}>Log In</Text>
            </Pressable>
        </View>
    )
}
