import { useState } from "react";
import { Link } from "react-router-dom";

function Coba() {


    const activeVerticalLine = ({ isActive }) => (isActive ? "border-l-red-500 border-l-[4px]  " : "");

    return (
        <div className="flex">
            <div className="mt-40 cursor-pointer p-4 flex flex-col gap-3">

                <Link to='/product' className={activeVerticalLine}>
                    <h1 className="ml-2" >&#8250;</h1>
                    <h1 >NAVBAR 1</h1>
                    <hr />
                </Link>


                <div className={`flex ${activeVerticalLine}`}>
                    <h1 className="ml-2" >&#8250;</h1>
                    <h1 >NAVBAR 2</h1>
                    <hr />
                </div>
            </div>

            <div id="product1">
                <h1>HElloWOrladsl</h1>
            </div>

        </div>
    )

}

export default Coba;

function Coba1() {

    return (
        <div>
            <h1>Coba 1</h1>
        </div>
    )
}
function Coba2() {

    return (
        <div>
            <h1>Coba 1</h1>
        </div>
    )
}
