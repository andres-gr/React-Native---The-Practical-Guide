import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native'

const styles = StyleSheet.create({
    button: {
        borderColor  : '#000',
        borderRadius : 5,
        borderWidth  : 1,
        margin       : 5,
        padding      : 10
    }
})

class RaisedButton extends PureComponent {
    static propTypes = {
        onPress     : PropTypes.func.isRequired,
        children    : PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string
        ]).isRequired,
        color: PropTypes.string
    }

    static defaultProps = {
        color: null
    }
    getButtonContent = () => (
        <View style={ [styles.button, { backgroundColor: this.props.color }] }>
            <Text>{ this.props.children }</Text>
        </View>
    )
    render () {
        if (Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback onPress={ this.props.onPress }>
                    { this.getButtonContent() }
                </TouchableNativeFeedback>
            )
        }
        return (
            <TouchableOpacity onPress={ this.props.onPress }>
                { this.getButtonContent() }
            </TouchableOpacity>
        )
    }
}

export default RaisedButton
