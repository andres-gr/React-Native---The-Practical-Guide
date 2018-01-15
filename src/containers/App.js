import { graphql } from 'react-apollo'
import GET_CURRENT_PLACES from '../api/graphql/state/root/placesQuery.graphql'
import App from '../components/App'

const withCurrentPlaces = graphql(GET_CURRENT_PLACES, {
    props: ({ data: { places } }) => ({ places })
})

export default withCurrentPlaces(App)
