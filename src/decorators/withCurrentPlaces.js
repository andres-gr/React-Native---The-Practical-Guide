import { graphql } from 'react-apollo'
import GET_CURRENT_PLACES from '../api/graphql/state/root/places.graphql'

const withCurrentPlaces = graphql(GET_CURRENT_PLACES, {
    props: ({ data: { loading, places } }) => ({ loading, places })
})

export default withCurrentPlaces
