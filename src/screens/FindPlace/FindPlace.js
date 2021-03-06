import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, Text, TouchableWithoutFeedback, View } from 'react-native'
import glamFactory from '../../utils/styles/glamFactory'
import List from '../../components/List/List'
import sideDrawerToggle from '../../utils/helpers/sideDrawerToggle'
import GlamAnimated from '../../components/Animated/Animated'
import withCurrentPlaces from '../../decorators/withCurrentPlaces'
import withPlaces from '../../decorators/getCurrentPlaces'

const GlamFindPlaceContainer = glamFactory(View, 'GlamFindPlaceContainer', {}, ({ loaded }) => ({
    alignItems     : loaded ? 'flex-start' : 'center',
    flex           : 1,
    justifyContent : loaded ? 'flex-start' : 'center'
}))

const GlamSearchButton = glamFactory(View, 'GlamSearchButton', {
    borderColor  : 'orange',
    borderRadius : 50,
    borderWidth  : 3,
    padding      : 20
})

const GlamSearchText = glamFactory(Text, 'GlamSearchText', {
    color      : 'orange',
    fontSize   : 26,
    fontWeight : 'bold'
})

@withCurrentPlaces
@withPlaces
class FindPlaceScreen extends PureComponent {
    static propTypes = {
        navigator : PropTypes.object.isRequired,
        getPlaces : PropTypes.func.isRequired,
        places    : PropTypes.arrayOf(PropTypes.object).isRequired
    }
    constructor (props) {
        super(props)
        props.navigator.addOnNavigatorEvent(sideDrawerToggle.bind(this, { side: 'left' }))
    }
    state = {
        loaded         : false,
        removeAnimated : new Animated.Value(1),
        listAnimated   : new Animated.Value(0)
    }
    async componentDidMount () {
        await this.props.getPlaces()
    }
    _handleItemPress = key => {
        const selectedPlace = this.props.places.find(place => place.key === key)
        this.props.navigator.push({
            backButtonTitle : 'Back',
            passProps       : {
                selectedPlace
            },
            screen         : 'tuto.PlaceDetailScreen',
            title          : selectedPlace.name,
            navigatorStyle : {
                navBarButtonColor: 'orange'
            }
        })
    }
    _handleSearchPlaces = () => {
        Animated.timing(this.state.removeAnimated, {
            duration        : 500,
            toValue         : 0,
            useNativeDriver : true
        }).start(() => {
            this.setState({ loaded: true })
            this._handleListLoad()
        })
    }
    _handleListLoad = () => {
        Animated.timing(this.state.listAnimated, {
            duration        : 750,
            toValue         : 1,
            useNativeDriver : true
        }).start()
    }
    opacityAnimatedProps = {
        opacity   : this.state.removeAnimated,
        transform : [
            {
                scale: this.state.removeAnimated.interpolate({
                    inputRange  : [0, 1],
                    outputRange : [12, 1]
                })
            }
        ]
    }
    animatedListProps = {
        opacity: this.state.listAnimated
    }
    render () {
        return (
            <GlamFindPlaceContainer
                loaded={ this.state.loaded }
            >
                { this.state.loaded
                    ? (
                        <GlamAnimated
                            { ...this.animatedListProps }
                            width="100%"
                        >
                            <List
                                pressEvent={ this._handleItemPress }
                                places={ this.props.places }
                            />
                        </GlamAnimated>
                    )
                    : (
                        <GlamAnimated
                            { ...this.opacityAnimatedProps }
                        >
                            <TouchableWithoutFeedback
                                onPress={ this._handleSearchPlaces }
                            >
                                <GlamSearchButton>
                                    <GlamSearchText>Find Places</GlamSearchText>
                                </GlamSearchButton>
                            </TouchableWithoutFeedback>
                        </GlamAnimated>
                    )
                }
            </GlamFindPlaceContainer>
        )
    }
}

export default FindPlaceScreen
