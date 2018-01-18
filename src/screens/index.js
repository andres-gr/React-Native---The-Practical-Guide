import { Navigation } from 'react-native-navigation'
import AuthScreen from './Auth/Auth'
import FindPlace from './FindPlace/FindPlace'
import SharePlace from './SharePlace/SharePlace'

function registerScreens () {
    Navigation.registerComponent('tuto.AuthScreen', () => AuthScreen)
    Navigation.registerComponent('tuto.FindPlaceScreen', () => FindPlace)
    Navigation.registerComponent('tuto.SharePlaceScreen', () => SharePlace)
}

export default registerScreens
