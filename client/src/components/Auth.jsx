import { useState } from "react"
import { useCookies } from "react-cookie"

const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies()
    const [isLoginPage, setIsLoginPage] = useState(true)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [showSuccessSignup, setShowSuccessSignup] = useState(false)


    const handleSubmit = async (e, endpoint) => {
        e.preventDefault()

        try {
            if (!email || !password) {
                throw new Error('input cant be empty')
            }

            if (!isLoginPage) {
                if (password !== confirmPassword) {
                    throw new Error('password not match')
                }
            }


            setError(null)
            setShowSuccessSignup(false)

            // fetch data
            const response = await fetch(`http://localhost:8000/${endpoint}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })



            const data = await response.json()

            if (data.error) {
                throw new Error(data.error)
            }

            if (response.ok && endpoint == 'signup') {
                setShowSuccessSignup(true)
            }

            if (response.ok && endpoint == 'login') {
                setCookie('AuthToken', data.token)
                setCookie('Email', data.email)

                window.location.reload()
            }


            // console.log(data)
        } catch (error) {
            console.error(error)
            setError(error.message)
        }


        // login or signup

    }

    const viewLogin = (status) => {
        setError(null)
        setShowSuccessSignup(false)
        setIsLoginPage(status)
    }

    return (
        <div className="w-1/2 h-1/2 bg-white rounded">
            <form className="flex flex-col">
                <label htmlFor="email">Email</label>
                <input
                    type={'email'}
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor="password">password</label>
                <input
                    type={'password'}
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)} />
                {!isLoginPage && <>
                    <label htmlFor="confirm-password">confirm password</label>
                    <input
                        type={'password'}
                        id="confirm-password"
                        name="password"
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                </>}
                <input
                    type={'submit'}
                    value="Submit"
                    onClick={(e) => handleSubmit(e, isLoginPage ? 'login' : 'signup')} />
            </form>
            {error && <p>{error}</p>}
            {showSuccessSignup && <p>success signup</p>}
            <div>
                <button onClick={() => viewLogin(true)}>Login</button>
                <button onClick={() => viewLogin(false)}>Signup</button>
            </div>
        </div>
    )
}

export default Auth