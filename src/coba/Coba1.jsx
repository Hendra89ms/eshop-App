import React, { useState, useEffect } from 'react';

function Coba1() {
    const [data, setData] = useState([
        { id: 1, name: 'Product A', price: 10, quantity: 2, total: 20 },
        { id: 2, name: 'Product B', price: 15, quantity: 3, total: 45 },
        { id: 3, name: 'Product C', price: 20, quantity: 1, total: 20 }
    ]);

    const [overallTotal, setOverallTotal] = useState(0);

    const total = data.reduce((acc, item) => acc + item.total, 0);
    console.log('total : ', total)
    // setOverallTotal(total)

    // useEffect(() => {
    //     // Calculate the overall total by summing up 'total' from each item

    //     setOverallTotal(total);
    // }, [data]);

    return (
        <div className='mt-32'>
            {/* Display overallTotal wherever you need it in your component */}
            <p>Overall Total: {total}</p>
        </div>
    );
}

export default Coba1;
