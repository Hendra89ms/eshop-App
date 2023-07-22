import React, { useEffect, useState } from 'react'
import products from './dataProducts';

function Coba1() {

    const [data, setData] = useState(products);
    const [price, setPrice] = useState({ min: 0, max: 0 })
    const [rangeInput, setInputRange] = useState('');
    const [type, setType] = useState('all');
    const [brand, setBrand] = useState('all');

    const mappData = () => {
        setData(products)
        console.log(products)
    }

    useEffect(() => {
        mappData()
    }, [])

    useEffect(() => {
        const maxValue = Math.max(...data.map(item => item.harga))
        const minValue = Math.min(...data.map(item => item.harga))
        setPrice({ ...price, min: minValue, max: maxValue })
        // SET INPUT VALUE MENJADI NILAI DARI MAX HARGA
        setInputRange(maxValue)
    }, [])

    const handlePriceRange = (e) => {
        const priceRange = parseInt(e.target.value);
        // KETIKA DI ONCHANGE MAKA DATA BERUBAH MENJADI VALUE
        setInputRange(priceRange);

        // Menyimpan data awal ke variabel lokal
        const initialData = products;

        // Mengambil data yang sesuai dengan harga yang dipilih
        const filteredByHarga = initialData.filter(item => item.harga <= priceRange);

        // Mengambil data yang sesuai dengan tipe dan brand yang telah dipilih sebelumnya
        const filteredData = filteredByHarga.filter(item => {
            if (item.type === type) {
                return true
            }

            else if (item.brand === brand) {

            }
        });

        console.log('FILTER HARGA : ', filteredData)

    };

    const handleFilterCategory = (selectedType) => {
        setType(selectedType);

        // Memfilter data berdasarkan tipe dan harga saat input tipe dipilih
        const filteredData = products.filter((product) => {
            if (selectedType === 'all') {
                // Jika tipe 'All' dipilih, hanya filter berdasarkan harga
                return product.harga <= rangeInput;
            } else {
                // Jika tipe lain dipilih, filter berdasarkan tipe dan harga
                return product.type === selectedType && product.harga <= rangeInput;
            }
        });

        setData(filteredData);
        console.log('FILTER Category : ', filteredData)
    };

    const handleFilterSelect = (e) => {
        const selectedBrand = e.target.value;
        setBrand(selectedBrand);

        // Memfilter data berdasarkan tipe dan harga saat input tipe dipilih
        const filteredData = products.filter(item => {

            if (selectedBrand === 'all') {
                return item.brand <= rangeInput;
            }
            else {
                return item.brand === selectedBrand && item.harga <= rangeInput;
            }
        })
        setData(filteredData)
        console.log('FILTER SELECT : ', filteredData)

    };

    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <div className='flex flex-col'>

                <div className='flex gap-4 my-5'>
                    <button onClick={() => handleFilterCategory('all')} className='bg-blue-500 text-white p-3'>
                        All
                    </button>
                    <button
                        onClick={() => handleFilterCategory('laptop')}
                        className='p-3 bg-blue-500 text-white' >
                        Laptop
                    </button>
                    <button
                        onClick={() => handleFilterCategory('phone')}
                        className='p-3 bg-blue-500 text-white'
                    >Phone
                    </button>
                </div>

                <div className='my-5'>
                    <select
                        value={brand}
                        onChange={handleFilterSelect}
                        className='outline-none border-[1px] border-black w-full'
                    >
                        <option value='all'>All</option>
                        <option value="lenovo">Lenovo</option>
                        <option value="electronics">Electronics</option>
                    </select>
                </div>

                <h1>{rangeInput || price.min}</h1>
                <input
                    value={rangeInput}
                    min={price.min}
                    max={price.max}
                    type="range"
                    onChange={handlePriceRange}
                />

            </div>
        </div>
    );
}

export default Coba1;
