import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Dimensions, Image, Platform, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import EStyleSheet from 'react-native-extended-stylesheet'
import Icon from 'react-native-vector-icons/Ionicons'
import glamFactory from '../../utils/styles/glamFactory'
import deletePlace from '../../decorators/deletePlace'

const trashIcon = Platform.OS === 'android' ? 'md-trash' : 'ios-trash'

const GlamDetailContainer = glamFactory(View, 'GlamDetailContainer', {
    flex             : 1,
    marginHorizontal : 20,
    marginTop        : 8
}, ({ viewMode }) => ({
    flexDirection: viewMode === 'landscape' ? 'row' : 'column'
}))

const GlamDetailImage = glamFactory(Image, 'GlamDetailImage', {
    height : '100%',
    width  : '100%'
})

const GlamTitleBtnContainer = glamFactory(View, 'GlamTitleBtnContainer', {
    flex: 1
})

const GlamDetailText = glamFactory(Text, 'GlamDetailText', {
    fontSize   : 28,
    fontWeight : 'bold',
    textAlign  : 'center'
})

const GlamDeleteBtn = glamFactory(View, 'GlamDeleteBtn', {
    alignItems: 'center'
})

const styles = EStyleSheet.create({
    subContainer: {
        flex: 2
    },
    map: {
        ...EStyleSheet.absoluteFillObject
    },
    wrapper: {
        flex: 1
    }
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
        if (!selectedPlace) {
            return null
        }
        return (
            <GlamDetailContainer
                viewMode={ this.state.viewMode }
            >
                <View
                    style={ styles.subContainer }
                >
                    <View
                        style={ styles.wrapper }
                    >
                        <GlamDetailImage
                            resizeMode="contain"
                            source={ selectedPlace.image }
                            viewMode={ this.state.viewMode }
                        />
                    </View>
                    <View
                        style={ styles.wrapper }
                    >
                        <MapView
                            initialRegion={{
                                latitude       : selectedPlace.location.latitude,
                                longitude      : selectedPlace.location.longitude,
                                latitudeDelta  : 0.0122,
                                longitudeDelta : (Dimensions.get('window').width / Dimensions.get('window').height) * 0.0122
                            }}
                            pitchEnabled={ false }
                            rotateEnabled={ false }
                            scrollEnabled={ false }
                            style={ styles.map }
                            zoomEnabled={ false }
                        >
                            <Marker
                                coordinate={{
                                    latitude  : selectedPlace.location.latitude,
                                    longitude : selectedPlace.location.longitude
                                }}
                            />
                        </MapView>
                    </View>
                </View>
                <GlamTitleBtnContainer>
                    <GlamDetailText>{ selectedPlace.name }</GlamDetailText>
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
