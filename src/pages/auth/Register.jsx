import React, { useEffect, useState } from 'react'
import registerImg from '../../assets/register.png'
import { Link, useNavigate } from 'react-router-dom'
import './animate.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '../../components'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase_config'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isShowPassword, setIsShowPassword] = useState(false)
    const [isShowCpassw, setIsShowCpassw] = useState(false)

    const navigate = useNavigate('')


    // FUNCTION REGISTRASI MENGGUNAKAN FIREBASE
    const registrasiFb = () => {

        const userRegist = createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // const user = userCredential.user;

                setIsLoading(false)

                navigate('/login')

                setEmail('')
                setPassword('')
                setCPassword('')

            })

        if (userRegist) {
            return toast.success('Registration Successfull!')
        }
    }
    // END FUNCTION REGISTRASI MENGGUNAKAN FIREBASE


    const handleRegister = (e) => {
        e.preventDefault()

        if (email === '' || password === '' || cpassword === '') {
            return toast.error("You Must input data!")
        }

        if (password !== cpassword) {
            return toast.error("Password do not match")
        }

        if (password.length < 6 || cpassword < 6) {
            return toast.error("Password at least 6 character")
        }

        setIsLoading(true)

        registrasiFb()

    }

    useEffect(() => {
        // ANIMASI SLIDE UP DAN SLIDE DOWN
        const element1 = document.querySelector(".animate-slide-up");
        const element2 = document.querySelector(".animate-slide-down");
        element1.classList.add("animate-slide-up-keyframes");
        element2.classList.add("animate-slide-down-keyframes");

    }, [])

    const handleEye = () => {
        setIsShowPassword(!isShowPassword)
    }
    const handleEyeCPasw = () => {
        setIsShowCpassw(!isShowCpassw)
    }

    return (

        <>
            <ToastContainer />
            {isLoading && <Loader />}
            <section className='w-full md:max-w-[900px] mx-auto bg-cover bg-center bg-opacity-50 bg-transparent h-[500px] relative mt-44'  >

                <div className='flex justify-center md:justify-start items-center mt-[100px] '>

                    <div className='w-[400px] animate-slide-down md:block hidden'>
                        <img src={registerImg} className='object-cover' alt="register" />
                    </div>

                    {/* IMG UNTUK RESPONSIVE */}
                    <img src={registerImg} className="w-full h-full object-cover opacity-10 absolute z-0 md:hidden block" alt="register" />
                    {/* END IMG UNTUK RESPONSIVE*/}

                    <form
                        onSubmit={handleRegister}
                        className='md:w-[400px] w-[350px] shadow-md p-4 rounded-md animate-slide-up duration-500 z-[90]'>

                        <h1 className='text-center text-3xl mb-6 text-[orangered] font-semibold'>Register</h1>

                        <div className='flex flex-col gap-3'>
                            <input
                                type="email"
                                autoFocus
                                value={email}
                                onChange={(e) => (setEmail(e.target.value))}
                                placeholder='email'
                                className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md' />

                            <div className='relative w-full'>
                                <input
                                    type={isShowPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => (setPassword(e.target.value))}
                                    placeholder='password'
                                    className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md w-full'
                                />
                                <div
                                    onClick={handleEye}
                                    className='absolute right-[10px] top-[12px] cursor-pointer'>
                                    {
                                        isShowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
                                    }
                                </div>
                            </div>

                            <div className='relative w-full'>
                                <input
                                    type={isShowCpassw ? "text" : "password"}
                                    value={cpassword}
                                    onChange={(e) => (setCPassword(e.target.value))}
                                    placeholder='Confirm password'
                                    className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md w-full'
                                />
                                <div
                                    onClick={handleEyeCPasw}
                                    className='absolute right-[10px] top-[12px] cursor-pointer'>
                                    {
                                        isShowCpassw ? <AiOutlineEyeInvisible /> : <AiOutlineEye />
                                    }
                                </div>
                            </div>

                            <button type='submit' className='bg-[#1f93ff] text-white p-1.5 rounded-md hover:bg-[#167dde] duration-300 '>Register</button>
                        </div>

                        <div className='text-center mt-4'>Already an account?<Link to='/login' className='font-semibold hover:text-[orangered] duration-300'>Login</Link></div>

                    </form>


                </div>

            </section>
        </>



    )
}

export default Register