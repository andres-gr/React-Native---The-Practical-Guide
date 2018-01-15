import glamorous from 'glamorous-native'
import { StyleSheet } from 'react-native'
import isEmpty from 'lodash/isEmpty'

/**
 * Creates glam elements with displayName
 * @param {component|Object}    component       Component to style and render or StyleSheet object
 * @param {string}              displayName     Name for component
 * @param {Object}              styles          Styles for component
 * @param {Function}            dynamicStyles   Styles that depend on component props
 * @returns {component}
 */
const glamFactory = (component, displayName, styles, dynamicStyles) => {
    if (component.constructor === Object) {
        if (isEmpty(component)) {
            throw new Error('Please insert a StyleSheet object')
        }
        return StyleSheet.create(component)
    }
    const _tempGlam = glamorous(component, { displayName })
    return _tempGlam(styles, dynamicStyles)
}

export default glamFactory
