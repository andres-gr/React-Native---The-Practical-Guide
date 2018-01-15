import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    StyleSheet,
    View
} from 'react-native'
import UserInput from './../components/UserInput/UserInput'
import List from './../components/List/List'
import PlaceDetail from './../components/PlaceDetail/PlaceDetail'

const styles = StyleSheet.create({
    container: {
        alignItems      : 'center',
        backgroundColor : '#F5FCFF',
        flex            : 1,
        justifyContent  : 'flex-start',
        paddingTop      : 26
    }
})

class App extends Component {
    static propTypes = {
        addPlace    : PropTypes.func.isRequired,
        places      : PropTypes.arrayOf(PropTypes.object).isRequired
    }
    state = {
        placeName       : '',
        selectedPlace   : null
    }
    _handlePlaceNameChange = placeName => {
        this.setState({ placeName })
    }
    _handleButtonPress = () => {
        if (this.state.placeName.trim() === '') {
            return
        }
        this.props.addPlace(this.state.placeName)
        // this.setState(prevState => ({
        //     places: prevState.places.concat({
        //         key     : String(Math.random()),
        //         name    : this.state.placeName,
        //         image   : { uri: 'http://lorempixel.com/output/abstract-q-c-640-480-2.jpg' }
        //     })
        // }))
    }
    _handleItemPress = key => {
        this.setState({ selectedPlace: this.props.places.find(place => place.key === key) })
    }
    _handleItemDelete = () => {
        // this.setState(prevState => ({
        //     places          : prevState.places.filter(place => place.key !== prevState.selectedPlace.key),
        //     selectedPlace   : null
        // }))
    }
    _handleCloseModal = () => {
        this.setState({ selectedPlace: null })
    }
    render () {
        return (
            <View style={ styles.container }>
                <UserInput
                    onChangeText={ this._handlePlaceNameChange }
                    onPress={ this._handleButtonPress }
                    placeholder="Add an awesome place"
                    title="Add"
                    value={ this.state.placeName }
                />
                <List
                    pressEvent={ this._handleItemPress }
                    places={ this.props.places }
                />
                <PlaceDetail
                    closeModalEvent={ this._handleCloseModal }
                    deleteEvent={ this._handleItemDelete }
                    selectedPlace={ this.state.selectedPlace }
                />
            </View>
        )
    }
}

export default App
