import React, { useState, useEffect } from 'react'
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from '../product_list/Search';
import { readData } from '../../../service/service_firebase'

function RightTable() {

    const [arrLength, setArrayLength] = useState()

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

                const lengthData = datas.length
                setArrayLength(lengthData)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className='flex justify-between pb-4 '>

                <div className='flex gap-2 items-center '>
                    <BsFillGridFill
                        className='cursor-pointer'
                        color="orangered"
                        size={22} />

                    <FaListAlt
                        className='cursor-pointer'
                        size={24}
                        color="#0066d4" />

                    <h1 className='font-semibold'>{arrLength}</h1>
                    <p>Products Found</p>
                </div>

                {/* KOMPONENT SEARCH */}
                <Search />
                {/* END KOMPONENT SEARCH */}

                <div>
                    Sort by : <select className='cursor-pointer border-none outline-none'>
                        <option value="latest">Latest</option>
                        <option value="lowest-price">Lowest Price</option>
                        <option value="highest-price">Highest Price</option>
                        <option value="a-z">A - Z</option>
                        <option value="z-a">Z - A</option>
                    </select>
                </div>
            </div>
            <hr />
        </>
    )
}

export default RightTable;