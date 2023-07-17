
import React, { useState } from 'react';

const Coba = () => {

    const data = [
        { id: 1, name: 'Product A', price: 5 },
        { id: 2, name: 'Product B', price: 10 },
        { id: 3, name: 'Product C', price: 15 },
        { id: 4, name: 'Product D', price: 20 }
    ];

    const maxValue = Math.max(...data.map(item => item.price))
    console.log('Max Value : ', maxValue)

    const [price, setPrice] = useState(maxValue); // State untuk menyimpan nilai harga
    const [maxPrice, setMaxPrice] = useState('')
    const [minPrice, setMinPrice] = useState('')

    const handleChange = (e) => {
        setPrice(e.target.value)

        const maxValue = Math.max(...data.map(item => item.price))
        console.log('data mAx : ', maxValue)
        setMaxPrice(maxValue)

        const minValue = Math.min(...data.map(item => item.price))
        setMinPrice(minValue)
    }

    // Memetakan data berdasarkan harga yang diatur
    const filteredData = data.filter(item => item.price <= price);


    return (
        <div className='mx-10 mt-24'>
            <input
                type="range"
                max={maxPrice}
                min={minPrice}
                value={price}
                onChange={handleChange}
            />
            <p>Selected Price: {price}</p>

            <h3>Filtered Data:</h3>
            <ul>
                {filteredData.map(item => (
                    <li key={item.id}>{item.name} - {item.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default Coba;



