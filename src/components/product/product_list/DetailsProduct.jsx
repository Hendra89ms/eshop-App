import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { detailData } from '../../../service/service_firebase'
import { BsArrowLeft } from 'react-icons/bs'
import { Loader } from '../../loader'

function DetailsProduct() {

    const { id } = useParams('')

    const [dataId, setDataId] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getDataProducts()
    }, [])

    const getDataProducts = async () => {
        try {
            setLoading(true)
            const response = await detailData(id)
            setLoading(false)
            setDataId(response.data())
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='mt-28'>
            {/* <h1>DETAIL PRODUCT Params : {id}</h1> */}

            {
                loading ? <Loader /> :
                    (
                        <div className='w-full flex justify-center items-center'>
                            <div className='w-[1000px] flex flex-col'>
                                <div>
                                    <h1 className='text-3xl font-semibold'>Product Details</h1>

                                    <div className='flex gap-3 items-center'>
                                        <BsArrowLeft />
                                        <Link to='/' className='hover:shadow-slate-200 hover:shadow-md'>Back To Product</Link>
                                    </div>
                                </div>

                                <div className='w-full flex gap-4 mt-6'>
                                    <div className='shadow-md w-[500px] h-[400px] p-4 flex justify-center items-center'>
                                        <img
                                            src={dataId.url}
                                            alt=""
                                            className='bg-cover w-[300px] h-[300px]'
                                        />
                                    </div>

                                    <div className='flex flex-col w-full gap-3'>
                                        <h1 className='font-semibold'>{dataId.name}</h1>
                                        <h2 className='text-orange-500'>RP {dataId.harga}</h2>

                                        <p>
                                            {dataId.description}
                                        </p>

                                        <div className='flex flex-col gap-2'>
                                            <h1 ><span className='font-semibold'>SKU : </span>{id}</h1>
                                            <h1><span className='font-semibold'>Brand : </span>{dataId.brand}</h1>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <button className='bg-slate-200 hover:bg-slate-300 duration-300 px-3 py-1.5'> - </button>
                                            <p>1</p>
                                            <button className='bg-slate-200 hover:bg-slate-300 duration-300 px-3 py-1.5'> + </button>
                                        </div>
                                        <button className='w-[150px] bg-orange-500 hover:bg-orange-700 duration-300 text-white p-2 rounded-md mt-5'>ADD TO CART</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default DetailsProduct