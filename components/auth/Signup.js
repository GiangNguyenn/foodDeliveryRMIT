import React, { Component } from 'react'
import firebase from 'firebase'
import { Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {
    View,
    Button,
    Input,
    FormControl,
    NativeBaseProvider,
    Image,
    Heading,
    Text,
    Center,
} from 'native-base'
import { landingPage } from '../../style/landing'
import { addToCollection } from '../../backend/add'
import RMITCanteenIcon from '../utils/RMITCanteenIcon'

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
            isAdmin: false,
        }
        this.onSignUp = this.onSignUp.bind(this)
    }
    navigateToLogin() {
        this.props.navigation.navigate('login')
    }

    async onSignUp() {
        const { email, password, phone, name, studentId, isAdmin } = this.state
        if (this.isMatched()) {
            await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    addToCollection('user', {
                        email,
                        phone,
                        name,
                        studentId,
                        isAdmin,
                    })
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
            <NativeBaseProvider>
                <ScrollView
                    scrollEnabled
                    contentContainerStyle={landingPage.container}
                >
                    <RMITCanteenIcon />
                    <Heading
                        onPress={() => this.props.navigation.navigate('login')}
                        size="2xl"
                        style={landingPage.title}
                    >
                        Register Form
                    </Heading>
                    <Center px="3">
                        <FormControl isRequired>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input
                                style={landingPage.input}
                                placeholder="email"
                                onChangeText={(email) =>
                                    this.setState({ email })
                                }
                            />
                            <FormControl.Label>Password</FormControl.Label>

                            <Input
                                style={landingPage.input}
                                placeholder="password"
                                secureTextEntry={true}
                                onChangeText={(password) =>
                                    this.setState({ password })
                                }
                            />
                            <FormControl.Label>
                                Confirm your password
                            </FormControl.Label>

                            <Input
                                style={landingPage.input}
                                placeholder="Confirm your password"
                                secureTextEntry={true}
                                onChangeText={(confirmation) =>
                                    this.setState({ confirmation })
                                }
                                textContentType="password"
                            />
                        </FormControl>
                    </Center>
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
            </NativeBaseProvider>
        )
    }
}
