import React, { Component } from 'react'
import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        alignItems      : 'center',
        backgroundColor : '#F5FCFF',
        flex            : 1,
        justifyContent  : 'flex-start',
        paddingTop      : 26
    },
    inputContainer: {
        alignItems      : 'center',
        flexDirection   : 'row',
        justifyContent  : 'space-around',
        width           : '100%'
    },
    placeInput: {
        width: '70%'
    },
    placeButton: {
        width: '30%'
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
        const placesOutput = this.state.places.map((place, i) => <Text key={ `key-for-${place}-${i + 1}` }>{ place }</Text>)
        return (
            <View style={ styles.container }>
                <View style={ styles.inputContainer }>
                    <TextInput
                        onChangeText={ this._handlePlaceNameChange }
                        placeholder="Cosa place"
                        style={ styles.placeInput }
                        value={ this.state.placeName }
                    />
                    <Button
                        onPress={ this._handleButtonPress }
                        style={ styles.placeButton }
                        title="Add"
                    />
                </View>
                <View>
                    { placesOutput }
                </View>
            </View>
        )
    }
}
