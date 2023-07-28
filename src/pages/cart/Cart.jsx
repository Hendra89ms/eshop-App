import React, { useContext, useEffect } from "react";
import { BsArrowLeft } from 'react-icons/bs'
import { Link } from "react-router-dom";
import { AiFillDelete } from 'react-icons/ai'
import { StateContext } from '../../store/stateContext'

function Cart() {

    const { cartData, formatToRupiah } = useContext(StateContext)


    return (
        <div className="mt-28 mb-10">
            <div className="flex justify-center items-center">
                <div className="w-[1000px] ">
                    <h1 className="text-3xl">Shopping Cart</h1>

                    <div className="overflow-x-auto mt-8">
                        <table className="w-full border-[1px] border-slate-400">
                            <thead>
                                <tr className="border-b-slate-400 border-b-[1px]">
                                    <th className="px-4 py-2">s/n</th>
                                    <th className="px-4 py-2">Product</th>
                                    <th className="px-4 py-2">Price</th>
                                    <th className="px-4 py-2">Quantity</th>
                                    <th className="px-4 py-2">Total</th>
                                    <th className="px-4 py-2">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    cartData.length === 0 ? <tr>Add Your Cart</tr> :
                                        cartData.map((item, index) => {

                                            return (
                                                <tr key={index} className="my-5 border-b-[1px] border-b-slate-400">
                                                    <td className="px-4 py-2 text-center">{index + 1}</td>
                                                    <td className="px-4 py-2 text-center">
                                                        <div className="flex flex-col gap-2 justify-center items-center">
                                                            <div>{item.name}</div>
                                                            <img
                                                                className="w-[70px] h-[70px]"
                                                                src={item.url}
                                                                alt={item.name} />
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-2 text-center">Rp {formatToRupiah(item.harga)}</td>
                                                    <td className="px-4 py-2 text-center">{item.quantity}</td>
                                                    <td className="px-4 py-2 text-center">Rp {formatToRupiah(item.total)}</td>
                                                    <td className="px-4 py-2 text-center cursor-pointer text-red-500">
                                                        <AiFillDelete size={20} />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                }

                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between w-full mt-5">
                        <button className="bg-orange-600 w-[130px] h-[40px] text-white rounded-md ">Clear Cart</button>

                        <div>
                            <Link to='/' className="flex items-center gap-2 hover:text-orange-500 duration-300">
                                <BsArrowLeft />
                                <h1>Continue Shopping</h1>
                            </Link>

                            <div className="mt-2 w-[400px] flex flex-col gap-3">
                                <h1>Cart Items(s):{cartData.length}</h1>
                                <div className="flex justify-between text-2xl">
                                    <h1>Subtotal</h1>
                                    <div className="text-orange-500">RP 520.000</div>
                                </div>
                                <p>Taxes and shipping calculated at checkout</p>
                                <button className="w-full bg-blue-500 hover:bg-blue-600 duration-300 text-white p-2 rounded-md ">CheckOut</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
