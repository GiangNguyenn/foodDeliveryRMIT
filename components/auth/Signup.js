import React, { Component } from 'react'
import {
    View,
    SafeAreaView,
    Image,
    Text,
    StyleSheet,
    Alert,
} from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { landingPage } from '../../style/landing'
import firebase from 'firebase'
import { addToCollection } from '../../backend/add'
import { ScrollView } from 'react-native-gesture-handler'

export class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            confirmation: '',
            name: '',
            phone: '',
            studentId: '',
        }
        this.onSignUp = this.onSignUp.bind(this)
    }
    navigateToLogin() {
        this.props.navigation.navigate('login')
    }

    async onSignUp() {
        const { email, password, phone, name, studentId } = this.state
        if (this.isMatched()) {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    addToCollection('user', { email, phone, name, studentId })
                    Alert.alert(
                        'resgister',
                        'User account created & signed in!',
                        [
                            {
                                text: 'Go To Login',
                                onPress: () => this.navigateToLogin(),
                                style: 'cancel',
                            },
                        ],
                        { cancelable: true }
                    )
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert(
                            'resgister',
                            'That email address is already in use!'
                        )
                    }

                    if (error.code === 'auth/invalid-email') {
                        Alert.alert(
                            'resgister',
                            'That email address is invalid!'
                        )
                    }
                })
        }
    }
    isMatched() {
        if (this.state.password !== this.state.confirmation) {
            Alert.alert('Error', 'Password does not match')
            return false
        }
        return true
    }

    render() {
        return (
            <ScrollView
                scrollEnabled
                contentContainerStyle={landingPage.container}
            >
                <Image
                    style={landingPage.canteenIcon}
                    source={require('../../assets/RMIT/canteenIcon.png')}
                />

                <Text
                    onPress={() => this.props.navigation.navigate('login')}
                    style={landingPage.title}
                >
                    Register Form
                </Text>
                <TextInput
                    activeUnderlineColor="red"
                    style={landingPage.input}
                    placeholder="email"
                    onChangeText={(email) => this.setState({ email })}
                />
                <TextInput
                    activeUnderlineColor="red"
                    style={landingPage.input}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({ password })}
                />
                <TextInput
                    activeUnderlineColor="red"
                    style={landingPage.input}
                    placeholder="Confirm your password"
                    secureTextEntry={true}
                    onChangeText={(confirmation) =>
                        this.setState({ confirmation })
                    }
                    textContentType="password"
                />
                <Text
                    onPress={() => this.props.navigation.navigate('login')}
                    style={landingPage.C2AText}
                >
                    Already have account? Login now!
                </Text>
                <Button
                    style={landingPage.button}
                    onPress={() => this.onSignUp()}
                >
                    <Text style={landingPage.text}>Register</Text>
                </Button>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({})
