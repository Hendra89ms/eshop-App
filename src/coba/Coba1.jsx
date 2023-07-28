import React, { useState } from 'react';

const initialData = [
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 }
];

function Coba1() {
    const [data, setData] = useState(initialData);
    const [mappedData, setMappedData] = useState([]);

    const addDataById = (id) => {
        const newData = data.find(item => item.id === id);
        const existingDataIndex = mappedData.findIndex(item => item.id === id);

        if (existingDataIndex !== -1) {
            // If data exists, update its value
            setMappedData(prevMappedData => {
                const updatedMappedData = [...prevMappedData];
                updatedMappedData[existingDataIndex].value += 1;
                return updatedMappedData;
            });
        } else {
            // If data doesn't exist, add it to mappedData
            setMappedData(prevMappedData => [...prevMappedData, { ...newData }]);
        }
    };


    return (
        <div className="mt-32 ml-10">
            <div id="data-container">
                {data.map(item => (
                    <div key={item.id}>
                        <p>ID: {item.id}, Value: {item.value}</p>
                        <button onClick={() => addDataById(item.id)}>Tambah Data</button>
                    </div>
                ))}
            </div>
            <div className='mt-5'>
                <h2>Data yang Dimap</h2>
                {mappedData.map(item => (
                    <div key={item.id}>
                        <p>ID: {item.id}, Value: {item.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Coba1;
