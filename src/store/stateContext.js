import React, { createContext, useEffect, useState } from "react";
import { readData } from '../service/service_firebase'

// buat context global
export const StateContext = createContext()

// Buat komponen provider untuk menyediakan state global
export const StateProvider = ({ children }) => {

    useEffect(() => {
        readDataFirebase()
    }, [])


    const [dataFirebase, setDataFirebase] = useState([])
    const [price, setPrice] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');


    const readDataFirebase = async () => {
        try {
            const response = await readData()

            if (response) {
                const datas = response.docs.map(item => {
                    // BUAT JADI OBJECT DATA DARI FIREBASE
                    let data = { ...item.data(), id: item.id }
                    // return data nya
                    return data;
                })

                setDataFirebase(datas);
                const maxValue = Math.max(...datas.map(item => item.harga))
                const minValue = Math.min(...datas.map(item => item.harga))
                setMinPrice(minValue)
                setMaxPrice(maxValue)
                setPrice(maxValue)

            }
        } catch (error) {
            console.error(error)
        }
    }


    const dataPrice = dataFirebase.filter(item => item.harga <= price)
    console.log('dataPrices', dataPrice)

    return (
        <StateContext.Provider value={{ price, setPrice, minPrice, setMinPrice, maxPrice, setMaxPrice, dataPrice, dataFirebase }}>
            {children}
        </StateContext.Provider>
    );
}