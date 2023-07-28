import React, { createContext, useEffect, useState } from "react";
import { readData } from '../service/service_firebase'

// buat context global
export const StateContext = createContext()

// Buat komponen provider untuk menyediakan state global
export const StateProvider = ({ children }) => {

    const [dataProducts, setDataProducts] = useState([]);

    // STATE FILTER DATA UNTUK DIMAPPING
    const [filteredData, setFilteredData] = useState([]);

    // STATE UNTUK MEMFILTER DATA
    const [filteredByCategory, setFilterCategory] = useState('all');
    const [filterBrand, setFilterByBrand] = useState('');
    const [filterName, setFilterName] = useState('');

    // STATE SORTED DATA
    const [sortedValue, setSortedValue] = useState('');

    // STATE INPUT RANGE 
    const [rangeValue, setRangeValue] = useState('');

    // SELECT COLOR CATEGORY
    const [selectNav, setSelectNav] = useState('')
    // Length All Data
    const [arrLength, setArrayLength] = useState('')

    const [loading, setLoading] = useState(true); // State untuk indikator loading

    useEffect(() => {
        readDataFirebase().then(() => {
            setFilteredData('')
            setLoading(false)
        })
    }, [])

    const readDataFirebase = async () => {
        try {
            const response = await readData();
            if (response) {
                const datas = response.docs.map(item => {
                    let data = { ...item.data(), id: item.id };
                    return data;
                });

                const lengData = datas.length;
                setArrayLength(lengData)

                const allData = datas; // balikkan urutan data 
                setDataProducts(allData);

            }
        } catch (error) {
            console.error(error);
        }
    };

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

        let sortedData = filteredData ? [...filteredData] : [...dataProducts];
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
        setRangeValue('');
        setSortedValue('');
        setFilteredData([...dataProducts]);
        setSelectNav('')
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
                    className={`inline-block px-2 py-1 mx-1 rounded cursor-pointer ${i === currentPage ? "bg-orange-500 text-white" : "bg-gray-200"
                        }`}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    // HANDLE STYLE CARD PRODUCT
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

    // UNTUK CART MENGAMBIL SATU DATA SAJA ++
    const [cartData, setCartData] = useState([])

    // FUNCTION UNTUK MENAMBAHKAN SATU DATA SAJA
    const addDataById = (id) => {
        const newData = dataProducts.find(item => item.id === id);

        // CARI INDEX NYA DARI DATA YANG SUDAH DITAMBAHKAN KECART 
        const existingDataIndex = cartData.findIndex(item => item.id === id)

        if (existingDataIndex !== -1) {
            // If data exists, update its value
            setCartData(prevMappedData => {
                const updatedCartData = [...prevMappedData];
                updatedCartData[existingDataIndex].quantity += 1;
                updatedCartData[existingDataIndex].total = updatedCartData[existingDataIndex].harga * updatedCartData[existingDataIndex].quantity;
                return updatedCartData;
            });
        } else {
            // If data doesn't exist, add it to mappedData
            setCartData(prevCartData => [...prevCartData, { ...newData, quantity: 1, total: newData.harga }]);
        }
    };

    // FORMAT RUPIAH
    const formatToRupiah = (value) => {
        const formatter = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        });
        const formattedValue = formatter.format(value);
        return formattedValue.replace('Rp', '');
    };



    return (
        <StateContext.Provider value={{
            // function FORMAT RUPIAH
            formatToRupiah,
            // GET ONE DATA 
            addDataById,
            cartData,
            // Data Hasil Filter Yang Mau Dimapping
            currentItems,
            // All Data
            dataProducts,
            // State untuk filter
            filterBrand,
            filterName,
            sortedValue,
            rangeValue,
            // State pagination
            currentPage,
            totalPages,
            // fungsi filter
            filterByCategory,
            filterByBrand,
            filterByName,
            handleRangeValue,
            sortBy,
            handleResetFilter,
            // fungsi pagination
            handlePrevPage,
            handleNextPage,
            goToPage,
            renderPaginationButtons,
            // state select Nav
            selectNav,
            setSelectNav,
            // state arr length
            arrLength,
            loading,
            readDataFirebase,

            // STATE HANDLE STYLE
            styleGrid,
            styleFlex,
            // FUNCGSI HANDLE STYLE
            handleStyleGrid,
            handleStyleFlex

        }}>
            {children}
        </StateContext.Provider>
    );
};
