import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'
import startMainTabs from '../MainTabs/startMainTabs'

class AuthScreen extends Component {
    _handleLogin = () => {
        startMainTabs()
    }
    render () {
        return (
            <View>
                <Text>Auth Screen</Text>
                <Button
                    onPress={ this._handleLogin }
                    title="Login"
                />
            </View>
        )
    }
}

export default AuthScreen
