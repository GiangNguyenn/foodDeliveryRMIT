import React, { useState, useEffect } from 'react'
import { Text, View, Dimensions } from 'react-native'
import { ListItem, Icon, Overlay, Button } from 'react-native-elements'
import { updateDocument } from '../../backend/update'
import UserOrderHistoryDetail from '../profile/UserOrderHistoryDetail'
import CustomerShortInformation from './CustomerShortInformation'
function ConfirmOrder(props) {
    const { orders, endStatus } = props
    const [visible, setVisible] = useState(false)
    const [uid, setUid] = useState('')
    const handleConfirmOrder = (id) => {
        updateDocument('order', id, { order_status: endStatus })
    }
    return (
        <View
            style={{
                width: Dimensions.get('window').width,
                alignSelf: 'stretch',
                textAlign: 'center',
            }}
        >
            {orders.map((item, index) => (
                <ListItem bottomDivider key={index}>
                    <ListItem.ButtonGroup
                        containerStyle={{ borderWidth: 0 }}
                        buttons={[
                            <Button
                                onPress={() => {
                                    setVisible(true), setUid(item.uid)
                                }}
                                icon={
                                    <Icon
                                        name="person-outline"
                                        size={30}
                                        color="white"
                                        type="ionicon"
                                    />
                                }
                            />,
                        ]}
                    />
                    <ListItem.Content>
                        <ListItem.Title>{item.total_amount} VND</ListItem.Title>
                        <ListItem.Subtitle>
                            {item.payment_method}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.ButtonGroup
                        containerStyle={{ borderWidth: 0 }}
                        buttons={[
                            <Button
                                onPress={() => handleConfirmOrder(item.ref)}
                                icon={
                                    <Icon
                                        name="check"
                                        size={20}
                                        color="green"
                                    />
                                }
                            />,
                            <Button
                                icon={
                                    <Icon
                                        name="close-outline"
                                        size={20}
                                        color="red"
                                        type="ionicon"
                                    />
                                }
                            />,
                        ]}
                    />
                    <UserOrderHistoryDetail data={item} />
                </ListItem>
            ))}
            <Overlay
                visible={visible}
                onBackdropPress={() => setVisible(false)}
                style={{}}
            >
                <CustomerShortInformation uid={uid} />
            </Overlay>
        </View>
    )
}
export default ConfirmOrder
