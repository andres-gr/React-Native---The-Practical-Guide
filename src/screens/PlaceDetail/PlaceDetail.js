import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Image, Platform, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import glamFactory from '../../utils/styles/glamFactory'
import deletePlace from '../../decorators/deletePlace'

const trashIcon = Platform.OS === 'android' ? 'md-trash' : 'ios-trash'

const GlamDetailContainer = glamFactory(View, 'GlamDetailContainer', {
    margin: 22
}, ({ viewMode }) => ({
    flexDirection: viewMode === 'landscape' ? 'row' : 'column'
}))

const GlamDetailImage = glamFactory(Image, 'GlamDetailImage', {
    height : 200,
    width  : '100%'
}, ({ viewMode }) => ({
    height : viewMode === 'landscape' ? 150 : 200,
    width  : viewMode === 'landscape' ? '50%' : '100%'
}))

const GlamTitleBtnContainer = glamFactory(View, 'GlamTitleBtnContainer', {
    width: '100%'
}, ({ viewMode }) => ({
    justifyContent : viewMode === 'landscape' ? 'center' : 'flex-start',
    width          : viewMode === 'landscape' ? '50%' : '100%'
}))

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
    constructor (props) {
        super(props)
        Dimensions.addEventListener('change', this._handleOrientationChange)
    }
    state = {
        viewMode: Dimensions.get('window').height > 500 ? 'portrait' : 'landscape'
    }
    componentWillUnmount () {
        Dimensions.removeEventListener('change', this._handleOrientationChange)
    }
    _handleOrientationChange = dimensions => {
        const { window: { height } } = dimensions
        this.setState({ viewMode: height > 500 ? 'portrait' : 'landscape' })
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
            <GlamDetailContainer
                viewMode={ this.state.viewMode }
            >
                { selectedPlace &&
                    <GlamDetailImage
                        resizeMode="contain"
                        source={ selectedPlace.image }
                        viewMode={ this.state.viewMode }
                    />
                }
                <GlamTitleBtnContainer
                    viewMode={ this.state.viewMode }
                >
                    { selectedPlace &&
                        <GlamDetailText>{ selectedPlace.name }</GlamDetailText>
                    }
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
                </GlamTitleBtnContainer>
            </GlamDetailContainer>
        )
    }
}

export default PlaceDetail
