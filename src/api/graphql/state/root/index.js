import { AsyncStorage } from 'react-native'
import GET_CURRENT_PLACES from './places.graphql'
import TOKEN from './authQuery.graphql'
import { FIREBASE_URI, FIREBASE_DELETE_URI, FIREBASE_SIGNUP, FIREBASE_LOGIN, TOKEN_KEY, EXPIRY_DATE, REFRESH_TOKEN } from '../../../../utils/constants'
import authRefresh from '../../../../utils/helpers/authRefresh';

let idPlace = 0

const rootState = {
    defaults: {
        authError : null,
        authToken : null,
        places    : []
    },
    resolvers: {
        Mutation: {
            getPlaces: async (_root, args, { cache }) => {
                const request = await fetch(`${FIREBASE_URI}?auth=${await AsyncStorage.getItem(TOKEN_KEY)}`),
                    response = await request.json()
                if (response.error) {
                    return null
                }
                const prevCache = cache.readQuery({ query: GET_CURRENT_PLACES }),
                    places = []
                Object.entries(response).forEach(([_id, val]) => {
                    places.push({
                        _id,
                        key      : _id,
                        name     : val.name,
                        location : {
                            __typename: 'LocationState',
                            ...val.location
                        },
                        image: {
                            __typename : 'ImageState',
                            uri        : val.image
                        }
                    })
                })
                const newData = {
                    places: [...prevCache, ...places]
                }
                cache.writeQuery({ query: GET_CURRENT_PLACES, data: newData })
                return {
                    ...newData,
                    __typename: 'PlacesState'
                }
            },
            addPlace: (_root, { placeName, latitude, longitude, uri }, { cache }) => {
                idPlace += 1
                const prevCache = cache.readQuery({ query: GET_CURRENT_PLACES }),
                    _id = String(idPlace),
                    nextPlace = {
                        _id,
                        key      : _id,
                        name     : placeName,
                        location : {
                            __typename: 'LocationState',
                            latitude,
                            longitude
                        },
                        image: {
                            __typename: 'ImageState',
                            uri
                        }
                    },
                    data = {
                        places: prevCache.places.concat(nextPlace)
                    }
                cache.writeQuery({ data, query: GET_CURRENT_PLACES })
                return {
                    ...data,
                    __typename: 'PlacesState'
                }
            },
            deletePlace: async (_root, { key }, { cache }) => {
                try {
                    await fetch(FIREBASE_DELETE_URI(key, await AsyncStorage.getItem(TOKEN_KEY)), { method: 'DELETE' })
                    const prevCache = cache.readQuery({ query: GET_CURRENT_PLACES }),
                        data = {
                            places: prevCache.places.filter(place => place.key !== key)
                        }
                    cache.writeQuery({ data, query: GET_CURRENT_PLACES })
                    return {
                        ...data,
                        __typename: 'PlacesState'
                    }
                } catch (e) {
                    console.log(e)
                    return null
                }
            },
            login: async (parent, { email, password, isLogin }, { cache }) => {
                const payload = {
                    method : 'POST',
                    body   : JSON.stringify({
                        email,
                        password,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const request = await fetch(isLogin ? FIREBASE_LOGIN : FIREBASE_SIGNUP, payload),
                    response = await request.json()
                const result = await authRefresh({ response })
                if (result.error) {
                    return {
                        __typename : 'Auth',
                        authError  : result.error.message
                    }
                }
                const data = {
                    __typename : 'Auth',
                    authToken  : result.idToken
                }
                cache.writeQuery({ data, query: TOKEN })
                return data
            }
        }
    }
}

export default rootState
