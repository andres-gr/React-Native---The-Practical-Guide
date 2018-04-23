import GET_CURRENT_PLACES from './places.graphql'
import { LOGIN } from './auth.graphql'

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
            addPlace: (_root, { placeName, latitude, longitude, image: { uri, base64 } }, { cache }) => {
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
            deletePlace: (_root, { key }, { cache }) => {
                const prevCache = cache.readQuery({ query: GET_CURRENT_PLACES }),
                    data = {
                        places: prevCache.places.filter(place => place.key !== key)
                    }
                cache.writeQuery({ data, query: GET_CURRENT_PLACES })
                return {
                    ...data,
                    __typename: 'PlacesState'
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
