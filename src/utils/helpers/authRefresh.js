import moment from 'moment'
import { AsyncStorage } from 'react-native'
import { TOKEN_KEY, EXPIRY_DATE, REFRESH_TOKEN, FIREBASE_REFRESH } from '../constants'

export const authRefresh = async ({ response }) => {
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

export const getToken = async () => {
    try {
        const [
            idToken,
            expiryDate,
            refreshToken
        ] = await Promise.all([
            AsyncStorage.getItem(TOKEN_KEY),
            AsyncStorage.getItem(EXPIRY_DATE),
            AsyncStorage.getItem(REFRESH_TOKEN)
        ])
        if (!idToken || !refreshToken) {
            return { error: 'no token' }
        }
        const now = new Date()
        if (expiryDate > now) {
            return { idToken }
        }
        const refreshResponse = await fetch(FIREBASE_REFRESH, {
            method  : 'POST',
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`
        }).then(response => response.json())
        const expiry = parseInt(refreshResponse.expires_in, 10),
            newExpiryDate = moment().add(expiry, 'minutes')._d
        await AsyncStorage.setItem(TOKEN_KEY, refreshResponse.id_token)
        await AsyncStorage.setItem(EXPIRY_DATE, newExpiryDate)
        await AsyncStorage.setItem(REFRESH_TOKEN, refreshResponse.refresh_token)
        return { idToken: refreshResponse.id_token }
    } catch (e) {
        console.log(e)
        return { error: e }
    }
}
