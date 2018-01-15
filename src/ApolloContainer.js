import React from 'react'
import App from './containers/App'
import Apollo from './api/graphql/'

const ApolloContainer = () => (
    <Apollo>
        <App />
    </Apollo>
)

export default ApolloContainer
