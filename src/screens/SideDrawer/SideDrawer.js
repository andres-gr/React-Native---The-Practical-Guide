import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import { AsyncStorage, Dimensions, Platform, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import glamFactory from '../../utils/styles/glamFactory'
import startLogin from '../../entry'

const logOutIcon = Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'

const GlamSideContainer = glamFactory(View, 'GlamSideContainer', {
    backgroundColor : '#FFF',
    flex            : 1,
    paddingTop      : 50,
    width           : Dimensions.get('window').width * 0.85
})

const GlamDrawerItem = glamFactory(View, 'GlamDrawerItem', {
    alignItems      : 'center',
    backgroundColor : '#EEE',
    flexDirection   : 'row',
    padding         : 10
})

const GlamItemIcon = glamFactory(Icon, 'GlamItemIcon', {
    marginRight: 10
})

class SideDrawer extends PureComponent {
    _handleLogout = () => {
        AsyncStorage.clear()
        startLogin()
    }
    render () {
        return (
            <GlamSideContainer>
                <TouchableOpacity
                    onPress={ this._handleLogout }
                >
                    <GlamDrawerItem>
                        <GlamItemIcon
                            color="#AAA"
                            name={ logOutIcon }
                            size={ 30 }
                        />
                        <Text>Sign Out</Text>
                    </GlamDrawerItem>
                </TouchableOpacity>
            </GlamSideContainer>
        )
    }
}

export default SideDrawer
