import { Navigation } from 'react-native-navigation'
import withApolloProvider from '../utils/helpers/withApolloProvider'
import AuthScreen from '../containers/Auth'
import FindPlace from './FindPlace/FindPlace'
import SharePlace from './SharePlace/SharePlace'
import PlaceDetail from './PlaceDetail/PlaceDetail'
import SideDrawer from './SideDrawer/SideDrawer'

function registerScreens () {
    Navigation.registerComponent('tuto.AuthScreen', () => withApolloProvider(AuthScreen))
    Navigation.registerComponent('tuto.FindPlaceScreen', () => withApolloProvider(FindPlace))
    Navigation.registerComponent('tuto.SharePlaceScreen', () => withApolloProvider(SharePlace))
    Navigation.registerComponent('tuto.PlaceDetailScreen', () => withApolloProvider(PlaceDetail))
    Navigation.registerComponent('tuto.SideDrawer', () => SideDrawer)
}

export default registerScreens
