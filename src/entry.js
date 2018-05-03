import SplashScreen from 'react-native-splash-screen'
import { Navigation } from 'react-native-navigation'
import { AsyncStorage } from 'react-native'
import registerScreens from './screens/'
import startMainTabs from './screens/MainTabs/startMainTabs'
import { TOKEN_KEY, EXPIRY_DATE } from './utils/constants'

registerScreens()

const startLogin = () => {
    Navigation.startSingleScreenApp({
        screen: {
            screen : 'tuto.AuthScreen',
            title  : 'Login'
        }
    })
}

const clearStorage = () => {
    AsyncStorage.clear()
        .then(() => {
            startLogin()
        })
}

AsyncStorage.getItem(TOKEN_KEY)
    .catch(() => {
        clearStorage()
    })
    .then(result => {
        if (!result) {
            throw new Error('No token')
        }
        return AsyncStorage.getItem(EXPIRY_DATE)
    })
    .then(expiryDate => {
        if (!expiryDate) {
            throw new Error('No date')
        }
        const date = new Date(expiryDate),
            now = new Date()
        if (date > now) {
            startMainTabs()
            SplashScreen.hide()
        } else {
            throw new Error('expired')
        }
    })
    .catch(err => {
        console.log('catched', err)
        clearStorage()
    })

export default startLogin
