import React, { Component } from 'react'
import { Dimensions, ImageBackground, View } from 'react-native'
import startMainTabs from '../MainTabs/startMainTabs'
import glamFactory from '../../utils/styles/glamFactory'
import DefaultInput from '../../components/UI/DefaultInput'
import HeadingText from '../../components/UI/HeadingText'
import MainText from '../../components/UI/MainText'
import backgroundImage from '../../assets/images/background.jpg'
import RaisedButton from '../../components/UI/RaisedButton'

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

const GlamPasswordContainer = glamFactory(View, 'GlamPasswordContainer', {}, ({ viewMode }) => ({
    flexDirection  : viewMode === 'portrait' ? 'column' : 'row',
    justifyContent : viewMode === 'portrait' ? 'flex-start' : 'space-between'
}))

const GlamPasswordWrapper = glamFactory(View, 'GlamPasswordWrapper', {}, ({ viewMode }) => ({
    width: viewMode === 'portrait' ? '100%' : '45%'
}))

const GlamPasswordInput = glamFactory(DefaultInput, 'GlamPasswordInput', inputStyles)

const GlamConfirmInput = glamFactory(DefaultInput, 'GlamConfirmInput', inputStyles)

class AuthScreen extends Component {
    constructor (props) {
        super(props)
        Dimensions.addEventListener('change', this._handleOrientationChange)
    }
    state = {
        viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
    }
    componentWillUnmount () {
        Dimensions.removeEventListener('change', this._handleOrientationChange)
    }
    _handleOrientationChange = dimensions => {
        const { window: { height } } = dimensions
        this.setState({ viewMode: height > 500 ? 'portrait' : 'landscape' })
    }
    _handleSwitchLogin = () => {
        alert('Cosa')
    }
    _handleLogin = () => {
        startMainTabs()
    }
    render () {
        return (
            <GlamImageBackground source={ backgroundImage }>
                <GlamAuthContainer>
                    { this.state.viewMode === 'portrait'
                        ? (
                            <MainText>
                                <HeadingText>Please Log In</HeadingText>
                            </MainText>
                        )
                        : null
                    }
                    <RaisedButton
                        color="#29AAF4"
                        onPress={ this._handleSwitchLogin }
                    >
                        Switch to Login
                    </RaisedButton>
                    <GlamInputContainer>
                        <GlamEmailContainer
                            placeholder="Your email Address"
                        />
                        <GlamPasswordContainer
                            viewMode={ this.state.viewMode }
                        >
                            <GlamPasswordWrapper
                                viewMode={ this.state.viewMode }
                            >
                                <GlamPasswordInput
                                    placeholder="Password"
                                />
                            </GlamPasswordWrapper>
                            <GlamPasswordWrapper
                                viewMode={ this.state.viewMode }
                            >
                                <GlamConfirmInput
                                    placeholder="Confirm Password"
                                />
                            </GlamPasswordWrapper>
                        </GlamPasswordContainer>
                    </GlamInputContainer>
                    <RaisedButton
                        color="#29AAF4"
                        onPress={ this._handleLogin }
                    >
                        Submit
                    </RaisedButton>
                </GlamAuthContainer>
            </GlamImageBackground>
        )
    }
}

export default AuthScreen
