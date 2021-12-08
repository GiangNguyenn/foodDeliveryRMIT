import React from 'react'
import { Image } from 'native-base'
import { landingPage } from '../../style/landing'

export default function RMITCanteenIcon() {
    return (
        <Image
            alt="RMIT icon"
            style={landingPage.canteenIcon}
            source={require('../../assets/RMIT/canteenIcon.png')}
        />
    )
}
