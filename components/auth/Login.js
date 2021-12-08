import React, { Component } from 'react'
import firebase from 'firebase'
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
import { themeColor } from '../../style/constants'
import RMITCanteenIcon from '../utils/RMITCanteenIcon'

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
            })
            .catch((error) => {
                alert(error)
            })
    }

    render() {
        return (
            <NativeBaseProvider>
                <View style={landingPage.container}>
                    <RMITCanteenIcon />
                    <Heading
                        style={landingPage.title}
                        onPress={() => this.props.navigation.navigate('login')}
                        size="2xl"
                    >
                        Login Form
                    </Heading>
                    <Center>
                        <FormControl isRequired>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input
                                style={landingPage.input}
                                placeholder="email"
                                onChangeText={(email) =>
                                    this.setState({ email })
                                }
                                textContentType="emailAddress"
                            />
                            <FormControl.Label>Password</FormControl.Label>
                            <Input
                                style={landingPage.input}
                                placeholder="password"
                                secureTextEntry={true}
                                onChangeText={(password) =>
                                    this.setState({ password })
                                }
                                textContentType="password"
                            />
                            <Text
                                onPress={() =>
                                    this.props.navigation.navigate('signup')
                                }
                                style={landingPage.C2AText}
                            >
                                Do not have account? Register now!
                            </Text>
                        </FormControl>
                    </Center>

                    <Button
                        style={landingPage.button}
                        onPress={() => this.onSignUp()}
                    >
                        <Text style={landingPage.text}>Log In</Text>
                    </Button>
                </View>
            </NativeBaseProvider>
        )
    }
}

export default Login
