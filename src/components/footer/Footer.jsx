import React from 'react'

function Footer() {

    const date = new Date()
    const year = date.getFullYear()

    return (
        <div className='flex justify-center items-center h-[70px] bg-[#0a1930] text-white select-none'>
            &copy;{year} All Rights Reserved
        </div>
    )
}

export default Footer