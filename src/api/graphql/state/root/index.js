import GET_CURRENT_PLACES from './places.graphql'
import GET_SELECTED_PLACE from './selectedPlace.graphql'

let idPlace = 0

const rootState = {
    defaults: {
        places          : [],
        selectedPlace   : null
    },
    resolvers: {
        Query: {
            places          : (_root, args, { cache }) => cache.readQuery({ query: GET_CURRENT_PLACES }),
            selectedPlace   : (_root, args, { cache }) => cache.readQuery({ query: GET_SELECTED_PLACE })
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
                        image       : { uri: 'http://lorempixel.com/output/abstract-q-c-640-480-2.jpg' }
                    }
                const data = {
                    places      : prevCache.places.concat(nextPlace),
                    __typename  : 'PlacesState'
                }
                cache.writeQuery({ data, query: GET_CURRENT_PLACES })
                return data
            }
        }
    }
}

export default rootState
