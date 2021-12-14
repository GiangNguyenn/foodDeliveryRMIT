import React from 'react'
import * as firebase from 'firebase'
import { View, Text, Center, Button, NativeBaseProvider } from 'native-base'

import { landingPage } from '../../style/landing'

function AdminHome() {
    return (
        <NativeBaseProvider>
            <View style={landingPage.container}>
                <Center>
                    <Text>This is RMIT Canteen Managment Dashboard</Text>
                </Center>

                <Button
                    style={landingPage.button}
                    onPress={() => console.log(firebase.auth().signOut())}
                >
                    Log out
                </Button>
            </View>
        </NativeBaseProvider>
    )
}

export default AdminHome
