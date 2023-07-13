import React, { useState } from 'react'
import { createData } from '../service/service_firebase'

function InputToFIrebase() {

    const [name, setName] = useState('')
    const [harga, setHarga] = useState(0)
    const [url, setUrl] = useState('')
    const [isOnfocus, setIsOnfocus] = useState(false)

    const handleFocus = () => {
        setIsOnfocus(true);
    };

    const handleBlur = () => {
        setIsOnfocus(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (name.length === 0 || harga.length === 0 || url.length === 0) {
            return alert('You MUst Input data')
        }

        const data = {
            name, harga, url
        }

        try {
            const response = await createData(data)
            if (response) {
                alert('Data Sukses DiTambahkan!')
            }
        } catch (error) {
            console.error(error)
        }

        setName('')
        setHarga('')
        setUrl('')

    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <form
                onSubmit={handleSubmit}
                className='md:w-[400px] w-[350px] shadow-md p-4 rounded-md animate-slide-up duration-500 z-[90]'>

                <h1 className='text-center text-3xl mb-6 text-[orangered] font-semibold'>InputToFIrebase</h1>

                <div className='flex flex-col gap-3'>
                    <input
                        type="text"
                        autoFocus
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={name.toLocaleLowerCase()}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='name'
                        className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md' />

                    {name.length === 0 && isOnfocus ? (
                        <div className='text-red-500 text-sm'>You must input Data</div>
                    ) : ""}

                    <div className=' w-full'>
                        <input
                            type='number'
                            value={harga}
                            onChange={(e) => setHarga(e.target.value)}
                            className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md w-full'
                        />
                        {harga.length === 0 ? (
                            <div className='text-red-500 text-sm'>You must input Data</div>
                        ) : ""}
                    </div>

                    <div className=' w-full'>
                        <input
                            type='url'
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder='Link Image'
                            className='border-[1.5px] border-[#3333] outline-none p-2 rounded-md w-full'
                        />
                    </div>

                    <button type='submit' className='bg-[#1f93ff] text-white p-1.5 rounded-md hover:bg-[#167dde] duration-300 '>Submit</button>
                </div>

            </form>
        </div>
    )
}

export default InputToFIrebase