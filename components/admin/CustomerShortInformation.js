import React, { useState, useEffect } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { getWithDocument } from '../../backend/get'

function CustomerShortInformation(props) {
    const { uid } = props

    const [loading, setLoading] = useState(true)
    const [visible, setVisible] = useState(false)
    const [user, setUser] = useState({})
    useEffect(async () => {
        const data = await getWithDocument('user', uid)
        setUser(data)
        setLoading(false)
        console.log(user)
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
                Object.keys(user).map((item) => (
                    <View style={{ flexDirection: 'row' }}>
                        <Text>
                            {item}: {user[item]}
                        </Text>
                    </View>
                ))
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
