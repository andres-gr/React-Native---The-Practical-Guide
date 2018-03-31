import React, { PureComponent, Fragment } from 'react'
// import PropTypes from 'prop-types'
import { Button, View, Dimensions } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
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
        },
        marker: false
    }
    setMapRef = el => {
        this.map = el
    }
    _handleLocatePress = () => {
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                this._handleMapPress({
                    nativeEvent: {
                        coordinate: {
                            latitude,
                            longitude
                        }
                    }
                })
            },
            err => {
                console.dir(err)
            }
        )
    }
    _handleMapPress = ({ nativeEvent: { coordinate } }) => {
        this.setState(prevState => ({
            region: {
                ...prevState.region,
                latitude  : coordinate.latitude,
                longitude : coordinate.longitude
            },
            marker: true
        }), () => {
            this.map.animateToRegion(this.state.region)
        })
    }
    render () {
        return (
            <Fragment>
                <MapView
                    initialRegion={ this.state.region }
                    onPress={ this._handleMapPress }
                    provider={ MapView.PROVIDER_GOOGLE }
                    ref={ this.setMapRef }
                    style={ styles.map }
                >
                    { this.state.marker
                        ? (
                            <Marker
                                coordinate={ this.state.region }
                            />
                        )
                        : null
                    }
                </MapView>
                <GlamButtonContainer>
                    <Button
                        onPress={ this._handleLocatePress }
                        title="Locate me"
                    />
                </GlamButtonContainer>
            </Fragment>
        )
    }
}

export default PickLocation
