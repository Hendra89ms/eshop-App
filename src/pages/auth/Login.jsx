import React, { useEffect, useState } from 'react'
import loginImg from '../../assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import { Loader } from '../../components'
import './animate.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth } from '../../firebase_config'

function Login() {

    useEffect(() => {
        // ANIMASI SLIDE UP DAN SLIDE DOWN
        const element1 = document.querySelector(".animate-slide-up");
        const element2 = document.querySelector(".animate-slide-down");
        element1.classList.add("animate-slide-up-keyframes");
        element2.classList.add("animate-slide-down-keyframes");

    }, [])

    const navigate = useNavigate('')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    // FUNCTION LOGIN WITH EMAIL PASSWORD
    const handleLogin = (e) => {
        e.preventDefault()

        if (email === '' || password === '') {
            return toast.error("You Must input data!")
        }

        if (password.length < 6) {
            return toast.error("Password at least 6 character")
        }

        setIsLoading(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                if (user) {
                    toast.success('Login Successfull')
                    return navigate('/')
                }

                setIsLoading(false)
            })
            .catch((error) => {
                toast.error(error.message)
                setIsLoading(false)
            });


    }
    // END FUNCTION LOGIN WITH EMAIL PASSWORD

    // FUNCTION LOGIN WITH GOOGLE 
    const handleGoogleLogin = () => {
        const provider = new GoogleAuthProvider()

        signInWithPopup(auth, provider)
            .then((result) => {
                // const user = result.user;
                toast.success("Login with successfully")
                navigate('/')
            }).catch((error) => {
                // Handle Errors here.
                toast.error(error.message)
            });
    }
    // END FUNCTION LOGIN WITH GOOGLE 

    return (
        <>
            {isLoading && <Loader />}
            <section className='w-full md:max-w-[900px] mx-auto relative bg-cover bg-center bg-opacity-50 bg-transparent h-[500px] mt-44'>

                <div className='flex md:justify-start justify-center items-center mt-[100px] '>
                    <div className='w-[400px] animate-slide-up md:block hidden'>
                        <img src={loginImg} className='object-cover' alt="login" />
                    </div>

                    {/* IMG UNTUK RESPONSIVE */}
                    <img src={loginImg} className="w-full h-full object-cover opacity-20 absolute z-0 md:hidden block" alt="register" />
                    {/* END IMG UNTUK RESPONSIVE*/}

                    <form
                        onSubmit={handleLogin}
                        className='md:w-[400px] w-[350px] shadow-md p-4 rounded-md animate-slide-down z-[90]'>
                        <div className=''>
                            <h1 className='text-center text-3xl mb-5 text-[orangered] font-semibold'>Login</h1>

                            <div className='flex flex-col gap-3'>
                                <input
                                    autoFocus
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    type="email"
                                    placeholder='email'
                                    className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md' />
                                <input
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    type="password"
                                    placeholder='password'
                                    className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md' />

                                <button
                                    type='submit'
                                    className='bg-[#1f93ff] hover:bg-[#167dde] duration-300 text-white p-1.5 rounded-md'>Login</button>
                            </div>

                            <div className='hover:text-[orangered] duration-300 '>
                                <Link to='/reset' >Reset Password</Link>
                            </div>

                            <div className='text-center my-3'>-- or --</div>
                            <button
                                type='button'
                                onClick={handleGoogleLogin}
                                className='bg-[orangered] hover:bg-[#de6a27] duration-300 text-white w-full p-1.5 rounded-md flex justify-center items-center gap-2'><FaGoogle /> Login With Google</button>

                            <div className='text-center mt-4'>Don't have an account?<Link to='/register' className='font-semibold hover:text-[orangered] duration-300'>Register</Link></div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login