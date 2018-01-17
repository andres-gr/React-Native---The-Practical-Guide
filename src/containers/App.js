import { compose, graphql } from 'react-apollo'
import GET_CURRENT_PLACES from '../api/graphql/state/root/places.graphql'
import ADD_PLACE from '../api/graphql/state/root/addPlace.graphql'
import DELETE_PLACE from '../api/graphql/state/root/deletePlace.graphql'
import SELECTED_PLACE from '../api/graphql/state/root/selectedPlace.graphql'
import SET_SELECTED_PLACE from '../api/graphql/state/root/setSelectedPlace.graphql'
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

const setSelectedPlace = graphql(SET_SELECTED_PLACE, {
    props: ({ mutate }) => ({
        setSelectedPlace: key => mutate({ variables: { key } })
    })
})

const withSelectedPlace = graphql(SELECTED_PLACE, {
    props: ({ data: { selectedPlace } }) => ({ selectedPlace })
})

const withCurrentPlaces = graphql(GET_CURRENT_PLACES, {
    props: ({ data: { places } }) => ({ places })
})

export default compose(
    withCurrentPlaces,
    withSelectedPlace,
    setSelectedPlace,
    addPlace,
    deletePlace
)(App)
