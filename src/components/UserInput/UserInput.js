import React from 'react'
import PropTypes from 'prop-types'
import {
    Button,
    TextInput,
    View
} from 'react-native'
import glamFactory from '../../utils/styles/glamFactory'

const GlamInputContainer = glamFactory(View, 'GlamInputContainer', {
    alignItems      : 'center',
    flexDirection   : 'row',
    justifyContent  : 'space-around',
    width           : '100%'
})

const GlamTextInput = glamFactory(TextInput, 'GlamInputContainer', {
    width: '70%'
})

const GlamButton = glamFactory(Button, 'GlamButton', {
    width: '30%'
})

const UserInput = ({
    onChangeText,
    onPress,
    placeholder,
    title,
    value
}) => (
    <GlamInputContainer>
        <GlamTextInput
            onChangeText={ onChangeText }
            placeholder={ placeholder }
            value={ value }
        />
        <GlamButton
            onPress={ onPress }
            title={ title }
        />
    </GlamInputContainer>
)

UserInput.propTypes = {
    onChangeText    : PropTypes.func.isRequired,
    onPress         : PropTypes.func.isRequired,
    placeholder     : PropTypes.string.isRequired,
    title           : PropTypes.string.isRequired,
    value           : PropTypes.string
}

UserInput.defaultProps = {
    value: ''
}

export default UserInput
