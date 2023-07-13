import React, { useEffect, useState } from 'react'
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom'
import RightTable from './RightTable'

function Product() {
    const location = useLocation()
    const navigate = useNavigate()

    const borderColor = "border-[orangeRed] border-l-4 px-1"

    const [activeLink, setActiveLink] = useState('/')

    const handleNavLinkClick = (path) => {
        setActiveLink(path);
    };

    useEffect(() => {
        if (activeLink === '/') {
            navigate('/')
        }
    }, [])


    return (
        <div id='products' className='w-full md:w-[1000px] mx-auto flex my-20 h-max'>
            <div className='flex-[0.2] '>
                {/* LEFT CONTAINER */}
                <aside >

                    {/* CATEGORY */}

                    <h1 className='text-xl font-semibold'>Categories</h1>

                    <div className='flex flex-col gap-2 mt-3'>

                        <NavLink
                            to='/'
                            onClick={() => handleNavLinkClick('/')}
                            className={activeLink === '/' ? borderColor : ""}>

                            <h1>&#8250; All</h1>

                        </NavLink>

                        <hr />

                        <NavLink
                            to='/laptop'
                            onClick={() => handleNavLinkClick('/laptop')}
                            className={activeLink === '/laptop' ? borderColor : ""}>
                            <h1> &#8250; Laptop</h1>
                            <hr />
                        </NavLink>

                        <NavLink
                            to='/electronics'
                            onClick={() => handleNavLinkClick('/electronics')}
                            className={activeLink === '/electronics' ? borderColor : ""}>
                            <h1 > &#8250; Electronics</h1>
                            <hr />
                        </NavLink>

                        <NavLink
                            to='/fashion'
                            onClick={() => handleNavLinkClick('/fashion')}
                            className={activeLink === '/fashion' ? borderColor : ""}>
                            <h1> &#8250; Fashion</h1>
                            <hr />
                        </NavLink>

                        <NavLink
                            to='/phone'
                            onClick={() => handleNavLinkClick('/phone')}
                            className={activeLink === '/phone' ? borderColor : ""}>
                            <h1> &#8250; Phone</h1>
                            <hr />
                        </NavLink>
                    </div>

                    {/* END CATEGORY */}

                    {/* BRAND */}
                    <div className='mt-3'>
                        <h1 className='text-xl font-semibold'>Brand</h1>
                        <select className='w-full flex justify-between border-[1px] border-gray-400 cursor-pointer p-1 mt-2 outline-none'>
                            <option>All</option>
                            <option>Lenovo</option>
                            <option>Hp</option>
                            <option>Samsung</option>
                            <option>oppo</option>
                            <option>Techno</option>
                        </select>
                    </div>
                    {/*END BRAND */}

                    {/* PRICE */}
                    <div className='mt-3'>
                        <h1 className='font-semibold text-xl'>Price</h1>
                        <h2>$5000</h2>
                        <input type="range" />
                    </div>
                    {/* PRICE */}
                    <button className='bg-[orangeRed] hover:bg-orange-700 text-white p-2 mt-4 rounded-md duration-300'>Clear Filters</button>

                </aside>
                {/* END LEFT CONTAINER */}


            </div>
            <div className=' flex-col flex-[0.9] flex ml-10 '>
                <RightTable />

                {/* PRODUCT LISTS */}
                <div className='' >
                    <Outlet />
                    {/* END PRODUCT LISTS */}
                </div>
            </div>


        </div >
    )
}

export default Product