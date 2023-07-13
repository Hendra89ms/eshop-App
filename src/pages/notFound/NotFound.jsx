import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {

    return (
        <div className='flex justify-center items-center fixed inset-0 z-[999] bg-[#1a1b1f]'>
            <div className='text-red-500 font-semibold text-2xl'>
                <h1>ERROR... PAGE NOT FOUND !!!</h1>
                <Link to={'/'}>
                    <div className='text-lg text-center mt-4 text-white hover:text-red-700 duration-300 ease-in-out'>
                        Back to Home
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default NotFound