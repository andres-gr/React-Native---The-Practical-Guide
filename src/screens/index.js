import { Navigation } from 'react-native-navigation'
import AuthScreen from './Auth/Auth'

function registerScreens () {
    Navigation.registerComponent('tuto.AuthScreen', () => AuthScreen)
}

export default registerScreens
