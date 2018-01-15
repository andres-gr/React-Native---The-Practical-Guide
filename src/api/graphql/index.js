import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ApolloClient } from 'apollo-client'
import { withClientState } from 'apollo-link-state'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import merge from 'lodash/merge'
import rootState from './state/root/'
import { types } from '../../utils/helpers/GiveProps'

const cache = new InMemoryCache({
    dataIdFromObject: obj => obj._id || obj.id || obj.key
})

const link = withClientState({
    cache,
    ...merge(rootState)
})

export const client = new ApolloClient({
    cache,
    link
})

class Apollo extends PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType(types).isRequired
    }
    render () {
        return (
            <ApolloProvider client={ client }>
                { this.props.children }
            </ApolloProvider>
        )
    }
}

export default Apollo
