import yup from 'yup'

const locationSchema = yup.object().shape({
    latitude: yup
        .number()
        .required('Please input a latitude'),
    longitude: yup
        .number()
        .required('Please input longitude')
})

export default locationSchema
