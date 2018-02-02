import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Animated, FlatList } from 'react-native'
import ListItem from '../ListItem/ListItem'
import GlamAnimated from '../Animated/Animated'

class List extends PureComponent {
    static propTypes = {
        pressEvent  : PropTypes.func.isRequired,
        places      : PropTypes.arrayOf(PropTypes.object).isRequired
    }
    state = {
        removeAnimated: new Animated.Value(1)
    }
    componentDidMount () {
        Animated.timing(this.state.removeAnimated, {
            duration        : 500,
            toValue         : 0,
            useNativeDriver : true
        })
    }
    animatedProps = {
        opacity: this.state.removeAnimated
    }
    renderItem = ({ item }) => (
        <ListItem
            pressEvent={ this.props.pressEvent }
            itemId={ item.key }
            placeImage={ item.image }
            placeName={ item.name }
        />
    )
    render () {
        return (
            <GlamAnimated
                { ...this.animatedProps }
                width="100%"
            >
                <FlatList
                    data={ this.props.places }
                    renderItem={ this.renderItem }
                />
            </GlamAnimated>
        )
    }
}

export default List
