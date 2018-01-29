import React, { PureComponent, Fragment } from 'react'
// import PropTypes from 'prop-types'
import { Button, View, Text } from 'react-native'
import glamFactory from '../../utils/styles/glamFactory'

const GlamPlaceholder = glamFactory(View, 'GlamPlaceholder', {
    backgroundColor : '#EEE',
    borderColor     : '#000',
    borderWidth     : 1,
    height          : 150,
    width           : '80%'
})

const GlamButtonContainer = glamFactory(View, 'GlamButtonContainer', {
    margin: 8
})

class PickLocation extends PureComponent {
    static propTypes = {}
    _handlePress = () => {
        console.log('press locate me')
    }
    render () {
        return (
            <Fragment>
                <GlamPlaceholder>
                    <Text>Map!</Text>
                </GlamPlaceholder>
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
