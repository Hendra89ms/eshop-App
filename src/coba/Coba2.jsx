import React, { useState } from 'react';

const Coba2 = () => {
    const [filterHarga, setFilterHarga] = useState(0); // State untuk menyimpan nilai filter harga
    const [filterType, setFilterType] = useState(''); // State untuk menyimpan nilai filter type
    const [filterBrand, setFilterBrand] = useState(''); // State untuk menyimpan nilai filter brand

    const data = [
        { nama: 'Produk 1', harga: 150000, type: 'A', brand: 'Brand 1' },
        { nama: 'Produk 2', harga: 250000, type: 'B', brand: 'Brand 2' },
        { nama: 'Produk 3', harga: 50000, type: 'A', brand: 'Brand 1' },
        { nama: 'Produk 4', harga: 300000, type: 'C', brand: 'Brand 3' },
        { nama: 'Produk 5', harga: 750000, type: 'B', brand: 'Brand 2' },
        { nama: 'Produk 6', harga: 120000, type: 'A', brand: 'Brand 1' },
        { nama: 'Produk 7', harga: 180000, type: 'B', brand: 'Brand 2' },
        { nama: 'Produk 8', harga: 90000, type: 'C', brand: 'Brand 3' },
        { nama: 'Produk 9', harga: 500000, type: 'A', brand: 'Brand 1' },
        { nama: 'Produk 10', harga: 350000, type: 'B', brand: 'Brand 2' },
        { nama: 'Produk 11', harga: 70000, type: 'C', brand: 'Brand 3' },
        { nama: 'Produk 12', harga: 280000, type: 'A', brand: 'Brand 1' },
        { nama: 'Produk 13', harga: 220000, type: 'B', brand: 'Brand 2' },
        { nama: 'Produk 14', harga: 450000, type: 'C', brand: 'Brand 3' },
        { nama: 'Produk 15', harga: 650000, type: 'A', brand: 'Brand 1' },
        { nama: 'Produk 16', harga: 400000, type: 'B', brand: 'Brand 2' },
        { nama: 'Produk 17', harga: 80000, type: 'C', brand: 'Brand 3' },
        { nama: 'Produk 18', harga: 320000, type: 'A', brand: 'Brand 1' },
        { nama: 'Produk 19', harga: 280000, type: 'B', brand: 'Brand 2' },
        { nama: 'Produk 20', harga: 550000, type: 'C', brand: 'Brand 3' },
    ];


    // Fungsi untuk mengubah nilai filter harga saat terjadi perubahan pada input range
    const handleFilterHargaChange = (event) => {
        const priceRange = parseInt(event.target.value);
        setFilterHarga(priceRange);
    };

    // Fungsi untuk mengubah nilai filter type saat terjadi perubahan pada elemen select
    const handleFilterTypeChange = (event) => {
        const selectedType = event.target.value;
        setFilterType(selectedType);
    };

    // Fungsi untuk mengubah nilai filter brand saat tombol brand diklik
    const handleFilterBrandClick = (brand) => {
        setFilterBrand(brand);
    };

    // Fungsi untuk mereset semua filter ke nilai awal
    const handleResetFilters = () => {
        setFilterHarga(0);
        setFilterType('');
        setFilterBrand('');
    };

    // Lakukan filter pada array data berdasarkan nilai filter harga, type, dan brand yang dipilih
    const filteredData = data.filter(item => {
        const filterByHarga = filterHarga === 0 || item.harga < filterHarga;
        const filterByType = filterType === '' || item.type === filterType;
        const filterByBrand = filterBrand === '' || item.brand === filterBrand;
        return filterByHarga && filterByType && filterByBrand;
    });

    // Pagination

    const itemsPerPage = 5; // Jumlah item yang ditampilkan per halaman
    const [currentPage, setCurrentPage] = useState(1); // State untuk menyimpan halaman yang sedang aktif

    // Fungsi untuk mengatur halaman yang aktif
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Menghitung jumlah halaman berdasarkan jumlah data dan itemsPerPage
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    // Mengambil data yang sesuai dengan halaman yang sedang aktif
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    return (
        <div className='h-screen flex justify-center items-center flex-col gap-5 mt-56'>
            <h1>Daftar Produk</h1>
            {/* Elemen input range untuk memilih filter harga */}
            <input
                type="range"
                value={filterHarga}
                min={0}
                max={19000000} // Ubah sesuai range harga terbesar pada data produk
                step={10000} // Ubah sesuai langkah harga yang diinginkan
                onChange={handleFilterHargaChange}
            />
            <span>Rp{filterHarga}</span>

            {/* Elemen select untuk memilih filter type */}
            <select value={filterType} onChange={handleFilterTypeChange}>
                <option value="">Semua Type</option>
                <option value="A">Type A</option>
                <option value="B">Type B</option>
                <option value="C">Type C</option>
            </select>

            {/* Button untuk memilih filter brand */}
            <button onClick={() => handleFilterBrandClick('Brand 1')}>Brand 1</button>
            <button onClick={() => handleFilterBrandClick('Brand 2')}>Brand 2</button>
            <button onClick={() => handleFilterBrandClick('Brand 3')}>Brand 3</button>

            {/* Tombol Reset */}
            <button onClick={handleResetFilters}>Reset</button>

            {/* Tampilkan data yang sudah difilter */}
            <ul>
                {currentData.map((item, index) => (
                    <li key={index}>{item.nama} - Rp{item.harga} - Type {item.type} - Brand {item.brand}</li>
                ))}
            </ul>

            {/* Pagination */}
            <div>
                {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Coba2;
