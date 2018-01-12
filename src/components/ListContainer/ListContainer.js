import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import glamFactory from '../../../utils/styles/glamFactory'
import ListItem from '../ListItem/ListItem'

const GlamContainer = glamFactory(View, 'GlamContainer', {
    width: '100%'
})

const ListContainer = ({ places }) => {
    const output = places.map((place, i) => <ListItem key={ `key-for-${place}-${i + 1}` } placeName={ place } />)
    return (
        <GlamContainer>
            { output }
        </GlamContainer>
    )
}

ListContainer.propTypes = {
    places: PropTypes.oneOfType([PropTypes.array]).isRequired
}

export default ListContainer
