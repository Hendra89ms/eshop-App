import React from 'react'
import { Link } from 'react-router-dom';

function AdminOnlyRoute({ children }) {

    // if (userEmail === "hendra89ms@gmail.com") {
    //     return children;
    // }

    return (
        <section className='h-screen flex justify-center items-center bg-black fixed top-0 left-0 right-0 z-[999] px-2'>
            <div className="border-white border-[1px] md:p-5 px-2  py-4 rounded-md">
                <h2 className='text-red-500 text-2xl'>Permission Denied !!!</h2>
                <p className='text-green-500'>This page can only be view by an Admin user.</p>
                <br />
                <Link to="/">
                    <button className="text-white animate-pulse hover:text-green-500 duration-300 ease-in-out">&larr; Back To Home</button>
                </Link>
            </div>
        </section>
    )
}


export const AdminOnlyLink = ({ children }) => {

    // if (userEmail === "test@gmail.com") {
    //     return children;
    // }
    // return null;
};

export default AdminOnlyRoute