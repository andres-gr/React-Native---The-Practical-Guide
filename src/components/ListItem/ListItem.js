import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import glamFactory from '../../../utils/styles/glamFactory'

const GlamView = glamFactory(View, 'GlamView', {
    backgroundColor : '#EEE',
    margin          : 5,
    padding         : 10,
    width           : '100%'
})

class ListItem extends PureComponent {
    static propTypes = {
        deleteEvent : PropTypes.func.isRequired,
        itemId      : PropTypes.number.isRequired,
        placeName   : PropTypes.string.isRequired
    }
    _handlePress = () => {
        this.props.deleteEvent(this.props.itemId)
    }
    render () {
        const { placeName } = this.props
        return (
            <TouchableOpacity
                onPress={ this._handlePress }
            >
                <GlamView>
                    <Text>{ placeName }</Text>
                </GlamView>
            </TouchableOpacity>
        )
    }
}

export default ListItem
