import React from 'react'
import { Mutation } from 'react-apollo'
import LOGIN from '../api/graphql/state/root/authMutation.graphql'
import Auth from '../screens/Auth/Auth'

const AuthContainer = props => (
    <Mutation mutation={ LOGIN }>
        { login => (
            <Auth
                { ...props }
                login={ login }
            />
        )}
    </Mutation>
)

export default AuthContainer
