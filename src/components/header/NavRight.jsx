import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'

function NavRight({ activeLink, displayName, logOutUser }) {

    const location = useLocation()

    return (
        <>
            <a href="#home" className='flex items-center gap-1 text-[#ff7722]'>
                <FaUserCircle size={16} />
                Hi, <span className='truncate max-w-[100px]'>{displayName}</span>
            </a>

            <NavLink
                to='/order-history'
                className={location.pathname == "/order-history" && activeLink}>
                <h1 className='hover:text-[#ff7722] cursor-pointer duration-300'>My Orders</h1>
            </NavLink>

            <NavLink onClick={logOutUser}>
                <h1 className='hover:text-[#ff7722] cursor-pointer duration-300'>LogOut</h1>
            </NavLink>
        </>
    )
}

export default NavRight