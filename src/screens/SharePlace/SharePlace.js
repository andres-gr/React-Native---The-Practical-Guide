import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, ScrollView, View } from 'react-native'
import _ from 'lodash'
import { FIREBASE_STOREIMAGE } from '../../utils/constants'
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
                const response = await fetch(FIREBASE_STOREIMAGE, {
                    method : 'POST',
                    body   : JSON.stringify({
                        image: this.state.image.base64
                    })
                })
                const jsonRes = await response.json()
                console.log(jsonRes)
                // const response = await fetch(FIREBASE_URI, {
                //     method : 'POST',
                //     body   : JSON.stringify({
                //         name     : this.state.placeName,
                //         location : this.state.location
                //     })
                // })
                // const jsonRes = await response.json()
                // console.log(jsonRes)
                this.setState({ checking: false })
            } catch (e) {
                console.log(e)
                this.setState({ checking: false })
            }
            // await this.props.addPlace({
            //     placeName : this.state.placeName,
            //     latitude  : this.state.location.latitude,
            //     longitude : this.state.location.longitude,
            //     image       : {
            //         uri    : this.state.image.uri,
            //         base64 : this.state.image.base64
            //     }
            // })
            // this.setState({
            //     isValid: {
            //         place    : false,
            //         location : false,
            //         image    : false
            //     },
            //     placeName : '',
            //     location  : null,
            //     image     : null
            // })
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
                        <Button
                            disabled={ this.state.checking || !this.checkValidity() }
                            onPress={ this._handlePlaceAdded }
                            title="Share the place"
                        />
                    </GlamButtonContainer>
                </GlamScrollContainer>
            </ScrollView>
        )
    }
}

export default SharePlaceScreen
