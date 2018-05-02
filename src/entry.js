import SplashScreen from 'react-native-splash-screen'
import { Navigation } from 'react-native-navigation'
import { AsyncStorage } from 'react-native'
import registerScreens from './screens/'
import startMainTabs from './screens/MainTabs/startMainTabs'
import { TOKEN_KEY } from './utils/constants'

registerScreens()

AsyncStorage.getItem(TOKEN_KEY)
    .catch(() => {
        Navigation.startSingleScreenApp({
            screen: {
                screen : 'tuto.AuthScreen',
                title  : 'Login'
            }
        })
    })
    .then(() => {
        startMainTabs()
        SplashScreen.hide()
    })
