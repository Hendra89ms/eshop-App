import React from 'react'
import { BiSearch } from "react-icons/bi";

function Search({ value, onChange }) {

    return (
        <div className='flex items-center gap-1 border-gray-400 p-2 border-[1px] rounded-md'>
            <BiSearch size={18} />
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder='Search by name'
                className='border-none outline-none bg-none'
            />
        </div>
    )
}

export default Search