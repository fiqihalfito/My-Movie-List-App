import * as Yup from 'yup'

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('fill your Email, please'),
    password: Yup.string().required('fill your Password, please'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), 'password not match']),
});