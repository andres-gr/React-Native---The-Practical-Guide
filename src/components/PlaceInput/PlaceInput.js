import React from 'react'
import PropTypes from 'prop-types'
import DefaultInput from '../UI/DefaultInput'

const PlaceInput = ({
    onChangeText,
    value
}) => (
    <DefaultInput
        onChangeText={ onChangeText }
        placeholder="Place Name"
        value={ value }
    />
)

PlaceInput.propTypes = {
    onChangeText    : PropTypes.func.isRequired,
    value           : PropTypes.string
}

PlaceInput.defaultProps = {
    value: ''
}

export default PlaceInput
