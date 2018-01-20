import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import addPlace from '../../decorators/addPlace'

@addPlace
class SharePlaceScreen extends PureComponent {
    static propTypes = {
        addPlace: PropTypes.func.isRequired
    }
    _handlePlaceAdded = val => {
        this.props.addPlace(val)
    }
    render () {
        return (
            <View>
                <PlaceInput
                    pressEvent={ this._handlePlaceAdded }
                    placeholder="Add an awesome place"
                    title="Add"
                />
            </View>
        )
    }
}

export default SharePlaceScreen
