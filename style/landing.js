import { StyleSheet } from 'react-native'
import styled, { css } from 'styled-components'
import { themeColor } from './constants'
import { StatusBar } from 'react-native'

export const landingPage = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: themeColor.RMITRed,
        marginTop: 0,
        marginBottom: 0,
        marginRight: 30,
        marginLeft: 30,
        height: 50,
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
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        position: 'relative',
        display: 'flex',
        flex: 1,
    },
    canteenIcon: {
        width: '80%',
        height: '30%',
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 300,
    },
    title: {
        fontSize: 30,
        color: themeColor.RMITDarkBlue,
    },
    C2AText: {
        color: themeColor.RMITLightBlue,
        padding: 5,
    },
})
