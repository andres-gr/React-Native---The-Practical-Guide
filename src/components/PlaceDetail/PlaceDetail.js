import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    Image,
    Modal,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import glamFactory from '../../utils/styles/glamFactory'

const GlamModalContainer = glamFactory(View, 'GlamModalContainer', {
    margin: 22
})

const GlamModalImage = glamFactory(Image, 'GlamModalImage', {
    height : 200,
    width  : '100%'
})

const GlamModalText = glamFactory(Text, 'GlamModalText', {
    fontSize   : 28,
    fontWeight : 'bold',
    textAlign  : 'center'
})

const GlamDeleteBtn = glamFactory(View, 'GlamDeleteBtn', {
    alignItems: 'center'
})

class PlaceDetail extends PureComponent {
    static propTypes = {
        closeModalEvent : PropTypes.func.isRequired,
        deleteEvent     : PropTypes.func.isRequired,
        selectedPlace   : PropTypes.shape({
            image   : PropTypes.any,
            key     : PropTypes.string,
            name    : PropTypes.string
        })
    }
    static defaultProps = {
        selectedPlace: null
    }
    _handleDeletePress = () => {
        const { selectedPlace: { key } } = this.props
        this.props.deleteEvent(key)
    }
    render () {
        const {
            closeModalEvent,
            selectedPlace
        } = this.props
        return (
            <Modal
                animationType="slide"
                onRequestClose={ closeModalEvent }
                visible={ selectedPlace != null }
            >
                <GlamModalContainer>
                    { selectedPlace
                        ? (
                            <Fragment>
                                <GlamModalImage
                                    resizeMode="contain"
                                    source={ selectedPlace.image }
                                />
                                <GlamModalText>{ selectedPlace.name }</GlamModalText>
                            </Fragment>
                        )
                        : null
                    }
                    <View>
                        <TouchableOpacity
                            onPress={ this._handleDeletePress }
                        >
                            <GlamDeleteBtn>
                                <Icon
                                    name="ios-trash"
                                    size={ 30 }
                                    color="red"
                                />
                            </GlamDeleteBtn>
                        </TouchableOpacity>
                        <Button
                            onPress={ closeModalEvent }
                            title="Close"
                        />
                    </View>
                </GlamModalContainer>
            </Modal>
        )
    }
}

export default PlaceDetail
