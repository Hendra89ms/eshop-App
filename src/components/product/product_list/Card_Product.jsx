import React from 'react'

import { Link } from 'react-router-dom'

function Card_Product({ price, src, name }) {

    const formatToRupiah = (value) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
        const formattedValue = formatter.format(value);
        return formattedValue.replace('Rp', '');
    };

    return (
        <div className='shadow-md p-4 w-[230px] h-max '>

            <Link>
                <div className='relative'>
                    <img
                        className='object-cover h-[220px] w-full'
                        src={src}
                        alt="" />
                    <div className='absolute inset-0 hover:bg-[#3333] transition duration-300'></div>
                </div>
            </Link>

            <div className='mt-6 flex flex-col gap-0.5 items-center w-full'>
                <h1 className='text-[orangeRed]'>Rp {formatToRupiah(price)}</h1>
                <p className='truncate w-full'>{name}</p>
                <button className='mt-3 bg-[orangeRed] text-white w-full rounded-md hover:bg-orange-700 duration-300 ease-in-out h-[35px]'>Add To Cart</button>
            </div>
        </div>

    )
}

export default Card_Product