// import React from 'react'
// import { AppRegistry } from 'react-native'
// import Apollo from './src/api/graphql/'
// import App from './src/containers/App'
//
// const ApolloContainer = () => (
//     <Apollo>
//         <App />
//     </Apollo>
// )
//
// AppRegistry.registerComponent('tutorialApp', () => ApolloContainer)

import { Navigation } from 'react-native-navigation'
import registerScreens from './src/screens/'

registerScreens()

Navigation.startSingleScreenApp({
    screen: {
        screen : 'tuto.AuthScreen',
        title  : 'Login'
    }
})
