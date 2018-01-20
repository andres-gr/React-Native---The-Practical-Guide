import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    StyleSheet,
    View
} from 'react-native'
import PlaceInput from './../components/PlaceInput/PlaceInput'
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
        addPlace            : PropTypes.func.isRequired,
        deletePlace         : PropTypes.func.isRequired,
        setSelectedPlace    : PropTypes.func.isRequired,
        places              : PropTypes.arrayOf(PropTypes.object).isRequired,
        selectedPlace       : PropTypes.object
    }
    static defaultProps = {
        selectedPlace: null
    }
    _handleButtonPress = placeName => {
        this.props.addPlace(placeName)
    }
    _handleItemPress = key => {
        this.props.setSelectedPlace(key)
    }
    _handleItemDelete = () => {
        this.props.deletePlace(this.props.selectedPlace.key)
    }
    _handleCloseModal = () => {
        this.props.setSelectedPlace(null)
    }
    render () {
        return (
            <View style={ styles.container }>
                <PlaceInput
                    onPress={ this._handleButtonPress }
                    placeholder="Add an awesome place"
                    title="Add"
                />
                <List
                    pressEvent={ this._handleItemPress }
                    places={ this.props.places }
                />
                <PlaceDetail
                    closeModalEvent={ this._handleCloseModal }
                    deleteEvent={ this._handleItemDelete }
                    selectedPlace={ this.props.selectedPlace }
                />
            </View>
        )
    }
}

export default App
