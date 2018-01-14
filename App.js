import React, { Component } from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import UserInput from './src/components/UserInput/UserInput'
import List from './src/components/List/List'
import PlaceDetail from './src/components/PlaceDetail/PlaceDetail'

const styles = StyleSheet.create({
    container: {
        alignItems      : 'center',
        backgroundColor : '#F5FCFF',
        flex            : 1,
        justifyContent  : 'flex-start',
        paddingTop      : 26
    }
})

export default class App extends Component {
    state = {
        placeName       : '',
        places          : [],
        selectedPlace   : null
    }
    _handlePlaceNameChange = placeName => {
        this.setState({ placeName })
    }
    _handleButtonPress = () => {
        if (this.state.placeName.trim() === '') {
            return
        }
        this.setState(prevState => ({
            places: prevState.places.concat({
                key     : Math.random(),
                name    : this.state.placeName,
                image   : { uri: 'http://lorempixel.com/output/abstract-q-c-640-480-2.jpg' }
            })
        }))
    }
    _handleItemPress = key => {
        this.setState(prevState => ({ selectedPlace: prevState.places.find(place => place.key === key) }))
    }
    _handleItemDelete = () => {
        this.setState(prevState => ({
            places          : prevState.places.filter(place => place.key !== prevState.selectedPlace.key),
            selectedPlace   : null
        }))
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
                    places={ this.state.places }
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
