import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import glamFactory from '../../../utils/styles/glamFactory'
import ListItem from '../ListItem/ListItem'

const GlamList = glamFactory(FlatList, 'GlamList', {
    width: '100%'
})

class List extends PureComponent {
    static propTypes = {
        deleteEvent : PropTypes.func.isRequired,
        places      : PropTypes.arrayOf(PropTypes.object).isRequired
    }
    renderItem = ({ item }) => (
        <ListItem
            deleteEvent={ this.props.deleteEvent }
            itemId={ item.key }
            placeName={ item.value }
        />
    )
    render () {
        return (
            <GlamList
                data={ this.props.places }
                renderItem={ this.renderItem }
            />
        )
    }
}

export default List
