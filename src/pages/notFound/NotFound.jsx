import React from 'react'
import { Link } from 'react-router-dom'
import { FaLongArrowAltRight } from 'react-icons/fa'

function NotFound() {

    return (
        <div className='flex justify-center items-center fixed inset-0 z-[999] bg-[#1a1b1f]'>
            <div className='text-red-500 font-semibold text-2xl flex flex-col justify-center items-center'>
                <h1>SORRY, THE WEBSITE IS CURRENTLY UNDER DEVELOPTMENT.
                    YOU CAN COME BACK AGAIN !!!</h1>

                <div className='flex items-center gap-4'>
                    <div className='animate-pulse text-white'>
                        <FaLongArrowAltRight />
                    </div>
                    <Link to={'/'}>
                        <h1 className='text-lg text-center mt-4 text-white hover:text-slate-400 duration-300 ease-in-out'>Back to Home</h1>
                    </Link>
                </div>


            </div>
        </div>
    )
}

export default NotFound