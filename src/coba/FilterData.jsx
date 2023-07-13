import React, { useEffect, useState } from 'react'
import { readData } from '../service/service_firebase'
import Card_Product from './Card_Product'

function FilterData() {

    const [dataFirebase, setDataFirebase] = useState([])

    useEffect(() => {
        readDataFirebase()
    }, [])

    const readDataFirebase = async () => {
        try {
            const response = await readData()

            if (response) {
                const datas = response.docs.map(item => {
                    // BUAT JADI OBJECT DATA DARI FIREBASE
                    let data = { ...item.data(), id: item.id }
                    // return data nya
                    return data;
                })
                // SET DATA UNTUK DIMAPPING
                setDataFirebase(datas)

            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='flex justify-center '>
            <div className='mt-28 w-full md:max-w-[1000px] '>
                <h1 className='text-2xl text-center'>Filter Data</h1>
                <div className='w-full flex md:flex-row flex-col justify-between mt-7 '>
                    <div className='w-full'>
                        <input
                            type="text"
                            placeholder='Search Product'
                            className=' h-[40px] p-3 border-gray-300 border-[1px] outline-none w-[400px]' />
                    </div>

                    <div className='flex justify-around  gap-5 '>
                        <button className='bg-blue-800  text-white px-3'>All</button>
                        <button>Grown</button>
                        <button>Shirt</button>
                        <button>Jewelry</button>
                        <button>watch</button>
                    </div>
                </div>

                <div>
                    {
                        dataFirebase.map((item) => {

                            return (
                                <Card_Product
                                    key={item.id}
                                    nameProduct={item.name}
                                    harga={item.harga}
                                    src={item.url}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default FilterData