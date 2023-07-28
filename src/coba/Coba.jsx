import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../store/stateContext';
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";

function Coba() {
    const { dataProducts, readDataFirebase } = useContext(StateContext);

    useEffect(() => {
        readDataFirebase()
    }, [])

    const [cartData, setCartData] = useState([])

    const addDataById = (id) => {
        const newData = dataProducts.find(item => item.id === id)
        // TAMBAHKAN PROPERTY NYA DAN TAMBAHKAN 1 SETIAP MENAMBAHKAN DATA
        newData.quantity = (newData.quantity || 0) + 1;
        // TAMBAHKAN PROPERTY NYA DAN KALIKAN DARI HARGA SAAT INI DENGAN QUANTITY
        newData.total = newData.harga * newData.quantity

        setCartData(prevCartData => [...prevCartData, newData]);
    }

    return (
        <div className='mt-32 mb-10'>

            <div className='w-[900px] mx-auto'>
                <h1>Cart {cartData.length || 0}</h1>
            </div>


            {/* Tampilkan hasil data yang telah difilter berdasarkan range harga */}
            <div className='flex flex-wrap w-[900px] mx-auto gap-5'>

                {
                    dataProducts.map((item, index) => {
                        return (
                            <div key={index}
                                className={`shadow-md p-4 w-[230px] h-max `}>
                                <div>
                                    <div className='relative'>
                                        <img
                                            className="h-[220px] w-full"
                                            src={item.url}
                                            alt={item.name} />
                                        <div className='absolute inset-0 hover:bg-[#3333] transition duration-300'></div>
                                    </div>
                                </div>

                                <div className="mt-6 flex flex-col gap-0.5 items-center w-full">
                                    <div className={`flex flex-col w-full text-center`}>
                                        <h1 className='text-[orangeRed]'>Rp {item.harga}</h1>
                                        <p className='truncate w-full'>{item.name}</p>

                                    </div>
                                    <button
                                        type='button'
                                        onClick={() => addDataById(item.id)}
                                        className="mt-3 bg-[orangeRed] text-white" >Add To Cart
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Coba;
