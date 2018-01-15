import GET_CURRENT_PLACES from './placesQuery.graphql'

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
                const prevState = cache.readQuery({ query: GET_CURRENT_PLACES })
                const data = prevState.places.concat({
                    key         : String(idPlace += 1),
                    name        : newPlace,
                    image       : { uri: 'http://lorempixel.com/output/abstract-q-c-640-480-2.jpg' },
                    __typeName  : 'PlacesState'
                })
                cache.writeData({ data })
                return data
            }
        }
    }
}

export default rootState
