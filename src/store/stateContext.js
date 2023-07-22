import React, { createContext, useEffect, useState } from "react";
import { readData } from '../service/service_firebase'

// buat context global
export const StateContext = createContext()

// Buat komponen provider untuk menyediakan state global
export const StateProvider = ({ children }) => {

    const [dataProducts, setDataProducts] = useState([]);
    const [filterHarga, setFilterHarga] = useState(0); // State untuk menyimpan nilai filter harga
    const [filterType, setFilterType] = useState(''); // State untuk menyimpan nilai filter type
    const [filterBrand, setFilterBrand] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
    const [selectNav, setSelectNav] = useState('all')

    useEffect(() => {
        readDataFirebase();
    }, []);

    const readDataFirebase = async () => {
        try {
            const response = await readData();
            if (response) {
                const datas = response.docs.map(item => {
                    let data = { ...item.data(), id: item.id };
                    return data;
                });
                console.log('data : ', datas)
                setDataProducts(datas);

                const maxValue = Math.max(...dataProducts.map(item => item.harga))
                const minValue = Math.min(...dataProducts.map(item => item.harga))
                setPriceRange({ ...priceRange, min: minValue, max: maxValue })

            }
        } catch (error) {
            console.error(error);
        }
    };

    // Fungsi untuk mengubah nilai filter harga saat terjadi perubahan pada input range
    const handleFilterHargaChange = (event) => {
        const priceRange = parseInt(event.target.value);
        setFilterHarga(priceRange);
    };

    // Fungsi untuk mengubah nilai filter type saat terjadi perubahan pada elemen select
    const handleFilterBrand = (event) => {
        const selectedType = event.target.value;
        setFilterBrand(selectedType);
    };

    // Fungsi untuk mengubah nilai filter brand saat tombol brand diklik
    const handleTypeFilter = (type) => {
        setFilterType(type)
    };

    // Fungsi untuk mereset semua filter ke nilai awal
    const handleResetFilters = () => {
        setFilterHarga(0);
        setFilterType('');
        setFilterBrand('');
        setSelectNav('all')
    };

    // Lakukan filter pada array data berdasarkan nilai filter harga, type, dan brand yang dipilih
    const filteredData = dataProducts.filter(item => {
        const filterByHarga = filterHarga === 0 || item.harga <= filterHarga;
        const filterByType = filterType === '' || item.type === filterType;
        const filterByBrand = filterBrand === '' || item.brand === filterBrand;
        return filterByHarga && filterByType && filterByBrand;
    });


    // START PAGINATION
    const itemsPerPage = 10;
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

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
    // END PAGINATION

    return (
        <StateContext.Provider value={{
            priceRange,
            setPriceRange,
            filterHarga,
            handleFilterHargaChange,
            handleTypeFilter,
            currentItems,
            totalPages,
            handleNextPage,
            handlePreviousPage,
            renderPagination,
            currentPage,
            filteredData,
            handleResetFilters,
            selectNav,
            setSelectNav,
            handleFilterBrand,
            filterBrand
        }}>
            {children}
        </StateContext.Provider>
    );
};
