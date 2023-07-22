import Card_Product from './Card_Product';

import { useContext } from 'react'
import { StateContext } from '../../../store/stateContext'


function Product_list() {

    // GLOBAL STATE
    const { currentItems, handleNextPage, handlePreviousPage, renderPagination, currentPage, totalPages } = useContext(StateContext)

    return (
        <div className='w-full '>
            <div className='shadow-md '>
                <div className='w-full flex justify-center items-center mt-5'>
                    <div className='flex flex-wrap gap-6'>
                        {
                            currentItems.length === 0 ? <div >Loading...</div> :
                                currentItems.map(item => {

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
                        <button
                            disabled={currentPage === 1}
                            className='px-3 cursor-pointer'
                            onClick={handlePreviousPage}>Back
                        </button>

                        {/* <div className='px-3 cursor-pointer border-[1px] border-gray-400'>2</div> */}
                        <div> {renderPagination()}</div>
                        <button
                            className='px-3 cursor-pointer'
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >Next</button>
                    </div>
                    <div className='flex items-center'>
                        <h1>Page {currentPage} of {totalPages}</h1>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Product_list