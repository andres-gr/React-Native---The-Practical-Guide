import React from 'react'
import PropTypes from 'prop-types'
import {
    Text,
    View
} from 'react-native'
import glamFactory from '../../../utils/styles/glamFactory'

const GlamView = glamFactory(View, 'GlamView', {
    backgroundColor : '#EEE',
    margin          : 5,
    padding         : 10,
    width           : '100%'
})

const ListItem = ({ placeName }) => (
    <GlamView>
        <Text>{ placeName }</Text>
    </GlamView>
)

ListItem.propTypes = {
    placeName: PropTypes.string.isRequired
}

export default ListItem
