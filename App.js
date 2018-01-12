import React, { Component } from 'react'
import {
    StyleSheet,
    View
} from 'react-native'
import UserInput from './src/components/UserInput/UserInput'
import ListContainer from './src/components/ListContainer/ListContainer'

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
                <ListContainer places={ this.state.places } />
            </View>
        )
    }
}
