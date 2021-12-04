import React, { Component } from 'react'
import {
    View,
    Button,
    TextInput,
    Pressable,
    SafeAreaView,
    Image,
    Text,
    StyleSheet,
} from 'react-native'
import { landingPage } from '../../style/landing'
import firebase from 'firebase'
import { themeColor } from '../../style/constants'
export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            name: '',
        }

        this.onSignUp = this.onSignUp.bind(this)
    }
    onSignUp() {
        const { email, password } = this.state
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(result)
                this.props.navigation.push('App')
            })
            .catch((error) => {
                alert(error)
            })
    }

    render() {
        return (
            <View style={landingPage.container}>
                <Image
                    style={landingPage.canteenIcon}
                    source={require('../../assets/RMIT/canteenIcon.png')}
                />
                <Text
                    onPress={() => this.props.navigation.navigate('login')}
                    style={landingPage.title}
                >
                    Login Form
                </Text>
                <TextInput
                    style={landingPage.input}
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                    textContentType="emailAddress"
                />
                <TextInput
                    style={landingPage.input}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                    textContentType="password"
                />

                <Text
                    onPress={() => this.props.navigation.navigate('signup')}
                    style={landingPage.C2AText}
                >
                    Do not have account? Register now!
                </Text>
                <Pressable
                    style={landingPage.button}
                    onPress={() => this.onSignUp()}
                >
                    <Text style={landingPage.text}>Log In</Text>
                </Pressable>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    registerText: {
        color: themeColor.RMITDarkBlue,
        padding: 5,
    },
})

export default Login
