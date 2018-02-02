import { Animated } from 'react-native'
import glamFactory from '../../utils/styles/glamFactory'

const { View } = Animated

const GlamAnimated = glamFactory(View, 'GlamAnimated')

GlamAnimated.propsAreStyleOverrides = true

export default GlamAnimated
