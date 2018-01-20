import { graphql } from 'react-apollo'
import DELETE_PLACE from '../api/graphql/state/root/deletePlace.graphql'

const deletePlace = graphql(DELETE_PLACE, {
    props: ({ mutate }) => ({
        deletePlace: key => mutate({ variables: { key } })
    })
})

export default deletePlace
