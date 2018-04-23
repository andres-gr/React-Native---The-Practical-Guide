import { graphql } from 'react-apollo'
import GET_CURRENT_PLACES from '../api/graphql/state/root/getPlaces.graphql'

const withPlaces = graphql(GET_CURRENT_PLACES, {
    props: ({ mutate }) => ({ getPlaces: mutate })
})

export default withPlaces
