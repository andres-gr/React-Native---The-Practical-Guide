import React from 'react'
// import PropTypes from 'prop-types'
import { Dimensions, Text, View } from 'react-native'
import glamFactory from '../../utils/styles/glamFactory'

const GlamSideContainer = glamFactory(View, 'GlamSideContainer', {
    backgroundColor : '#FFF',
    flex            : 1,
    paddingTop      : 22,
    width           : Dimensions.get('window').width * 0.85
})

const SideDrawer = () => (
    <GlamSideContainer>
        <Text>Side cosa</Text>
    </GlamSideContainer>
)

export default SideDrawer
