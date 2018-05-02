import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { FlatList } from 'react-native'
import glamFactory from '../../utils/styles/glamFactory'
import ListItem from '../ListItem/ListItem'

const GlamList = glamFactory(FlatList, 'GlamList', {
    width: '100%'
})

class List extends PureComponent {
    static propTypes = {
        pressEvent  : PropTypes.func.isRequired,
        places      : PropTypes.arrayOf(PropTypes.object).isRequired
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
            <Fragment>
                { this.props.places && this.props.places.length
                    ? (
                        <GlamList
                            data={ this.props.places }
                            renderItem={ this.renderItem }
                        />
                    )
                    : null
                }
            </Fragment>
        )
    }
}

export default List
