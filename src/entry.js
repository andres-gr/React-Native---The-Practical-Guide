import SplashScreen from 'react-native-splash-screen'
import { Navigation } from 'react-native-navigation'
import { AsyncStorage } from 'react-native'
import registerScreens from './screens/'
import startMainTabs from './screens/MainTabs/startMainTabs'
import { TOKEN_KEY, EXPIRY_DATE, REFRESH_TOKEN, FIREBASE_REFRESH } from './utils/constants'
import authRefresh from './utils/helpers/authRefresh'

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

Promise.all([
    AsyncStorage.getItem(TOKEN_KEY),
    AsyncStorage.getItem(EXPIRY_DATE),
    AsyncStorage.getItem(REFRESH_TOKEN)
])
    .then(result => {
        const [token, expiry, refresh] = result
        if (token && expiry) {
            const now = new Date(),
                date = new Date(expiry)
            if (date > now) {
                startMainTabs()
                SplashScreen.hide()
            } else if (refresh) {
                return fetch(FIREBASE_REFRESH, {
                    method  : 'POST',
                    headers : {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `grant_type=refresh_token&refresh_token=${refresh}`
                }).then(response => response.json())
            } else {
                throw new Error('no refresh')
            }
        } else {
            throw new Error('no valid token')
        }
    })
    .then(result => {
        if (result) {
            authRefresh({
                response: {
                    idToken      : result.id_token,
                    error        : result.error,
                    refreshToken : result.refresh_token,
                    expiresIn    : result.expires_in
                }
            }).then(response => {
                if (response.idToken) {
                    startMainTabs()
                    SplashScreen.hide()
                } else {
                    throw new Error('no token')
                }
            })
        }
    })
    .catch(error => {
        console.log('catched', error)
        clearStorage()
    })

export default startLogin
