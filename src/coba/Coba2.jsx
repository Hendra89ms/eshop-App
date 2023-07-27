import React, { useState } from 'react';

function Coba2() {
    // State untuk mengecek style button 1
    const [isStyleA, setIsStyleA] = useState(true);

    // State untuk mengecek style button 2
    const [isStyleB, setIsStyleB] = useState(false);

    // Data yang akan di-mapping
    const data = ['Data 1', 'Data 2', 'Data 3'];

    // Fungsi untuk mengubah style button 1
    const toggleStyleA = () => {
        setIsStyleA(true);
        setIsStyleB(false);
    };

    // Fungsi untuk mengubah style button 2
    const toggleStyleB = () => {
        setIsStyleA(false);
        setIsStyleB(true);
    };

    return (
        <div className='mt-32 ml-3'>
            <button onClick={toggleStyleA}>Button 1</button>
            <button onClick={toggleStyleB}>Button 2</button>
            <div className="flex">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className={`p-4 m-2 ${isStyleA ? 'bg-blue-500 w-[200px]' : isStyleB ? 'bg-red-500' : ''
                            }`}
                    >
                        {item}
                        <div className={`p-4 m-2 ${isStyleA ? 'bg-yellow-500' : 'bg-white'}`}>
                            Div 2
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Coba2;
