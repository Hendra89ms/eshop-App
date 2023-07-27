import React, { useContext, useEffect, useState } from 'react'
import { StateContext } from '../store/stateContext'
import CardProduct from './Card_Product'

function Coba1() {

    const [loading, setLoading] = useState(true); // State untuk indikator loading

    useEffect(() => {
        readDataFirebase().then((data) => {
            setLoading(false); // Set loading ke false setelah data selesai diambil
            setFilteredData(data);// Set filteredData setelah data diambil
        })
    }, [])

    // TANGKAP DATA DARI GLOBAL STATE
    const { dataProducts, readDataFirebase, maxHarga, setFilterValue } = useContext(StateContext);
    const [filteredData, setFilteredData] = useState(dataProducts);

    // STATE UNTUK MEMFILTER DATA
    const [filteredByCategory, setFilterCategory] = useState('');
    const [filterBrand, setFilterByBrand] = useState('');
    const [filterName, setFilterName] = useState('');

    // STATE SORTED DATA
    const [sortedValue, setSortedValue] = useState('');

    // Fungsi untuk melakukan filter berdasarkan kategori
    const filterByCategory = (type) => {
        setFilterCategory(type);

        if (type === 'all') {
            setFilteredData(dataProducts);
        } else {
            setFilteredData(dataProducts.filter(item => item.type === type));
        }
    };

    // Fungsi untuk melakukan filter berdasarkan merek/brand
    const filterByBrand = (e) => {
        const brand = e.target.value;
        setFilterByBrand(brand);

        if (brand === 'all') {
            setFilteredData(dataProducts);
        } else {
            setFilteredData(dataProducts.filter(item => item.brand === brand));
        }
    };

    // Fungsi untuk melakukan filter berdasarkan nama
    const filterByName = (e) => {
        const inputName = e.target.value
        setFilterName(inputName);

        if (inputName.trim() === '') {
            setFilteredData(dataProducts);
        } else {
            setFilteredData(dataProducts.filter(item => item.name.toLowerCase().includes(inputName.toLowerCase())));
        }
    };

    // Fungsi untuk melakukan filter berdasarkan range harga
    const [rangeValue, setRangeValue] = useState('');

    const handleRangeValue = (e) => {
        const targetValue = parseInt(e.target.value);
        setRangeValue(targetValue);

        // Filter data berdasarkan harga yang sesuai dengan rangeValue
        const filteredData = dataProducts.filter(item => item.harga <= targetValue);
        setFilteredData(filteredData);
    };

    // Fungsi untuk melakukan sorting berdasarkan harga atau nama
    const sortBy = (e) => {
        const sortOption = e.target.value;
        setSortedValue(sortOption);

        let sortedData = [...filteredData];
        if (sortOption === 'Lowest Price') {
            sortedData.sort((a, b) => a.harga - b.harga);
        } else if (sortOption === 'Highest Price') {
            sortedData.sort((a, b) => b.harga - a.harga);
        } else if (sortOption === 'A - Z') {
            sortedData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOption === 'Z - A') {
            sortedData.sort((a, b) => b.name.localeCompare(a.name));
        }
        setFilteredData(sortedData);
    };

    // Fungsi untuk menghapus semua filter dan sorting
    const handleResetFilter = () => {
        setFilterCategory('');
        setFilterByBrand('');
        setFilterName('');
        setRangeValue('')
        setSortedValue('');
        setFilteredData([...dataProducts]);
    };

    // PAGINATION 
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Ubah jumlah item yang ditampilkan per halaman di sini

    // Hitung total halaman berdasarkan jumlah item per halaman
    const totalPages = filteredData ? Math.ceil(filteredData.length / itemsPerPage) : Math.ceil(dataProducts.length / itemsPerPage);

    // Ambil data yang sesuai untuk halaman saat ini
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData ? filteredData.slice(indexOfFirstItem, indexOfLastItem) : dataProducts.slice(indexOfFirstItem, indexOfLastItem);

    // Mengatur halaman sebelumnya
    const handlePrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    }

    // Mengatur halaman selanjutnya
    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    // Mengatur halaman tertentu ketika tombol halaman di klik
    const goToPage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Generate tombol pagination
    const renderPaginationButtons = () => {
        const buttons = [];
        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`bg-blue-500 text-white p-3 mx-1 ${i === currentPage ? 'font-bold' : ''
                        }`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };


    return (
        <div className='mt-32 ml-5'>

            {
                loading ? <h1>Loading...</h1>
                    :
                    (
                        <>
                            <div className='flex gap-5'>
                                <button onClick={() => { filterByCategory('all') }} className='bg-blue-500 text-white p-3'>All</button>
                                <button onClick={() => { filterByCategory('laptop') }} className='bg-blue-500 text-white p-3'>Laptop</button>
                                <button onClick={() => { filterByCategory('electronics') }} className='bg-blue-500 text-white p-3'>ELectronics</button>
                                <button onClick={() => { filterByCategory('fashion') }} className='bg-blue-500 text-white p-3'>Fashion</button>
                                <button onClick={() => { filterByCategory('phone') }} className='bg-blue-500 text-white p-3'>Phone</button>
                            </div>

                            <div className='flex flex-wrap gap-4 my-5'>
                                <select value={filterBrand} onChange={filterByBrand}>
                                    <option value="all">All</option>
                                    <option value="lenovo">Lenovo</option>
                                    <option value="samsung">Samsung</option>
                                    <option value="oppo">Oppo</option>
                                    <option value="techno">Techno</option>
                                </select>
                            </div>

                            <div className='flex flex-wrap gap-4 my-5'>
                                <select value={sortedValue} onChange={sortBy}>
                                    <option value="">latest</option>
                                    <option value="Lowest Price">Lowest Price</option>
                                    <option value="Highest Price">Highest Price</option>
                                    <option value="A - Z">A - Z</option>
                                    <option value="Z - A">Z - A</option>
                                </select>
                            </div>

                            <div>
                                <input
                                    value={filterName}
                                    onChange={filterByName}
                                    type="text"
                                    className='border-[1px] border-black outline-none p-3'
                                />
                            </div>

                            <div className='my-5'>
                                <div>{rangeValue}</div>
                                <input
                                    value={rangeValue}
                                    min={Math.min(...dataProducts.map(item => item.harga))}
                                    max={Math.max(...dataProducts.map(item => item.harga))}
                                    onChange={handleRangeValue}
                                    type="range"
                                />
                            </div>

                            <button
                                onClick={handleResetFilter}
                                className='bg-red-500 text-white p-3'>Clear Filters</button>

                            <div className='mt-5'>
                                <div className='flex flex-wrap gap-5'>
                                    {
                                        currentItems.length === 0 ? <h1>DATA TIDAK DITEMUKAN</h1> :
                                            currentItems.map((item, index) => (
                                                <CardProduct
                                                    key={index}
                                                    name={item.name}
                                                    brand={item.brand}
                                                    type={item.type}
                                                    harga={item.harga}
                                                />
                                            ))
                                    }
                                </div>

                                {/* Pagination */}
                                <div className='my-5'>
                                    <button
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                        className='bg-blue-500 text-white p-3'
                                    >
                                        Prev
                                    </button>
                                    {renderPaginationButtons()}
                                    <button
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                        className='bg-blue-500 text-white p-3'
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </>
                    )
            }
        </div>
    )
}

export default Coba1