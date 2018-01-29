import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, TextInput } from 'react-native'

const style = StyleSheet.create({
    input: {
        borderColor    : '#EEE',
        borderWidth    : 1,
        marginVertical : 8,
        padding        : 5,
        width          : '100%'
    }
})

const DefaultInput = props => (
    <TextInput
        { ...props }
        style={ [style.input, props.style] }
        underlineColorAndroid="transparent"
    />
)

DefaultInput.propTypes = {
    style: PropTypes.array
}

DefaultInput.defaultProps = {
    style: null
}

export default DefaultInput
