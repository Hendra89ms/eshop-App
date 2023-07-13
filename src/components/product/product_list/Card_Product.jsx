import React from 'react'

import { Link } from 'react-router-dom'

function Card_Product({ price, src, name }) {

    return (
        <div className='shadow-md p-4 w-[230px] h-max'>

            <Link>
                <img
                    className='object-cover h-[220px] w-full'
                    src={src}
                    alt="" />
            </Link>

            <div className='mt-6 flex flex-col gap-0.5 items-center w-full'>
                <h1 className='text-[orangeRed]'>Rp.{price}</h1>
                <p className='truncate w-full'>{name}</p>
                <button className='mt-3 bg-[orangeRed] text-white w-full rounded-md hover:bg-orange-700 duration-300 ease-in-out h-[35px]'>Add To Cart</button>
            </div>
        </div>

    )
}

export default Card_Product