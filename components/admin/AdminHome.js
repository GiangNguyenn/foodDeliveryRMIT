import React, { useState, useEffect } from 'react'
import { View, Text, NativeBaseProvider, Image } from 'native-base'
import { StyleSheet, ScrollView, ImageBackground } from 'react-native'
import firebase from 'firebase'
import { landingPage } from '../../style/landing'
import {
    fetchWithCondition,
    getRealTimeDataWithCondition,
    getWithDocument,
} from '../../backend/get'
import { themeColor } from '../../style/constants'
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import { Tab, TabView } from 'react-native-elements'
import ConfirmOrder from './ConfirmOrder'
import PaidOrder from './PaidOrder'
import PreparedOrder from './PreparedOrder'
const handleLogOut = async () => {}

function AdminHome() {
    const uid = firebase.auth().currentUser.uid
    const [restaurant, setRestaurant] = useState({})
    const [user, setUser] = useState({})
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [index, setIndex] = useState(0)
    useEffect(async () => {
        const data = await getWithDocument('user', uid)
        setUser(data)
        const res = data.type
        const restaurantInformation = await fetchWithCondition(
            'restaurant',
            'name',
            res
        )
        setRestaurant(restaurantInformation[0])
        setLoading(false)
        // real time
        const orderInformation = firebase
            .firestore()
            .collection('order')
            .where('restaurant_name', '==', res)
            .onSnapshot((querySnapshot) => {
                console.log('data retirmed')
                setOrders(querySnapshot.docs.map((item) => item.data()))
            })
            .catch((e) => console.log(e))
    }, [])

    const filterOrders = (condition) => {
        return orders.filter((item) => item.order_status == condition)
    }
    const calTotal = () => {
        const items = filterOrders('paid')
        let total = 0
        items.forEach((item) => (total += item.total_amount))
        return total
    }
    return !loading ? (
        <NativeBaseProvider>
            <ScrollView
                contentContainerStyle={{
                    mb: '4',
                    minW: '72',
                    flex: 1,
                }}
            >
                <ImageBackground
                    source={{ uri: restaurant.imageUrl }}
                    resizeMode="cover"
                    style={{ flex: 1, justifyContent: 'center' }}
                    alt="description of image"
                >
                    <View style={styles.headerContent}>
                        <Image
                            style={styles.avatar}
                            source={{
                                uri: user.imageUrl,
                            }}
                            alt="description of image"
                        />
                        <Text style={styles.text}> {user.name} </Text>
                        <Badge
                            status="primary"
                            containerStyle={{
                                height: 20,
                                padding: 5,
                            }}
                            value={`${restaurant.name} Admin `}
                            textStyle={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}
                        ></Badge>
                    </View>
                </ImageBackground>
                <Tab value={index} onChange={(e) => setIndex(e)}>
                    <Tab.Item title="Confirm" />
                    <Tab.Item title="Prepared" />
                    <Tab.Item title="Paid" />
                </Tab>
                <TabView value={index} onChange={(e) => setIndex(e)}>
                    <TabView.Item>
                        <ConfirmOrder
                            name={restaurant.name}
                            orders={filterOrders('preparing')}
                            endStatus={'confirmed'}
                        />
                    </TabView.Item>
                    <TabView.Item>
                        <ConfirmOrder
                            orders={filterOrders('confirmed')}
                            endStatus={'prepared'}
                        />
                    </TabView.Item>
                    <TabView.Item>
                        <ConfirmOrder
                            orders={filterOrders('prepared')}
                            endStatus={'paid'}
                        />
                    </TabView.Item>
                </TabView>
                <View>
                    <Text> Total Income: {calTotal()} vnd </Text>
                </View>
            </ScrollView>
        </NativeBaseProvider>
    ) : (
        <NativeBaseProvider>
            <View>
                <Text> Loading</Text>
            </View>
        </NativeBaseProvider>
    )
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
    text: {
        color: 'white',
        fontSize: 20,
        lineHeight: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: '#000000c0',
    },
})

export default AdminHome
