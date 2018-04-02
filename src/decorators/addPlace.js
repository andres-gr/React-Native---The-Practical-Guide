import { graphql } from 'react-apollo'
import ADD_PLACE from '../api/graphql/state/root/addPlace.graphql'

const addPlace = graphql(ADD_PLACE, {
    props: ({ mutate }) => ({
        addPlace: ({ placeName, latitude, longitude, uri }) => mutate({ variables: { placeName, latitude, longitude, uri } })
    })
})

export default addPlace
