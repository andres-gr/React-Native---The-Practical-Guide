import glamorous from 'glamorous-native'

/**
 * Creates glam elements with displayName
 * @param {component}   component       Component to style and render
 * @param {string}      displayName     Name for component
 * @param {Object}      styles          Styles for component
 * @param {Function}    dynamicStyles   Styles that depend on component props
 * @returns {component}
 */
const glamFactory = (component, displayName, styles, dynamicStyles) => {
    const _tempGlam = glamorous(component, { displayName })
    return _tempGlam(styles, dynamicStyles)
}

export default glamFactory
