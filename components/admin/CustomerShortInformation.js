import React, { useState, useEffect } from 'react'
import { Text, View, Dimensions, Image } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { getWithDocument } from '../../backend/get'

function CustomerShortInformation (props) {
    const { uid } = props

    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(false)
    const [user, setUser] = useState({})
    useEffect(async () => {
        const data = await getWithDocument('user', uid)
        setUser(data)
        setLoading(false)
    }, [loading])
    return !loading ? (
        <View
            style={{
                padding: 10,
                width: Dimensions.get('window').width - 100,
                height: Dimensions.get('window').height - 450,
            }}
        >
            <Text
                style={{
                    paddingTop: 20,
                    fontSize: 30,
                }}
            >
                Customer Detail
            </Text>
            {user ? (
                <View style={{ flexDirection: 'column' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Image
                            style={{ width: 50, height: 70 }}
                            source={{ uri: user.imageUrl }}
                        />
                        <Text>{user.name}</Text>
                    </View>
                    <Text>Phone: {user.phone}</Text>
                    <Text>Address: {user.address}</Text>
                    <Text>Student ID: {user.sid}</Text>
                    <Text>Student Email: {user.mail} </Text>
                </View>
            ) : (
                <View>
                    <Text> This order have no user data </Text>
                </View>
            )}
        </View>
    ) : (
        <View>
            <Text> Loading </Text>
        </View>
    )
}
export default CustomerShortInformation
