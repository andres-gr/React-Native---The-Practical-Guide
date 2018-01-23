import React, { Component } from 'react'
import { Button, ImageBackground, View } from 'react-native'
import startMainTabs from '../MainTabs/startMainTabs'
import glamFactory from '../../utils/styles/glamFactory'
import DefaultInput from '../../components/UI/DefaultInput'
import HeadingText from '../../components/UI/HeadingText'
import MainText from '../../components/UI/MainText'
import backgroundImage from '../../assets/images/background.jpg'

const GlamAuthContainer = glamFactory(View, 'GlamAuthContainer', {
    alignItems      : 'center',
    flex            : 1,
    justifyContent  : 'center',
    padding         : 8
})

const GlamImageBackground = glamFactory(ImageBackground, 'GlamImageBackground', {
    flex    : 1,
    width   : '100%'
})

const GlamInputContainer = glamFactory(View, 'GlamInputContainer', {
    width: '80%'
})

const inputStyles = {
    backgroundColor : '#EEE',
    borderColor     : '#BBB'
}

const GlamEmailContainer = glamFactory(DefaultInput, 'GlamEmailContainer', inputStyles)

const GlamPasswordInput = glamFactory(DefaultInput, 'GlamPasswordInput', inputStyles)

const GlamConfirmInput = glamFactory(DefaultInput, 'GlamConfirmInput', inputStyles)

class AuthScreen extends Component {
    _handleLogin = () => {
        startMainTabs()
    }
    render () {
        return (
            <GlamImageBackground source={ backgroundImage }>
                <GlamAuthContainer>
                    <MainText>
                        <HeadingText>Please Log In</HeadingText>
                    </MainText>
                    <Button
                        title="Switch to Login"
                    />
                    <GlamInputContainer>
                        <GlamEmailContainer
                            placeholder="Your email Address"
                        />
                        <GlamPasswordInput
                            placeholder="Password"
                        />
                        <GlamConfirmInput
                            placeholder="Confirm Password"
                        />
                    </GlamInputContainer>
                    <Button
                        onPress={ this._handleLogin }
                        title="Submit"
                    />
                </GlamAuthContainer>
            </GlamImageBackground>
        )
    }
}

export default AuthScreen
