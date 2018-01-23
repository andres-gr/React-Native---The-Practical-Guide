import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
    text: {
        color           : '#000',
        backgroundColor : 'transparent'
    }
})

const MainText = props => (
    <Text
        style={ styles.text }
    >
        { props.children }
    </Text>
)

MainText.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]).isRequired
}

export default MainText
