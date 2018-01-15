import React from 'react'
import PropTypes from 'prop-types'

export const types = [
    PropTypes.element,
    PropTypes.func,
    PropTypes.node,
    PropTypes.symbol
]

export const GiveProps = (ConstructedComponent, props) => (ConstructedComponent ? <ConstructedComponent { ...props } /> : null)
