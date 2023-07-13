import React, { useEffect, useState } from 'react'
import resetImg from '../../assets/forgot.png'
import { Link } from 'react-router-dom'
import './animate.css'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase_config'
import { toast } from 'react-toastify'
import { Loader } from '../../components'

function Reset() {

    useEffect(() => {
        // ANIMASI SLIDE UP DAN SLIDE DOWN
        const element1 = document.querySelector(".animate-slide-up");
        const element2 = document.querySelector(".animate-slide-down");
        element1.classList.add("animate-slide-up-keyframes");
        element2.classList.add("animate-slide-down-keyframes");
        // END SLIDE UP DAN SLIDE DOWN

    }, [])

    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const resetPassword = (e) => {
        e.preventDefault()

        if (email === '') {
            return toast.error('You must input data')
        }
        setIsLoading(true)

        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false)
                toast.success('Check your email for a reset link')
                setEmail('')
            })
            .catch(error => {
                setIsLoading(false)
                toast.error(error.message)
            })


    }

    return (
        <>
            {isLoading && <Loader />}
            <section className='w-full md:max-w-[900px] mx-auto  bg-cover bg-center bg-opacity-50 bg-transparent h-[500px] relative'>
                <div className='flex items-center mt-[100px] '>
                    <div className='w-[400px] animate-slide-up duration-500 md:block hidden'>
                        <img src={resetImg} className='object-cover' alt="Reset Password" />
                    </div>

                    {/* IMG UNTUK RESPONSIVE */}
                    <img src={resetImg} className="w-full h-full object-cover opacity-10 absolute z-0 md:hidden block" alt="register" />
                    {/* END IMG UNTUK RESPONSIVE*/}

                    <form
                        onSubmit={resetPassword}
                        className='w-[400px] shadow-md p-4 rounded-md animate-slide-down duration-500 z-10'>
                        <div className=''>
                            <h1 className='text-center text-3xl mb-8  text-[orangered] font-semibold'>Reset Password</h1>

                            <div className='flex flex-col gap-4'>
                                <input
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    type="email"
                                    placeholder='email'
                                    className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md' />

                                <button type='submit' className='bg-[#1f93ff] hover:bg-[#167dde] duration-300 text-white p-1.5 rounded-md'>Reset Password</button>
                            </div>


                            <div className='flex justify-between w-full mt-4'>
                                <div className='hover:scale-105 duration-200'>
                                    <Link to='/login' className=''>- Login</Link>
                                </div>

                                <div className='hover:scale-105 duration-200'>
                                    <Link to='/register' className=''>- Register</Link>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Reset