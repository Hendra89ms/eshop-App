import React from 'react'

function CardProduct({ name, harga, type, brand, widthSelect }) {


    return (
        <>
            <div
                className={`w-[200px] p-5 md:w-${widthSelect} border-[1px] border-black h-[200px]`}>
                <h1>Name : {name} </h1>
                <div>Type :  {type}</div>
                <div>Harga : {harga}</div>
                <hr />
                <div>Brand : {brand}</div>
            </div>
        </>
    )
}

export default CardProduct;