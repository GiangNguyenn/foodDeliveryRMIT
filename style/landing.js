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
        color: 'white',
        margin: '10%',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    view: {
        backgroundColor: themeColor.RMITLightBlue,
        flex: 1,
        justifyContent: 'center',
    },
})