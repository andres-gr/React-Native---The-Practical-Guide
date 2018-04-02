import yup from 'yup'

const imageSchema = yup
    .string()
    .trim()
    .default('')
    .required('Please pick an image')

export default imageSchema
