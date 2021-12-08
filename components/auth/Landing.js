import React from 'react'
import {
    Text,
    View,
    Pressable,
    Image,
    SafeAreaView,
    Button,
    NativeBaseProvider,
} from 'native-base'
import RMITCanteenIcon from '../utils/RMITCanteenIcon'
import { landingPage } from '../../style/landing'

export default function Landing({ navigation }) {
    return (
        <NativeBaseProvider>
            <View style={landingPage.view}>
                <RMITCanteenIcon />
                <Button
                    style={landingPage.button}
                    onPress={() => navigation.navigate('signup')}
                >
                    <Text style={landingPage.text}>Sign Up</Text>
                </Button>
                <Button
                    style={landingPage.button}
                    onPress={() => navigation.navigate('login')}
                >
                    <Text style={landingPage.text}>Log In</Text>
                </Button>
            </View>
        </NativeBaseProvider>
    )
}
