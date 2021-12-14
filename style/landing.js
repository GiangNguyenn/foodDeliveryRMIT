import { StyleSheet } from 'react-native'
import styled, { css } from 'styled-components'
import { themeColor } from './constants'
import { StatusBar } from 'react-native'

export const landingPage = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: themeColor.RMITRed,
        margin: '8%',
        width: '70%',
        height: '6%',
        borderRadius: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    view: {
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'relative',
        display: 'flex',
        flex: 1,
    },
    canteenIcon: {
        marginTop: '15%',
        width: '80%',
        height: '20%',
        resizeMode: 'contain',
        alignSelf: 'center',
        justifyContent: 'flex-start',
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 100,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 300,
    },
    title: {
        margin: 20,
        padding: 20,
        color: themeColor.RMITDarkBlue,
    },
    C2AText: {
        color: themeColor.RMITLightBlue,
        padding: 5,
    },
})
