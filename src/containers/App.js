import { compose, graphql } from 'react-apollo'
import GET_CURRENT_PLACES from '../api/graphql/state/root/places.graphql'
import ADD_PLACE from '../api/graphql/state/root/addPlace.graphql'
import App from '../components/App'

const addPlace = graphql(ADD_PLACE, {
    props: ({ mutate }) => ({
        addPlace: newPlace => mutate({ variables: { newPlace } })
    })
})

const withCurrentPlaces = graphql(GET_CURRENT_PLACES, {
    props: ({ data: { places } }) => ({ places })
})

export default compose(
    addPlace,
    withCurrentPlaces
)(App)
