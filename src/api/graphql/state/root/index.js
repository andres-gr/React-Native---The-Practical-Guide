import GET_CURRENT_PLACES from './places.graphql'
import { LOGIN } from './auth.graphql'
import { FIREBASE_URI, FIREBASE_DELETE_URI } from '../../../../utils/constants'

let idPlace = 0

const rootState = {
    defaults: {
        auth   : null,
        places : []
    },
    resolvers: {
        Query: {
            auth   : () => null,
            places : () => []
        },
        Mutation: {
            getPlaces: async (_root, args, { cache }) => {
                const response = await fetch(FIREBASE_URI),
                    jsonRes = await response.json(),
                    data = await jsonRes,
                    prevCache = cache.readQuery({ query: GET_CURRENT_PLACES }),
                    places = []
                Object.entries(data).forEach(([_id, val]) => {
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
                    await fetch(FIREBASE_DELETE_URI(key), { method: 'DELETE' })
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
            login: (parent, { email, password }, { cache }) => {
                const data = {
                    login: {
                        __typename : 'LoginState',
                        auth       : {
                            __typename: 'AuthState',
                            email,
                            password
                        }
                    }
                }
                cache.writeQuery({ data, query: LOGIN })
                return {
                    ...data,
                    __typename: 'LoginState'
                }
            }
        }
    }
}

export default rootState
