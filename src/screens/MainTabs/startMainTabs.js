import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

const startMainTabs = () => {
    Promise.all([
        Icon.getImageSource('md-map', 30),
        Icon.getImageSource('ios-share-alt', 30),
        Icon.getImageSource('ios-menu', 30)
    ]).then(images => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    icon                : images[0],
                    label               : 'Find Place',
                    screen              : 'tuto.FindPlaceScreen',
                    title               : 'Find Place',
                    navigatorButtons    : {
                        leftButtons: [
                            {
                                icon    : images[2],
                                id      : 'SideDrawer',
                                title   : 'Menu'
                            }
                        ]
                    }
                },
                {
                    icon                : images[1],
                    label               : 'Share Place',
                    screen              : 'tuto.SharePlaceScreen',
                    title               : 'Share Place',
                    navigatorButtons    : {
                        leftButtons: [
                            {
                                icon    : images[2],
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
    })
}

export default startMainTabs
