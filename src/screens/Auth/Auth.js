import React, { Component } from 'react'
import { Button, View } from 'react-native'
import startMainTabs from '../MainTabs/startMainTabs'
import glamFactory from '../../utils/styles/glamFactory'
import DefaultInput from '../../components/UI/DefaultInput'
import HeadingText from '../../components/UI/HeadingText'

const GlamAuthContainer = glamFactory(View, 'GlamAuthContainer', {
    alignItems      : 'center',
    flex            : 1,
    justifyContent  : 'center',
    padding         : 8
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
            <GlamAuthContainer>
                <HeadingText>Please Log In</HeadingText>
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
        )
    }
}

export default AuthScreen
