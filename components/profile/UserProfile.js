import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Share from 'react-native-share';


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
