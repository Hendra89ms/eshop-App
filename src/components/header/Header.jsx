import React, { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom'
import { FaShoppingCart } from 'react-icons/fa'
import { HiOutlineMenuAlt3 } from 'react-icons/hi'
import ResponsiveMenu from './ResponsiveMenu'
import { auth } from '../../firebase_config'
import { signOut, onAuthStateChanged, getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'
import { Loader } from '../loader'
import NavMiddle from './NavMiddle'
import NavRight from './NavRight'


function Header() {
    const [displayName, setDisplayName] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const auth = getAuth()

    useEffect(() => {

        // MEMONITOR PENGGUNA YANG LOGIN SAAT INI
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // const uid = user.uid;
                // console.log(user)

                if (user.displayName === null) {
                    // const u1 = user.email.substring(0, user.email.indexOf('@'));
                    // const uName = u1.charAt(0).toUpperCase() + u1.slice(1)
                    return setDisplayName(user.email)
                }
                setDisplayName(user.displayName)
                setIsLogin(true)
            }
            else {
                setDisplayName('')

            }
        })
        // END  MEMONITOR PENGGUNA YANG LOGIN SAAT INI
    }, [displayName])

    const [showMenu, setShowMenu] = useState(false)
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const hideMenu = () => {
        setShowMenu(false)
    }

    const location = useLocation()
    const activeLink = "border-b-[2px] border-b-white";

    const logOutUser = () => {

        setIsLoading(true)

        signOut(auth).then(() => {
            setIsLoading(false)
            toast.success("LogOut Successfully")
            setIsLogin(false)
            hideMenu()
            navigate('/')
        }).catch((error) => {
            toast.error(error.message)
        });
    }


    return (
        <>
            {isLoading && <Loader />}
            <div className="w-full fixed top-0 left-0 bg-[#0a1930] text-white flex justify-center z-[99]" >
                <div className="w-[1000px] h-[80px] mx-auto flex justify-between items-center">

                    <Link to={'/'}>
                        <h2 className='text-2xl'>
                            e<span className='text-[#ff7722] '>Shop</span>.
                        </h2>
                    </Link>

                    <NavMiddle activeLink={activeLink} />

                    <div className='flex '>
                        <div className='md:flex hidden items-center gap-5' >
                            {
                                isLogin ? (
                                    <NavRight
                                        activeLink={activeLink}
                                        displayName={displayName}
                                        logOutUser={logOutUser}
                                    />
                                ) :
                                    <>
                                        <NavLink
                                            to='/login'
                                            className={location.pathname == "/login" && activeLink}>
                                            <h1 className='hover:text-[#ff7722] cursor-pointer  duration-300'>Login</h1>
                                        </NavLink>

                                        <NavLink
                                            to='/register'
                                            className={location.pathname == "/register" && activeLink}>
                                            <h1 className='hover:text-[#ff7722] cursor-pointer duration-300'>Register</h1>
                                        </NavLink>
                                    </>
                            }

                        </div>


                        <div className='flex items-center gap-5 ml-4 '>
                            <NavLink to='/cart' className={({ isActive }) => isActive ? 'text-[#ff7722]' : ''}>
                                <h1 className=' cursor-pointer duration-300 md:flex hidden'>
                                    <div className='flex items-center hover:text-[#ff7722] '>
                                        <span className=''>Cart</span>
                                        <div className='relative '>
                                            <FaShoppingCart fontSize={20} />
                                            <span className='absolute top-[-10px] right-[-10px] text-orange-500 font-bold'>0</span>
                                        </div>
                                    </div>
                                </h1>
                            </NavLink>

                            <div className='hover:text-[#ff7722] cursor-pointer md:hidden flex' onClick={toggleMenu}>

                                <HiOutlineMenuAlt3 size={26} />

                            </div>

                        </div>

                        {
                            showMenu && (
                                <>
                                    <ResponsiveMenu
                                        hideMenu={hideMenu}
                                        setShowMenu={setShowMenu}
                                        displayName={displayName}
                                        activeLink={activeLink}
                                        logOutUser={logOutUser}
                                    />
                                </>
                            )
                        }
                    </div>

                </div>

            </div>
        </>
    )
}

export default Header;