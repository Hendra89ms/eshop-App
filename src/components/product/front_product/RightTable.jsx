import React, { useState, useEffect, useContext } from 'react'
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from '../product_list/Search';
import { StateContext } from '../../../store/stateContext';

function RightTable() {

    const { sortBy, arrLength, filterName, filterByName, sortedValue, handleStyleGrid, handleStyleFlex } = useContext(StateContext)

    return (
        <>
            <div className='flex justify-between pb-4 '>

                <div className='flex gap-2 items-center '>
                    <BsFillGridFill
                        onClick={handleStyleGrid}
                        className='cursor-pointer'
                        color="orangered"
                        size={22} />

                    <FaListAlt
                        onClick={handleStyleFlex}
                        className='cursor-pointer'
                        size={24}
                        color="#0066d4" />

                    <h1 className='font-semibold'>{arrLength}</h1>
                    <p>Products Found</p>
                </div>

                {/* KOMPONENT SEARCH */}
                <Search value={filterName} onChange={filterByName} />
                {/* END KOMPONENT SEARCH */}

                <div>
                    Sort by : <select
                        onChange={sortBy}
                        value={sortedValue}
                        className='cursor-pointer border-none outline-none'>
                        <option value="latest">Latest</option>
                        <option value="Lowest Price">Lowest Price</option>
                        <option value="Highest Price">Highest Price</option>
                        <option value="A - Z">A - Z</option>
                        <option value="Z - A">Z - A</option>
                    </select>
                </div>
            </div>
            <hr />
        </>
    )
}

export default RightTable;