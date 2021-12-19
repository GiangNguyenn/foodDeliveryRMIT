import React, { Component } from 'react'
import firebase from 'firebase'
import { Text, View, Button, NativeBaseProvider, Center } from 'native-base'
import { StyleSheet, Image, ScrollView } from 'react-native'
import { Tab, TabView } from 'react-native-elements'
import { themeColor } from '../../style/constants'
import { getWithDocument, fetchWithCondition } from '../../backend/get'
import UserOrderHistory from './UserOrderHistory'
export class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            user: {},
            userOrders: [],
            uid: '',
            isReady: false,
        }
    }

    async onLogoutClick() {
        await firebase.auth().signOut()
    }
    async componentDidMount() {
        const uid = firebase.auth().currentUser.uid
        const user = await getWithDocument('user', uid)
        if (user) {
            this.setState({ user: user, isReady: true })
        }
        const orders = await fetchWithCondition('order', 'uid', uid)
        if (orders) this.setState({ userOrders: orders })
    }
    render() {
        const { user } = this.state
        return this.state.isReady ? (
            <NativeBaseProvider>
                <ScrollView
                    _contentContainerStyle={{
                        mb: '4',
                        minW: '72',
                    }}
                >
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            <Image
                                style={styles.avatar}
                                source={{
                                    uri: user.imageUrl,
                                }}
                            />

                            <Text style={styles.name}> {user.name} </Text>
                            <Text style={styles.userInfo}>{user.mail}</Text>
                            <Text style={styles.userInfo}>{user.nation} </Text>
                        </View>
                    </View>
                    <Tab
                        value={this.state.index}
                        onChange={(e) => this.setState({ index: e })}
                    >
                        <Tab.Item title="Information" />
                        <Tab.Item title="Order History" />
                    </Tab>
                    <TabView
                        value={this.state.index}
                        onChange={(e) => this.setState({ index: e })}
                    >
                        <TabView.Item>
                            <View style={{ flexDirection: 'column' }}>
                                <View style={styles.item}>
                                    <Image
                                        style={styles.icon}
                                        source={{
                                            uri: 'https://img.icons8.com/color/70/000000/cottage.png',
                                        }}
                                    />
                                    <Text style={styles.info}>
                                        Home : {user.address}
                                    </Text>
                                </View>
                                <View style={styles.item}>
                                    <Image
                                        style={styles.icon}
                                        source={{
                                            uri: 'https://img.icons8.com/color/70/000000/administrator-male.png',
                                        }}
                                    />
                                    <Text style={styles.info}>
                                        Phone Number: {user.phone}
                                    </Text>
                                </View>
                                <View style={styles.item}>
                                    <Image
                                        style={styles.icon}
                                        source={{
                                            uri: 'https://img.icons8.com/color/70/000000/filled-like.png',
                                        }}
                                    />
                                    <Text style={styles.info}>
                                        Student Id: {user.sid}
                                    </Text>
                                </View>
                                <Center>
                                    <Button
                                        style={{
                                            ...landingPage.button,
                                            height: 50,
                                        }}
                                        onPress={() => this.onLogoutClick()}
                                    >
                                        Log out
                                    </Button>
                                </Center>
                            </View>
                        </TabView.Item>
                        <TabView.Item
                            style={{
                                width: '100%',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                            }}
                        >
                            <View>
                                <UserOrderHistory
                                    orders={this.state.userOrders}
                                />
                            </View>
                        </TabView.Item>
                    </TabView>
                </ScrollView>
            </NativeBaseProvider>
        ) : null
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: themeColor.RMITTeal,
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: '#000000',
        fontWeight: '600',
    },
    userInfo: {
        fontSize: 16,
        color: '#778899',
        fontWeight: '600',
    },
    body: {
        backgroundColor: themeColor.RMITDarkBlue,
        height: 500,
        alignItems: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    infoContent: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 5,
    },
    iconContent: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 5,
    },
    icon: {
        width: 30,
        height: 30,
        marginTop: 20,
    },
    info: {
        fontSize: 18,
        marginTop: 20,
        color: 'black',
    },
})

export default UserProfile
