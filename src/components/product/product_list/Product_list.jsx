import React, { useState, useEffect } from 'react'
import Card_Product from './Card_Product';
import { paginationData } from '../../../service/service_firebase'


function Product_list() {

    const [dataFirebase, setDataFirebase] = useState([])
    const [lastDocument, setLastDocument] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;

    useEffect(() => {
        readDataFirebase()
    }, [currentPage])

    const readDataFirebase = async () => {
        try {
            const response = await paginationData(pageSize, lastDocument)

            if (response) {
                const datas = response.docs.map(item => {
                    // BUAT JADI OBJECT DATA DARI FIREBASE
                    let data = { ...item.data(), id: item.id }
                    // return data nya
                    return data;
                })
                // SET DATA UNTUK DIMAPPING
                setDataFirebase(datas)

                // Set lastDocument jika ada data tersisa
                if (datas.length > 0) {
                    const lastDoc = response.docs[response.docs.length - 1];
                    const lastDocData = lastDoc.data();
                    setLastDocument(lastDocData);
                }

            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div className='w-full '>

            <div className='shadow-md '>
                <div className='w-full flex justify-center items-center mt-5'>
                    <div className='flex flex-wrap gap-6'>
                        {
                            dataFirebase.length === 0 ? <div >Loading...</div> :
                                dataFirebase.map(item => {

                                    return (
                                        <Card_Product
                                            key={item.id}
                                            src={item.url}
                                            price={item.harga}
                                            name={item.name}
                                        />
                                    )
                                })
                        }

                    </div>
                </div>
            </div>

            <div className='flex justify-center items-center mt-4'>
                <div className='flex gap-3'>
                    <div className='flex border-[1px] border-gray-400'>
                        <div className='bg-orange-600 text-white px-3 cursor-pointer border-[1px] border-gray-400'>1</div>
                        <div className='px-3 cursor-pointer border-[1px] border-gray-400'>2</div>
                        <button className='px-3' onClick={handleNextPage}>Next</button>
                    </div>
                    <div className=''>
                        <h1>Page {currentPage} of 2</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product_list