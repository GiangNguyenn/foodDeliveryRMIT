import React, { Component } from 'react'
import { Text, View, Button } from 'react-native'
import firebase from 'firebase'
export class UserProfile extends Component {
    async onLogoutClick() {
        await firebase
            .auth()
            .signOut()
            .then(() => console.log('User signed out!'))
        this.props.navigation.navigate('Landing')
    }
    render() {
        return (
            <View>
                <Text>
                    User Profile Page 🐱‍🚀🐱‍👓🐱‍👓🐱‍👓🐱‍🐉🐱‍💻💋✔🤳🌹✔👀
                </Text>
                <Button title="logout" onPress={this.onLogoutClick} />
            </View>
        )
    }
}

export default UserProfile
