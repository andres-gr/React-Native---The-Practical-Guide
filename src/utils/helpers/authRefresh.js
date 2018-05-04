import moment from 'moment'
import { AsyncStorage } from 'react-native'
import { TOKEN_KEY, EXPIRY_DATE, REFRESH_TOKEN } from '../constants'

const authRefresh = async ({ response }) => {
    const { idToken, refreshToken, expiresIn, error } = response
    if (error) {
        return { error: error.message }
    }
    const expiry = parseInt(expiresIn, 10),
        expiryDate = moment().add(expiry, 'minutes')._d
    await AsyncStorage.setItem(TOKEN_KEY, idToken)
    await AsyncStorage.setItem(EXPIRY_DATE, expiryDate)
    await AsyncStorage.setItem(REFRESH_TOKEN, refreshToken)
    return { idToken }
}

export default authRefresh
