import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

const startMainTabs = async () => {
    const [
        mapImage,
        shareImage,
        menuImage
    ] = await Promise.all([
        Icon.getImageSource('md-map', 30),
        Icon.getImageSource('ios-share-alt', 30),
        Icon.getImageSource('ios-menu', 30)
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
                }
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
                }
            }
        ],
        drawer: {
            left: {
                screen: 'tuto.SideDrawer'
            }
        }
    })
}

export default startMainTabs
