import React, { useState, useEffect } from 'react';
import { readData } from '../service/service_firebase';
import CardProduct from './Card_Product'

const Coba = () => {


    const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
    const [price, setPrice] = useState('')

    // menangkapa data dari firebase
    const [allData, setAllData] = useState([])

    // STATE UNTUK MENANGKAP DATA YANG SUDAH DIFILTER
    const [filteredData, setFilteredData] = useState([])

    // STATE UNTUK FILTER DATA BERDASARKAN CATEGORY DAN BRAND
    const [category, setCategory] = useState('')
    const [selectedBrand, setSelectedBrand] = useState('');

    useEffect(() => {
        readDataFirebase();
    }, []);

    useEffect(() => {
        mapAllData();
    }, [allData]);

    const mapAllData = () => {
        setFilteredData(allData);
    };

    const readDataFirebase = async () => {
        try {
            const response = await readData();
            if (response) {
                const datas = response.docs.map(item => {
                    let data = { ...item.data(), id: item.id };
                    return data;
                });
                setAllData(datas);

                const maxValue = Math.max(...datas.map(item => item.harga))
                const minValue = Math.min(...datas.map(item => item.harga))
                const dataValue = { ...priceRange, min: minValue, max: maxValue }
                setPriceRange(dataValue)

            }
        } catch (error) {
            console.error(error);
        }
    };


    // MEMFILTER DATA BERDASARKAN TYPE
    const handleFilterCategory = (selectedCategory) => {
        setCategory(selectedCategory)

        if (selectedCategory === 'all') {
            mapAllData()
        } else {
            const dataCategory = allData.filter(item => item.type === selectedCategory);
            console.log('data Category : ', dataCategory)
            setFilteredData(dataCategory);
        }
    }

    // // MEMFILTER DATA BERDASARKAN BRAND
    const handleFilterBrand = (selectedBrand) => {
        setSelectedBrand(selectedBrand);

        if (selectedBrand === 'all') {
            mapAllData();
        } else {
            const dataBrand = allData.filter(item => item.brand === selectedBrand);
            setFilteredData(dataBrand);
        }
    };

    const handleFilterPrice = (e) => {
        const selectedPrice = parseInt(e.target.value);
        setPrice(selectedPrice);

        const dataPrice = allData.filter(item => {
            if (item.type === category) {
                const dataCategory = item.type === category && item.harga <= price;
                setCategory(dataCategory)
            }
            else if (item.brand === selectedBrand) {
                return item.brand === selectedBrand && item.harga <= price;
            }
            else {
                return item.harga <= price;
            }
        })
        // console.log('dataPrice : ', dataPrice)
        setFilteredData(dataPrice)
    };


    return (
        <div className='flex w-full md:w-[1024px] h-max mt-24 mx-auto '>
            <div className='flex flex-col w-full'>

                {/* Filtered by Type Products */}
                <div className='mt-5'>
                    <h3>Filtered by type Product:</h3>
                    <div>==================</div>
                    <div className='flex gap-4'>
                        <button
                            onClick={() => handleFilterCategory('all')}
                            className='bg-blue-500 p-3 text-white'>All
                        </button>
                        <button
                            onClick={() => handleFilterCategory('laptop')}
                            className='bg-blue-500 p-3 text-white'>Laptop
                        </button>
                        <button
                            onClick={() => handleFilterCategory('phone')}
                            className='bg-blue-500 p-3 text-white'>phone
                        </button>
                    </div>
                </div>

                {/* Filtered by brand Products */}
                <div className='mt-5'>
                    <h3>Filtered by brand Product:</h3>
                    <div>==================</div>
                    <select
                        value={selectedBrand}
                        onChange={(e) => handleFilterBrand(e.target.value)}
                        className='px-5 outline-none border-[1px] border-black'>
                        <option
                            value="all">All
                        </option>
                        <option
                            value="lenovo">Lenovo
                        </option>
                        <option value="samsung">Samsung</option>
                        <option value="electronics">Electronics</option>
                    </select>
                </div>

                {/* Filter by Price */}
                <div className='mt-5'>
                    <h3>Filter by Price:</h3>
                    <h1>=====================</h1>
                    <h1>Value nya : {price || priceRange.max} </h1>
                    <input
                        type="range"
                        value={price}
                        min={priceRange.min}
                        max={priceRange.max}
                        onChange={handleFilterPrice}
                    />
                </div>

                {/* Reset Filter Button */}
                <button className='bg-red-500 text-white h-[40px] w-[150px] mt-5'>Reset Filter</button>

            </div>

            <div className='my-8'>
                <div className='flex flex-wrap gap-5 w-[700px] '>

                    <CardProduct data={filteredData} />
                </div>
            </div>
        </div>
    );
};

export default Coba;
