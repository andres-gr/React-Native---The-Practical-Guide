import yup from 'yup'

const placesSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .default('')
        .required('Please input a place name')
})

export default placesSchema
