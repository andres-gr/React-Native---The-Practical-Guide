import React, { PureComponent, Fragment } from 'react'
// import PropTypes from 'prop-types'
import { Button, View, Dimensions } from 'react-native'
import MapView from 'react-native-maps'
import EStyleSheet from 'react-native-extended-stylesheet'
import glamFactory from '../../utils/styles/glamFactory'

const styles = EStyleSheet.create({
    map: {
        height : 250,
        width  : '100%'
    }
})

const GlamButtonContainer = glamFactory(View, 'GlamButtonContainer', {
    margin: 8
})

class PickLocation extends PureComponent {
    static propTypes = {}
    state = {
        region: {
            latitude       : 25.6117328,
            longitude      : -100.299279,
            latitudeDelta  : 0.0122,
            longitudeDelta : (Dimensions.get('window').width / Dimensions.get('window').height) * 0.0122
        }
    }
    _handlePress = () => {
        console.log('press locate me')
    }
    render () {
        return (
            <Fragment>
                <MapView
                    initialRegion={ this.state.region }
                    provider={ MapView.PROVIDER_GOOGLE }
                    style={ styles.map }
                />
                <GlamButtonContainer>
                    <Button
                        onPress={ this._handlePress }
                        title="Locate me"
                    />
                </GlamButtonContainer>
            </Fragment>
        )
    }
}

export default PickLocation
