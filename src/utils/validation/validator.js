import validate from 'validate.js'
import _ from 'lodash'

validate.formatters.custom = errors => errors.map(i => {
    const error = {
        error   : { ...i },
        message : i.error,
        name    : i.attribute
    }
    return error
})

/**
 * Validates an object based on the constraints passed
 * @param {object}  constraints constraints object to validate
 */
class Validator {
    constructor (constraints) {
        this.constraints = constraints
        this.keys = Object.keys(constraints)
    }
    currentValidation = null
    currentErrors = null
    currentObjKeys = null
    getValid () {
        const { currentErrors, currentObjKeys } = this,
            valid = {},
            good = _.difference(currentObjKeys, currentErrors),
            bad = _.intersection(currentObjKeys, currentErrors)
        good.forEach(i => {
            valid[i] = true
        })
        bad.forEach(i => {
            valid[i] = false
        })
        return valid
    }
    getError () {
        return this.currentValidation[0].message
    }
    getErrors () {
        return this.currentErrors
    }
    getValidation () {
        return this.currentValidation
    }
    isValid () {
        return !this.currentValidation
    }
    check (obj) {
        this.currentValidation = validate(obj, this.constraints, { format: 'custom' })
        this.currentObjKeys = Object.keys(obj)
        if (this.currentValidation) {
            this.currentErrors = this.currentValidation.map(i => i.name)
        }
    }
}

export default Validator
