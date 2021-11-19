import { StyleSheet } from 'react-native'
import styled, { css } from 'styled-components'
import { themeColor } from './constants'

export const landingPage = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: themeColor.RMITRed,
        margin: '10%',
        position: 'relative',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    view: {
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        position: 'relative',
        display: 'flex',
        flex: 1,
    },
    canteenIcon: {
        width: '80%',
        height: '50%',
        resizeMode: 'contain',
        alignSelf:'center'
    },
})


