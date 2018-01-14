import React, { Component } from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import UserInput from './src/components/UserInput/UserInput'
import List from './src/components/List/List'

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
        placeName   : '',
        places      : []
    }
    _handlePlaceNameChange = placeName => {
        this.setState({ placeName })
    }
    _handleButtonPress = () => {
        if (this.state.placeName.trim() === '') {
            return
        }
        this.setState(prevState => ({
            places: prevState.places.concat(this.state.placeName)
        }))
    }
    _handleItemDelete = index => {
        this.setState(prevState => ({
            places: prevState.places.filter((place, i) => i !== index)
        }))
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
                    deleteEvent={ this._handleItemDelete }
                    places={ this.state.places }
                />
            </View>
        )
    }
}
