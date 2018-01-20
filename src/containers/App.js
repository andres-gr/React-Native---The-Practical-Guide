import { compose, graphql } from 'react-apollo'
import GET_CURRENT_PLACES from '../api/graphql/state/root/places.graphql'
import ADD_PLACE from '../api/graphql/state/root/addPlace.graphql'
import DELETE_PLACE from '../api/graphql/state/root/deletePlace.graphql'
import App from '../components/App'

const addPlace = graphql(ADD_PLACE, {
    props: ({ mutate }) => ({
        addPlace: newPlace => mutate({ variables: { newPlace } })
    })
})

const deletePlace = graphql(DELETE_PLACE, {
    props: ({ mutate }) => ({
        deletePlace: key => mutate({ variables: { key } })
    })
})

const withCurrentPlaces = graphql(GET_CURRENT_PLACES, {
    props: ({ data: { places } }) => ({ places })
})

export default compose(
    withCurrentPlaces,
    addPlace,
    deletePlace
)(App)
