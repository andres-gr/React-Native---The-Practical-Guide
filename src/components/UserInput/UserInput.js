import React, { PureComponent } from 'react'
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

class UserInput extends PureComponent {
    static propTypes = {
        onPress         : PropTypes.func.isRequired,
        placeholder     : PropTypes.string.isRequired,
        title           : PropTypes.string.isRequired
    }
    state = {
        placeName: ''
    }
    _handleChangeText = placeName => {
        this.setState({ placeName })
    }
    _handleBtnPress = () => {
        if (this.state.placeName.trim() === '') {
            return
        }
        this.props.onPress(this.state.placeName)
    }
    render () {
        const {
            placeholder,
            title
        } = this.props
        return (
            <GlamInputContainer>
                <GlamTextInput
                    onChangeText={ this._handleChangeText }
                    placeholder={ placeholder }
                />
                <GlamButton
                    onPress={ this._handleBtnPress }
                    title={ title }
                />
            </GlamInputContainer>
        )
    }
}

export default UserInput
