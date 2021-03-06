import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, Dimensions, ImageBackground, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View } from 'react-native'
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

const GlamAuthContainer = glamFactory(KeyboardAvoidingView, 'GlamAuthContainer', {
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
        checking : false,
        controls : {
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
        isLogin  : true,
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
                if (this.state.isLogin) {
                    controls.confirmPassword = value.trim()
                }
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
        if (this.state.checking) {
            return
        }
        this.setState(prevState => ({
            isLogin  : !prevState.isLogin,
            controls : {
                ...prevState.controls,
                confirmPassword: ''
            }
        }))
    }
    _handleLogin = async () => {
        authValidator.check(this.state.controls)
        const valid = authValidator.isValid()
        if (valid) {
            this.setState({ checking: true })
            try {
                const auth = await this.props.login({ variables: { email: this.state.controls.email, password: this.state.controls.confirmPassword, isLogin: this.state.isLogin } })
                if (auth.data.login.authError) {
                    alert('Internal error, try again')
                    this.setState({ checking: false })
                } else {
                    startMainTabs()
                }
            } catch (e) {
                console.log(e)
                alert('Internal error, try again')
                this.setState({ checking: false })
            }
        } else {
            alert(authValidator.getError())
        }
    }
    render () {
        const viewMode = this.state.isLogin ? 'portrait' : this.state.viewMode
        return (
            <GlamImageBackground source={ backgroundImage }>
                <GlamAuthContainer behavior="padding">
                    { this.state.viewMode === 'portrait'
                        ? (
                            <MainText>
                                <HeadingText>Please { this.state.isLogin ? 'Log In' : 'Sign Up' }</HeadingText>
                            </MainText>
                        )
                        : null
                    }
                    <RaisedButton
                        color="#29AAF4"
                        disabled={ this.state.checking }
                        onPress={ this._handleSwitchLogin }
                    >
                        Switch to { this.state.isLogin ? 'Sign Up' : 'Login' }
                    </RaisedButton>
                    <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
                        <GlamInputContainer>
                            <GlamEmailInput
                                autoCapitalize="none"
                                autoCorrect={ false }
                                isValid={ this.state.valid.email }
                                keyboardType="email-address"
                                onChangeText={ this._handleChangeEmail }
                                placeholder="Your email Address"
                                touched={ this.state.touched.email }
                                value={ this.state.controls.email }
                            />
                            <GlamPasswordContainer
                                viewMode={ viewMode }
                            >
                                <GlamPasswordWrapper
                                    viewMode={ viewMode }
                                >
                                    <GlamPasswordInput
                                        isValid={ this.state.valid.password }
                                        onChangeText={ this._handleChangePassword }
                                        placeholder="Password"
                                        secureTextEntry
                                        touched={ this.state.touched.password }
                                        value={ this.state.controls.password }
                                    />
                                </GlamPasswordWrapper>
                                { !this.state.isLogin && (
                                    <GlamPasswordWrapper
                                        viewMode={ viewMode }
                                    >
                                        <GlamConfirmInput
                                            isValid={ this.state.valid.confirmPassword }
                                            onChangeText={ this._handleChangeConfirmPassword }
                                            placeholder="Confirm Password"
                                            secureTextEntry
                                            touched={ this.state.touched.confirmPassword }
                                            value={ this.state.controls.confirmPassword }
                                        />
                                    </GlamPasswordWrapper>
                                ) }
                            </GlamPasswordContainer>
                        </GlamInputContainer>
                    </TouchableWithoutFeedback>
                    { this.state.checking
                        ? <ActivityIndicator />
                        : (
                            <RaisedButton
                                color="#29AAF4"
                                disabled={ !this.state.isValid }
                                onPress={ this._handleLogin }
                            >
                                Submit
                            </RaisedButton>
                        )
                    }
                </GlamAuthContainer>
            </GlamImageBackground>
        )
    }
}

export default AuthScreen
