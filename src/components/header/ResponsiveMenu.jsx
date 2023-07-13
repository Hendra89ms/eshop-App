import React, { useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { FaTimes } from 'react-icons/fa'
import { FaUserCircle } from 'react-icons/fa'

function ResponsiveMenu({ hideMenu, setShowMenu, displayName, activeLink, logOutUser }) {

    // PROPS hideMenu = sebuah function untuk menghilangkan modal
    // PROPS setShowMenu = sebuah dispatch state untuk menset ke false juga menghilangkan modal  

    const modalRef = useRef(null);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setShowMenu(false);
        }
    };


    return (
        <div className='w-full bg-[#00000080] fixed top-0 left-0 right-0 bottom-0 z-[97] md:hidden' onClick={handleClickOutside} >
            <div className='w-[250px] bg-[#0a1930] h-screen px-4 p-2' ref={modalRef} >

                <div className='flex flex-col gap-6 '>
                    <div className='flex my-3 justify-between' >
                        <Link to={'/'} onClick={hideMenu} >
                            <h2 className='text-2xl'>
                                e<span className='text-[#ff7722] select-none '>Shop</span>.
                            </h2>
                        </Link>

                        <FaTimes size={26} onClick={hideMenu} className='cursor-pointer hover:text-[#ff7722]' />
                    </div>

                    <a onClick={hideMenu} href="#home" className='flex items-center gap-1 text-[#ff7722]'>
                        <FaUserCircle size={16} />
                        Hi, <span className='truncate max-w-[100px]'>{displayName}</span>
                    </a>

                    <NavLink
                        onClick={hideMenu}
                        to='/order-history'
                        className={activeLink}>
                        <h1 className='hover:text-[#ff7722] cursor-pointer duration-300'>My Orders</h1>
                    </NavLink>

                    <NavLink
                        // onClick={hideMenu}
                        onClick={logOutUser}>
                        <h1 className='hover:text-[#ff7722] cursor-pointer duration-300'>LogOut</h1>
                    </NavLink>



                    <NavLink
                        onClick={hideMenu}
                        to='/login'
                        className={activeLink}>
                        <h1 className='hover:text-[#ff7722] cursor-pointer  duration-300'>Login</h1>
                    </NavLink>

                    <NavLink
                        onClick={hideMenu}
                        to='/register'
                        className={activeLink}>
                        <h1 className='hover:text-[#ff7722] cursor-pointer duration-300'>Register</h1>
                    </NavLink>


                    <div className='flex items-center hover:text-[#ff7722] '>

                        <NavLink
                            style={{ position: 'relative', display: 'flex' }}
                            to='/cart'
                            className={({ isActive }) => isActive ? 'text-[#ff7722]' : ''}
                            onClick={hideMenu}>
                            <span >Cart</span>
                            <FaShoppingCart fontSize={20} />
                            <span className='absolute top-[-8px] right-[-10px]'>0</span>
                        </NavLink>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResponsiveMenu