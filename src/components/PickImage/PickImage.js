import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Image, View } from 'react-native'
import glamFactory from '../../utils/styles/glamFactory'
import ImagePicker from '../../utils/helpers/ImagePicker'

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
    static propTypes = {
        setImage: PropTypes.func.isRequired
    }
    state = {
        image: null
    }
    _handlePress = () => {
        ImagePicker.showImagePicker({ title: 'Pick an image' }, result => {
            if (result.didCancel) {
                console.log('Canceled pick image')
            } else if (result.error) {
                console.log('Error, ', result.error)
            } else {
                this.setState({
                    image: {
                        uri: result.uri
                    }
                }, () => {
                    this.props.setImage(result.uri, result.data)
                })
            }
        })
    }
    render () {
        return (
            <Fragment>
                <GlamPlaceholder>
                    <GlamImagePlacholder source={ this.state.image } />
                </GlamPlaceholder>
                <GlamButtonContainer>
                    <Button
                        onPress={ this._handlePress }
                        title="Pick image"
                    />
                </GlamButtonContainer>
            </Fragment>
        )
    }
}

export default PickImage
