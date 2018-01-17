import GET_CURRENT_PLACES from './places.graphql'
import SELECTED_PLACE from './selectedPlace.graphql'

let idPlace = 0

const rootState = {
    defaults: {
        places          : [],
        selectedPlace   : null
    },
    resolvers: {
        Query: {
            places          : () => [],
            selectedPlace   : () => null
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
                        places          : prevCache.places.filter(place => place.key !== key),
                        selectedPlace   : null
                    }
                cache.writeData({ data })
                return {
                    ...data,
                    __typename: 'PlacesStateSelectedState'
                }
            },
            setSelectedPlace: (_root, { key }, { cache }) => {
                const prevCache = cache.readQuery({ query: GET_CURRENT_PLACES }),
                    selectedPlace = key != null ? prevCache.places.find(place => place.key === key) : null,
                    data = { selectedPlace }
                cache.writeQuery({ data, query: SELECTED_PLACE })
                return {
                    ...data,
                    __typename: 'SelectedPlace'
                }
            }
        }
    }
}

export default rootState
