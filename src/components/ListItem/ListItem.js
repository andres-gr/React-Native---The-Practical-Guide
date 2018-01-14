import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import glamFactory from '../../../utils/styles/glamFactory'

const GlamView = glamFactory(View, 'GlamView', {
    alignItems      : 'center',
    backgroundColor : '#EEE',
    flexDirection   : 'row',
    margin          : 5,
    padding         : 10,
    width           : '100%'
})

const GlamImage = glamFactory(Image, 'GlamImage', {
    height      : 30,
    marginRight : 8,
    width       : 30
})

class ListItem extends PureComponent {
    static propTypes = {
        deleteEvent : PropTypes.func.isRequired,
        itemId      : PropTypes.number.isRequired,
        placeName   : PropTypes.string.isRequired,
        placeImage  : PropTypes.oneOfType([PropTypes.any]).isRequired
    }
    _handlePress = () => {
        this.props.deleteEvent(this.props.itemId)
    }
    render () {
        const { placeName, placeImage } = this.props
        return (
            <TouchableOpacity
                onPress={ this._handlePress }
            >
                <GlamView>
                    <GlamImage
                        resizeMode="contain"
                        source={ placeImage }
                    />
                    <Text>{ placeName }</Text>
                </GlamView>
            </TouchableOpacity>
        )
    }
}

export default ListItem
