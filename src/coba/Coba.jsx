import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../store/stateContext';
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";

function Coba() {
    const { dataProducts, readDataFirebase } = useContext(StateContext);

    const [styleGrid, setStyleGrid] = useState(true)
    const [styleFlex, setStyleFlex] = useState(false)

    const handleStyleGrid = () => {
        setStyleGrid(true)
        setStyleFlex(false)
    }
    const handleStyleFlex = () => {
        setStyleGrid(false)
        setStyleFlex(true)
    }

    useEffect(() => {
        readDataFirebase()
    }, [])

    return (
        <div className='mt-32 mb-10'>
            <div className='flex gap-2 items-center '>
                <BsFillGridFill
                    onClick={handleStyleGrid}
                    className='cursor-pointer'
                    color="orangered"
                    size={22} />

                <FaListAlt
                    onClick={handleStyleFlex}
                    className='cursor-pointer'
                    size={24}
                    color="#0066d4" />

                <h1 className='font-semibold'>40</h1>
                <p>Products Found</p>
            </div>

            {/* Tampilkan hasil data yang telah difilter berdasarkan range harga */}
            <div className='flex flex-wrap w-[900px] mx-auto gap-5'>

                {
                    dataProducts.map((item, index) => {
                        return (
                            <div key={index}
                                className={`shadow-md ${styleGrid ? "p-4 w-[230px] h-max" : styleFlex ? "w-[900px] flex p-2 gap-8" : ""} `}>
                                <div>
                                    <div className='relative'>
                                        <img
                                            className={`object-cover ${styleGrid ? "h-[220px] w-full" : styleFlex ? "h-[250px] w-[350px]" : ""}`}
                                            src={item.url}
                                            alt={item.name} />
                                        <div className='absolute inset-0 hover:bg-[#3333] transition duration-300'></div>
                                    </div>
                                </div>

                                <div className={`${styleGrid ? "mt-6 flex flex-col gap-0.5 items-center w-full" : styleFlex ? "flex flex-col w-full justify-around" : ""}`}>
                                    <div className={`${styleGrid ? "flex flex-col w-full text-center" : styleFlex ? "" : ""}`}>
                                        <h1 className='text-[orangeRed]'>Rp {item.harga}</h1>
                                        <p className='truncate w-full'>{item.name}</p>
                                        <div className={`${styleGrid ? "hidden" : styleFlex ? "block" : ""}`}>{item.description}</div>
                                    </div>
                                    <button className={`mt-3 bg-[orangeRed] text-white ${styleGrid ? "w-full" : styleFlex ? "w-[200px]" : ""} rounded-md hover:bg-orange-700 duration-300 ease-in-out h-[35px]`}>Add To Cart</button>
                                </div>
                            </div>
                        )
                    })
                }

                <div className='w-[900px] flex p-2 gap-8 shadow-md'>
                    <div>
                        <div className='relative'>
                            <img
                                className='object-cover h-[250px] w-[350px]'
                                src='https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTgXRefNhSKWXqu5kZlKhwqWSULeiAocte4M3BbpggLNqwT7CMwa8waYfQHl7x-2fcICn_DTMi3z7bloSunYpp5JgPzbRFNFxgHXSiSoFg&usqp=CAE'
                                alt="" />
                            <div className='absolute inset-0 hover:bg-[#3333] transition duration-300'></div>
                        </div>
                    </div>

                    <div className='flex flex-col w-full justify-around'>
                        <div>
                            <h1 className='text-[orangeRed]'>Rp 140.000</h1>
                            <p className='truncate w-full font-semibold'>Baju Distro Pria</p>
                            <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus commodi minima, dolorem vel libero vero. Velit rerum debitis distinctio eligendi.</div>
                        </div>
                        <button className='mt-3 bg-[orangeRed] text-white w-[200px] rounded-md hover:bg-orange-700 duration-300 ease-in-out h-[35px]'>Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Coba;
