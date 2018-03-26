import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, ScrollView, View } from 'react-native'
import addPlace from '../../decorators/addPlace'
import sideDrawerToggle from '../../utils/helpers/sideDrawerToggle'
import glamFactory from '../../utils/styles/glamFactory'
import MainText from '../../components/UI/MainText'
import HeadingText from '../../components/UI/HeadingText'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import PickImage from '../../components/PickImage/PickImage'
import PickLocation from '../../components/PickLocation/PickLocation'
import placesSchema from '../../utils/validation/places'

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
        placeName : '',
        isValid   : false
    }
    _handleChangeText = async placeName => {
        const isValid = await placesSchema.isValid({ name: placeName })
        this.setState({ isValid, placeName })
    }
    _handlePlaceAdded = async () => {
        if (this.state.isValid) {
            await this.props.addPlace(this.state.placeName)
            this.setState({ isValid: false, placeName: '' })
        }
    }
    render () {
        return (
            <ScrollView>
                <GlamScrollContainer>
                    <MainText>
                        <HeadingText>Share a place with us!</HeadingText>
                    </MainText>
                    <PickImage />
                    <PickLocation />
                    <PlaceInput
                        onChangeText={ this._handleChangeText }
                        value={ this.state.placeName }
                    />
                    <GlamButtonContainer>
                        <Button
                            disabled={ !this.state.isValid }
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
