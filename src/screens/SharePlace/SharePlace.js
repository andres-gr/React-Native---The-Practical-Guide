import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button, Image, ScrollView, Text, View } from 'react-native'
import addPlace from '../../decorators/addPlace'
import sideDrawerToggle from '../../utils/helpers/sideDrawerToggle'
import glamFactory from '../../utils/styles/glamFactory'
import DefaultInput from '../../components/UI/DefaultInput'
import MainText from '../../components/UI/MainText'
import HeadingText from '../../components/UI/HeadingText'
import image0 from '../../assets/images/image0.jpg'

const GlamScrollContainer = glamFactory(View, 'GlamScrollContainer', {
    alignItems  : 'center',
    flex        : 1
})

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

const GlamImagePlacholder = glamFactory(Image, 'GlamImagePlacholder', {
    height  : '100%',
    width   : '100%'
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
    _handlePlaceAdded = val => {
        this.props.addPlace(val)
    }
    render () {
        return (
            <ScrollView>
                <GlamScrollContainer>
                    <MainText>
                        <HeadingText>Share a place with us!</HeadingText>
                    </MainText>
                    <GlamPlaceholder>
                        <GlamImagePlacholder source={ image0 } />
                    </GlamPlaceholder>
                    <GlamButtonContainer>
                        <Button title="Pick image" />
                    </GlamButtonContainer>
                    <GlamPlaceholder>
                        <Text>Map!</Text>
                    </GlamPlaceholder>
                    <GlamButtonContainer>
                        <Button title="Locate me" />
                    </GlamButtonContainer>
                    <DefaultInput placeholder="Place name" />
                    <GlamButtonContainer>
                        <Button title="Share the place" />
                    </GlamButtonContainer>
                </GlamScrollContainer>
            </ScrollView>
        )
    }
}

export default SharePlaceScreen
