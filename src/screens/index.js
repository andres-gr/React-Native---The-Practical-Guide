import { Navigation } from 'react-native-navigation'
import withApolloProvider from '../utils/helpers/withApolloProvider'
import AuthScreen from './Auth/Auth'
import FindPlace from './FindPlace/FindPlace'
import SharePlace from './SharePlace/SharePlace'
import PlaceDetail from './PlaceDetail/PlaceDetail'

function registerScreens () {
    Navigation.registerComponent('tuto.AuthScreen', () => withApolloProvider(AuthScreen))
    Navigation.registerComponent('tuto.FindPlaceScreen', () => withApolloProvider(FindPlace))
    Navigation.registerComponent('tuto.SharePlaceScreen', () => withApolloProvider(SharePlace))
    Navigation.registerComponent('tuto.PlaceDetailScreen', () => withApolloProvider(PlaceDetail))
}

export default registerScreens
