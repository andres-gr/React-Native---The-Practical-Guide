import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, ScrollView, View, ActivityIndicator, AsyncStorage } from 'react-native'
import _ from 'lodash'
import { FIREBASE_STOREIMAGE, FIREBASE_URI, TOKEN_KEY } from '../../utils/constants'
import addPlace from '../../decorators/addPlace'
import sideDrawerToggle from '../../utils/helpers/sideDrawerToggle'
import glamFactory from '../../utils/styles/glamFactory'
import MainText from '../../components/UI/MainText'
import HeadingText from '../../components/UI/HeadingText'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import PickImage from '../../components/PickImage/PickImage'
import PickLocation from '../../components/PickLocation/PickLocation'
import placesSchema from '../../utils/validation/places'
import locationSchema from '../../utils/validation/location'
import imageSchema from '../../utils/validation/image'

const GlamScrollContainer = glamFactory(View, 'GlamScrollContainer', {
    alignItems  : 'center',
    flex        : 1
})

const GlamButtonContainer = glamFactory(View, 'GlamButtonContainer', {
    margin: 8
})

@addPlace
class SharePlaceScreen extends PureComponent {
    static propTypes = {
        addPlace    : PropTypes.func.isRequired,
        navigator   : PropTypes.object.isRequired
    }
    constructor (props) {
        super(props)
        props.navigator.addOnNavigatorEvent(sideDrawerToggle.bind(this, { side: 'left' }))
    }
    state = {
        checking  : false,
        image     : null,
        location  : null,
        placeName : '',
        isValid   : {
            place    : false,
            location : false,
            image    : false
        }
    }
    _handleChangeText = async placeName => {
        const isValid = await placesSchema.isValid({ name: placeName })
        this.setState(prevState => ({
            isValid: {
                ...prevState.isValid,
                place: isValid
            },
            placeName
        }))
    }
    _handlePlaceAdded = async () => {
        this.setState({ checking: true })
        if (this.checkValidity()) {
            try {
                const token = await AsyncStorage.getItem(TOKEN_KEY),
                    imageResponse = await fetch(FIREBASE_STOREIMAGE, {
                        method : 'POST',
                        body   : JSON.stringify({
                            image: this.state.image.base64
                        }),
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                const imageJson = await imageResponse.json()
                const response = await fetch(`${FIREBASE_URI}?auth=${token}`, {
                    method : 'POST',
                    body   : JSON.stringify({
                        name     : this.state.placeName,
                        location : this.state.location,
                        image    : imageJson.imageUrl
                    })
                })
                await response.json()
                await this.props.addPlace({
                    placeName : this.state.placeName,
                    latitude  : this.state.location.latitude,
                    longitude : this.state.location.longitude,
                    uri       : imageJson.imageUrl
                })
                this.setState({
                    isValid: {
                        place    : false,
                        location : false,
                        image    : false
                    },
                    checking  : false,
                    image     : null,
                    location  : null,
                    placeName : ''
                })
            } catch (e) {
                console.log(e)
                alert('Something failed, try again')
                this.setState({ checking: false })
            }
        }
    }
    _handleLocationPick = async location => {
        const isValid = await locationSchema.isValid(location)
        this.setState(prevState => ({
            isValid: {
                ...prevState.isValid,
                location: isValid
            },
            location
        }))
    }
    _handleImagePicked = async (uri, base64) => {
        const isValid = await imageSchema.isValid(uri) && await imageSchema.isValid(base64)
        this.setState(prevState => ({
            isValid: {
                ...prevState.isValid,
                image: isValid
            },
            image: { uri, base64 }
        }))
    }
    checkValidity = () => _.every(this.state.isValid, i => i === true)
    render () {
        return (
            <ScrollView>
                <GlamScrollContainer>
                    <MainText>
                        <HeadingText>Share a place with us!</HeadingText>
                    </MainText>
                    <PickImage
                        setImage={ this._handleImagePicked }
                    />
                    <PickLocation
                        setLocation={ this._handleLocationPick }
                    />
                    <PlaceInput
                        onChangeText={ this._handleChangeText }
                        value={ this.state.placeName }
                    />
                    <GlamButtonContainer>
                        { !this.state.checking
                            ? (
                                <Button
                                    disabled={ !this.checkValidity() }
                                    onPress={ this._handlePlaceAdded }
                                    title="Share the place"
                                />
                            )
                            : <ActivityIndicator size={ 32 } />
                        }
                    </GlamButtonContainer>
                </GlamScrollContainer>
            </ScrollView>
        )
    }
}

export default SharePlaceScreen
