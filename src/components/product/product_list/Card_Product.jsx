import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StateContext } from '../../../store/stateContext';

function Card_Product({ id, price, src, name, description, oneId }) {

    const { styleGrid, styleFlex, addDataById } = useContext(StateContext)


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
        <div
            className={`shadow-md ${styleGrid ? "p-4 w-[230px] h-max" : styleFlex ? "w-[750px] flex p-2 gap-8" : ""} `}>
            <Link to={`/details/${id}`}>
                <div className='relative'>
                    <img
                        className={`object-cover ${styleGrid ? "h-[220px] w-full" : styleFlex ? "h-[250px] w-[350px]" : ""}`}
                        src={src}
                        alt={name} />
                    <div className='absolute inset-0 hover:bg-[#3333] transition duration-300'></div>
                </div>
            </Link>

            <div className={`${styleGrid ? "mt-6 flex flex-col gap-0.5 items-center w-full" : styleFlex ? "flex flex-col w-full justify-around" : ""}`}>
                <div className={`${styleGrid ? "flex flex-col w-full text-center" : styleFlex ? "" : ""}`}>
                    <h1 className='text-[orangeRed]'>Rp {formatToRupiah(price)}</h1>
                    <p className='truncate w-full font-semibold'>{name}</p>
                    <div className={`${styleGrid ? "hidden" : styleFlex ? "block" : ""}`}>{description}</div>
                </div>
                <button
                    onClick={() => { addDataById(oneId) }}
                    className={`mt-3 bg-[orangeRed] text-white ${styleGrid ? "w-full" : styleFlex ? "w-[200px]" : ""} rounded-md hover:bg-orange-700 duration-300 ease-in-out h-[35px]`}>Add To Cart</button>
            </div>
        </div>

    )
}

export default Card_Product