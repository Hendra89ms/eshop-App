import React from 'react'
import LoaderImg from '../../assets/loader.gif'
import ReactDOM from 'react-dom'

function Loader() {

    return ReactDOM.createPortal(
        <div className='flex justify-center items-center w-full h-screen bg-[#00000080] fixed left-0 top-0 right-0 bottom-0 z-[999]' >
            <img src={LoaderImg} alt="loader" />
        </div>,
        document.getElementById("loader")
    )
}

export default Loader