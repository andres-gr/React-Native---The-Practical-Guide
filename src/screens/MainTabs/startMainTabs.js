import { Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

const navigatorStyle = {
    navBarButtonColor: 'orange'
}

const startMainTabs = async () => {
    const [
        mapImage,
        shareImage,
        menuImage
    ] = await Promise.all([
        Icon.getImageSource(Platform.OS === 'android' ? 'md-map' : 'ios-map', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-share' : 'ios-share', 30),
        Icon.getImageSource(Platform.OS === 'android' ? 'md-menu' : 'ios-menu', 30)
    ])
    Navigation.startTabBasedApp({
        tabs: [
            {
                icon                : mapImage,
                label               : 'Find Place',
                screen              : 'tuto.FindPlaceScreen',
                title               : 'Find Place',
                navigatorButtons    : {
                    leftButtons: [
                        {
                            icon    : menuImage,
                            id      : 'SideDrawer',
                            title   : 'Menu'
                        }
                    ]
                },
                navigatorStyle
            },
            {
                icon                : shareImage,
                label               : 'Share Place',
                screen              : 'tuto.SharePlaceScreen',
                title               : 'Share Place',
                navigatorButtons    : {
                    leftButtons: [
                        {
                            icon    : menuImage,
                            id      : 'SideDrawer',
                            title   : 'Menu'
                        }
                    ]
                },
                navigatorStyle
            }
        ],
        tabsStyle: {
            tabBarSelectedButtonColor: 'orange'
        },
        drawer: {
            left: {
                screen: 'tuto.SideDrawer'
            }
        },
        appStyle: {
            tabBarSelectedButtonColor: 'orange'
        }
    })
}

export default startMainTabs
