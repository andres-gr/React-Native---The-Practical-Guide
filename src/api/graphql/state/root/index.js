import GET_CURRENT_PLACES from './places.graphql'

let idPlace = 0

const rootState = {
    defaults: {
        places: []
    },
    resolvers: {
        Query: {
            places: () => []
        },
        Mutation: {
            addPlace: (_root, { newPlace }, { cache }) => {
                idPlace += 1
                const prevCache = cache.readQuery({ query: GET_CURRENT_PLACES }),
                    _id = String(idPlace),
                    nextPlace = {
                        _id,
                        key         : _id,
                        name        : newPlace,
                        image       : {
                            uri: 'http://lorempixel.com/output/abstract-q-c-640-480-2.jpg'
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
            }
        }
    }
}

export default rootState
