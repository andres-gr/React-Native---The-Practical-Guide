import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, ImageBackground, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import EStyleSheet from 'react-native-extended-stylesheet'
import startMainTabs from '../MainTabs/startMainTabs'
import glamFactory from '../../utils/styles/glamFactory'
import DefaultInput from '../../components/UI/DefaultInput'
import HeadingText from '../../components/UI/HeadingText'
import MainText from '../../components/UI/MainText'
import backgroundImage from '../../assets/images/background.jpg'
import RaisedButton from '../../components/UI/RaisedButton'
import Validator from '../../utils/validation/validator'
import authConstraints from '../../utils/validation/auth'

const authValidator = new Validator(authConstraints)

const validInput = ({ isValid, touched }) => ({
    backgroundColor: !isValid && touched ? '#FF4A4A' : '#EEE'
})

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

const GlamEmailInput = glamFactory(DefaultInput, 'GlamEmailInput', inputStyles, validInput)

const GlamPasswordContainer = glamFactory(View, 'GlamPasswordContainer', {}, ({ viewMode }) => ({
    flexDirection  : viewMode === 'portrait' ? 'column' : 'row',
    justifyContent : viewMode === 'portrait' ? 'flex-start' : 'space-between'
}))

const GlamPasswordWrapper = glamFactory(View, 'GlamPasswordWrapper', {}, ({ viewMode }) => ({
    width: viewMode === 'portrait' ? '100%' : '45%'
}))

const GlamPasswordInput = glamFactory(DefaultInput, 'GlamPasswordInput', inputStyles, validInput)

const GlamConfirmInput = glamFactory(DefaultInput, 'GlamConfirmInput', inputStyles, validInput)

class AuthScreen extends Component {
    static navigatorStyle = {
        statusBarTextColorScheme : 'light',
        statusBarColor           : EStyleSheet.value('$statusBarColor'),
        navBarHidden             : true,
        screenBackgroundColor    : EStyleSheet.value('$statusBarColor')
    }
    static propTypes = {
        login: PropTypes.func.isRequired
    }
    constructor (props) {
        super(props)
        Dimensions.addEventListener('change', this._handleOrientationChange)
    }
    state = {
        controls: {
            email           : '',
            password        : '',
            confirmPassword : ''
        },
        valid: {
            email           : false,
            password        : false,
            confirmPassword : false
        },
        touched: {
            email           : false,
            password        : false,
            confirmPassword : false
        },
        isValid  : false,
        viewMode : Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
    }
    componentDidMount () {
        SplashScreen.hide()
    }
    componentWillUnmount () {
        Dimensions.removeEventListener('change', this._handleOrientationChange)
    }
    _handleChangeText = (key, value) => {
        this.setState(prevState => {
            const controls = {
                [key]: value.trim()
            }
            if (key === 'confirmPassword') {
                controls.password = prevState.controls.password
            }
            if (key === 'password') {
                controls.confirmPassword = prevState.controls.confirmPassword
            }
            authValidator.check(controls)
            const valid = authValidator.getValid()
            authValidator.check({
                ...prevState.controls,
                ...controls
            })
            const isValid = authValidator.isValid()
            return {
                controls: {
                    ...prevState.controls,
                    ...controls
                },
                valid: {
                    ...prevState.valid,
                    ...valid
                },
                isValid,
                touched: {
                    ...prevState.touched,
                    [key]: true
                }
            }
        })
    }
    _handleChangeEmail = value => {
        this._handleChangeText('email', value)
    }
    _handleChangePassword = value => {
        this._handleChangeText('password', value)
    }
    _handleChangeConfirmPassword = value => {
        this._handleChangeText('confirmPassword', value)
    }
    _handleOrientationChange = dimensions => {
        const { window: { height } } = dimensions
        this.setState({ viewMode: height > 500 ? 'portrait' : 'landscape' })
    }
    _handleSwitchLogin = () => {
        alert('Cosa')
    }
    _handleLogin = () => {
        authValidator.check(this.state.controls)
        const valid = authValidator.isValid()
        if (valid) {
            this.props.login({ variables: { email: this.state.controls.email, password: this.state.controls.confirmPassword } })
            startMainTabs()
        } else {
            alert(authValidator.getError())
        }
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
                        <GlamEmailInput
                            isValid={ this.state.valid.email }
                            onChangeText={ this._handleChangeEmail }
                            placeholder="Your email Address"
                            touched={ this.state.touched.email }
                            value={ this.state.controls.email }
                        />
                        <GlamPasswordContainer
                            viewMode={ this.state.viewMode }
                        >
                            <GlamPasswordWrapper
                                viewMode={ this.state.viewMode }
                            >
                                <GlamPasswordInput
                                    isValid={ this.state.valid.password }
                                    onChangeText={ this._handleChangePassword }
                                    placeholder="Password"
                                    touched={ this.state.touched.password }
                                    value={ this.state.controls.password }
                                />
                            </GlamPasswordWrapper>
                            <GlamPasswordWrapper
                                viewMode={ this.state.viewMode }
                            >
                                <GlamConfirmInput
                                    isValid={ this.state.valid.confirmPassword }
                                    onChangeText={ this._handleChangeConfirmPassword }
                                    placeholder="Confirm Password"
                                    touched={ this.state.touched.confirmPassword }
                                    value={ this.state.controls.confirmPassword }
                                />
                            </GlamPasswordWrapper>
                        </GlamPasswordContainer>
                    </GlamInputContainer>
                    <RaisedButton
                        color="#29AAF4"
                        disabled={ !this.state.isValid }
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
