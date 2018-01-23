import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const styles = StyleSheet.create({
    button: {
        borderColor  : '#000',
        borderRadius : 5,
        borderWidth  : 1,
        margin       : 5,
        padding      : 10
    }
})

const RaisedButton = props => (
    <TouchableOpacity onPress={ props.onPress }>
        <View style={ [styles.button, { backgroundColor: props.color }] }>
            <Text>{ props.children }</Text>
        </View>
    </TouchableOpacity>
)

RaisedButton.propTypes = {
    onPress     : PropTypes.func.isRequired,
    children    : PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]).isRequired,
    color: PropTypes.string
}

RaisedButton.defaultProps = {
    color: null
}

export default RaisedButton
