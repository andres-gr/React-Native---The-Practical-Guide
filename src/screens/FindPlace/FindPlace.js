import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import List from '../../components/List/List'
import withCurrentPlaces from '../../decorators/withCurrentPlaces'
import sideDrawerToggle from '../../utils/helpers/sideDrawerToggle'

@withCurrentPlaces
class FindPlaceScreen extends PureComponent {
    static propTypes = {
        navigator   : PropTypes.object.isRequired,
        places      : PropTypes.arrayOf(PropTypes.object).isRequired
    }
    constructor (props) {
        super(props)
        props.navigator.addOnNavigatorEvent(sideDrawerToggle.bind(this, { side: 'left' }))
    }
    _handleItemPress = key => {
        const selectedPlace = this.props.places.find(place => place.key === key)
        this.props.navigator.push({
            backButtonTitle : 'Back',
            passProps       : {
                selectedPlace
            },
            screen         : 'tuto.PlaceDetailScreen',
            title          : selectedPlace.name,
            navigatorStyle : {
                navBarButtonColor: 'orange'
            }
        })
    }
    render () {
        return (
            <View>
                <List
                    pressEvent={ this._handleItemPress }
                    places={ this.props.places }
                />
            </View>
        )
    }
}

export default FindPlaceScreen
