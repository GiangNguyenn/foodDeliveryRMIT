import React from 'react'
import firebase from 'firebase'
import { landingPage } from '../../style/landing'
import {
    View,
    Text,
    NativeBaseProvider,
    Image,
    Button,
    Center,
} from 'native-base'

const onLogoutClick = async () => await firebase.auth().signOut()

function AddInventory() {
    return (
        <NativeBaseProvider>
            <View>
                <Text>Add Inventory View</Text>
                <Center>
                    <Button
                        style={{
                            ...landingPage.button,
                            height: 50,
                        }}
                        onPress={()=>onLogoutClick()}
                    >
                        Log out
                    </Button>
                </Center>
            </View>
        </NativeBaseProvider>
    )
}

export default AddInventory
