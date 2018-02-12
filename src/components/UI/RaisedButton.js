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
        color    : PropTypes.string,
        disabled : PropTypes.bool
    }
    static defaultProps = {
        color    : null,
        disabled : false
    }
    getButtonContent = () => (
        <View style={ [styles.button, { backgroundColor: this.props.color }] }>
            <Text>{ this.props.children }</Text>
        </View>
    )
    render () {
        if (Platform.OS === 'android') {
            return (
                <TouchableNativeFeedback onPress={ !this.props.disabled ? this.props.onPress : null }>
                    { this.getButtonContent() }
                </TouchableNativeFeedback>
            )
        }
        return (
            <TouchableOpacity onPress={ !this.props.disabled ? this.props.onPress : null }>
                { this.getButtonContent() }
            </TouchableOpacity>
        )
    }
}

export default RaisedButton
