import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
    text: {
        fontSize    : 28,
        fontWeight  : 'bold'
    }
})

const HeadingText = props => (
    <Text
        { ...props }
        style={ [styles.text, props.style] }
    >
        { props.children }
    </Text>
)

HeadingText.propTypes = {
    children    : PropTypes.string.isRequired,
    style       : PropTypes.object
}

HeadingText.defaultProps = {
    style: {}
}

export default HeadingText
