import React from 'react'

function CardProduct({ data }) {

    return (
        <>
            {
                data.length === 0 ? <h1>Loading....</h1>
                    : data.map((item, index) => {
                        return (
                            <div key={index} className='border-[1px] border-black w-[200px] h-[200px]'>
                                <h1>Name : {item.name} </h1>
                                <div>Type :  {item.type}</div>
                                <div>Harga {item.harga}</div>
                                <hr />
                                <div>Brand : {item.brand}</div>
                            </div>

                        )
                    })
            }
        </>
    )
}

export default CardProduct;