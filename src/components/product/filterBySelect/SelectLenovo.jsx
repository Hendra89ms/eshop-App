import { useState, useContext } from 'react'
import Card_Product from '../product_list/Card_Product'
import { StateContext } from '../../../store/stateContext';

function SelectLenovo() {

    const { dataLenovo } = useContext(StateContext)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalPages = Math.ceil(dataLenovo.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = dataLenovo.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPagination = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <div
                    key={i}
                    className={`inline-block px-2 py-1 mx-1 rounded cursor-pointer ${i === currentPage ? "bg-orange-500 text-white" : "bg-gray-200"
                        }`}
                    onClick={() => handleClick(i)}
                >
                    {i}
                </div>
            );
        }
        return pageNumbers;
    };

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
        </div>
    )
}

export default SelectLenovo