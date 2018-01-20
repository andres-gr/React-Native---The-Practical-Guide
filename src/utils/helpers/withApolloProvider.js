import React from 'react'
import Apollo from '../../api/graphql/index'

const withApolloProvider = AppComponent => {
    const Provider = props => (
        <Apollo>
            <AppComponent
                { ...props }
            />
        </Apollo>
    )
    return Provider
}

export default withApolloProvider
