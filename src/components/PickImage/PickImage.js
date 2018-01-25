import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Image, View } from 'react-native'
import glamFactory from '../../utils/styles/glamFactory'
import image0 from '../../assets/images/image0.jpg'

const GlamPlaceholder = glamFactory(View, 'GlamPlaceholder', {
    backgroundColor : '#EEE',
    borderColor     : '#000',
    borderWidth     : 1,
    height          : 150,
    width           : '80%'
})

const GlamImagePlacholder = glamFactory(Image, 'GlamImagePlacholder', {
    height  : '100%',
    width   : '100%'
})

const GlamButtonContainer = glamFactory(View, 'GlamButtonContainer', {
    margin: 8
})

class PickImage extends PureComponent {
    static propTypes = {}
    render () {
        return (
            <Fragment>
                <GlamPlaceholder>
                    <GlamImagePlacholder source={ image0 } />
                </GlamPlaceholder>
                <GlamButtonContainer>
                    <Button title="Pick image" />
                </GlamButtonContainer>
            </Fragment>
        )
    }
}

export default PickImage
