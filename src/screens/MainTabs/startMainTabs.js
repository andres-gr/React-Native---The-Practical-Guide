import { Navigation } from 'react-native-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

const startMainTabs = () => {
    Promise.all([
        Icon.getImageSource('md-map', 30),
        Icon.getImageSource('ios-share-alt', 30)
    ]).then(images => {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    icon    : images[0],
                    label   : 'Find Place',
                    screen  : 'tuto.FindPlaceScreen',
                    title   : 'Find Place'
                },
                {
                    icon    : images[1],
                    label   : 'Share Place',
                    screen  : 'tuto.SharePlaceScreen',
                    title   : 'Share Place'
                }
            ]
        })
    })
}

export default startMainTabs
