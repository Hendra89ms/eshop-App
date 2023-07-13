import React from 'react'

function Card_Product({ nameProduct, harga, src }) {

    return (
        <div>
            <img src={src} alt={nameProduct} />
            <div>
                <h1>{nameProduct}</h1>
                <p>{harga}</p>
            </div>
        </div>
    )
}

export default Card_Product