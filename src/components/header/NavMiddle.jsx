import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function NavMiddle({ activeLink }) {

    const location = useLocation()

    return (
        <>
            <ul className='  hidden md:flex'>
                <li className='hover:text-[#ff7722] duration-300'>
                    <NavLink
                        to='/'
                        className={!['/contact', '/register', '/login'].includes(location.pathname) && activeLink}>
                        Home
                    </NavLink>
                </li>

                <li className='hover:text-[#ff7722] duration-300 ml-8'>
                    <NavLink
                        to='/contact'
                        className={location.pathname === "/contact" && activeLink}
                    >
                        Contact Us
                    </NavLink>
                </li>
            </ul>
        </>
    )
}

export default NavMiddle