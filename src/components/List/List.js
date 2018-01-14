import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import glamFactory from '../../../utils/styles/glamFactory'
import ListItem from '../ListItem/ListItem'

const GlamContainer = glamFactory(View, 'GlamContainer', {
    width: '100%'
})

const List = ({
    deleteEvent,
    places
}) => {
    const output = places.map((place, i) => (
        <ListItem
            deleteEvent={ deleteEvent }
            itemId={ i }
            key={ `key-for-${place}-${i + 1}` }
            placeName={ place }
        />
    ))
    return (
        <GlamContainer>
            { output }
        </GlamContainer>
    )
}

List.propTypes = {
    deleteEvent : PropTypes.func.isRequired,
    places      : PropTypes.arrayOf(PropTypes.string).isRequired
}

export default List
