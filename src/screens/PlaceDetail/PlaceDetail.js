import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
    Image,
    Platform,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import glamFactory from '../../utils/styles/glamFactory'
import deletePlace from '../../decorators/deletePlace'

const trashIcon = Platform.OS === 'android' ? 'md-trash' : 'ios-trash'

const GlamDetailContainer = glamFactory(View, 'GlamDetailContainer', {
    margin: 22
})

const GlamDetailImage = glamFactory(Image, 'GlamDetailImage', {
    height : 200,
    width  : '100%'
})

const GlamDetailText = glamFactory(Text, 'GlamDetailText', {
    fontSize   : 28,
    fontWeight : 'bold',
    textAlign  : 'center'
})

const GlamDeleteBtn = glamFactory(View, 'GlamDeleteBtn', {
    alignItems: 'center'
})

@deletePlace
class PlaceDetail extends PureComponent {
    static propTypes = {
        navigator       : PropTypes.object.isRequired,
        deletePlace     : PropTypes.func.isRequired,
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
        this.props.deletePlace(key)
        this.props.navigator.pop()
    }
    render () {
        const {
            selectedPlace
        } = this.props
        return (
            <GlamDetailContainer>
                { selectedPlace
                    ? (
                        <Fragment>
                            <GlamDetailImage
                                resizeMode="contain"
                                source={ selectedPlace.image }
                            />
                            <GlamDetailText>{ selectedPlace.name }</GlamDetailText>
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
                                name={ trashIcon }
                                size={ 30 }
                                color="red"
                            />
                        </GlamDeleteBtn>
                    </TouchableOpacity>
                </View>
            </GlamDetailContainer>
        )
    }
}

export default PlaceDetail
