import { useState } from "react"
import { useCookies } from "react-cookie"
import FormInput from "./FormInput"
import { useFormik, validateYupSchema } from 'formik'
import { loginSchema } from "../validation"

const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies()
    const [isLoginPage, setIsLoginPage] = useState(true)
    const [showSuccessSignup, setShowSuccessSignup] = useState(false)



    const handleSubmit = async (values, actions) => {
        // e.preventDefault()

        const endpoint = isLoginPage ? 'login' : 'signup'

        if (!values.confirmPassword && endpoint == 'signup') {
            actions.setFieldError('confirmPassword', 'Required')
            return
        }

        try {
            // fetch data
            const response = await fetch(`http://localhost:8000/${endpoint}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: values.email, password: values.password })
            })

            const data = await response.json()
            if (data.error) {
                actions.setFieldError(data.error.name, data.error.message)
                return
            }

            if (response.ok && endpoint == 'signup') {
                setShowSuccessSignup(true)
            }

            if (response.ok && endpoint == 'login') {
                setCookie('AuthToken', data.token)
                setCookie('Email', data.email)

                window.location.reload()
            }

        } catch (error) {
            console.error(error)
        }

    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: loginSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: handleSubmit
    })


    const viewLogin = (status) => {
        formik.setErrors({})
        setShowSuccessSignup(false)
        setIsLoginPage(status)
    }

    return (
        <div className="w-1/2 bg-slate-900 text-white rounded-xl overflow-hidden">
            <form className="flex flex-col p-12" onSubmit={formik.handleSubmit}>
                <FormInput type={'email'} name={'email'} handleChange={formik.handleChange} error={formik.errors.email} />
                <FormInput type={'password'} name={'password'} handleChange={formik.handleChange} error={formik.errors.password} />
                {!isLoginPage && <FormInput type={'password'} name={'confirmPassword'} handleChange={formik.handleChange} error={formik.errors.confirmPassword} />}

                <input
                    type={'submit'}
                    value={isLoginPage ? "Login" : "Signup"}
                    className="btn font-bold tracking-wider bg-emerald-400 w-min mx-auto cursor-pointer hover:bg-emerald-600 active:bg-emerald-700"
                />
            </form>

            {/* {error && <p>{error}</p>} */}
            {showSuccessSignup && <p>success signup</p>}
            <div className="grid grid-cols-2 font-bold ">
                <button
                    className={`${isLoginPage ? 'bg-violet-700' : 'bg-slate-800'} py-2 tracking-wider`}
                    onClick={() => viewLogin(true)}>
                    Login
                </button>
                <button
                    className={`${!isLoginPage ? 'bg-violet-700' : 'bg-slate-800'} py-2 tracking-wider`}
                    onClick={() => viewLogin(false)}>
                    Signup
                </button>
            </div>
        </div>
    )
}

export default Auth