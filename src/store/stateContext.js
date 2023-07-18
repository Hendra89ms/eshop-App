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

    // FILTER DATA BERDASARKAN INPUT TYPE RANGE
    const dataPrice = dataFirebase.filter(item => item.harga <= price)

    // FILTER BERDASARKAN NAMA LAPTOP DAN HARGANYA DARI INPUT TYPE RANGE
    const dataLaptop = dataFirebase.filter(item => item.type === 'laptop').filter(item => item.harga <= price)

    const dataElectronics = dataFirebase.filter(item => item.type === 'electronics').filter(item => item.harga <= price)

    const dataFashion = dataFirebase.filter(item => item.type === 'fashion').filter(item => item.harga <= price)

    const dataPhone = dataFirebase.filter(item => item.type === 'phone').filter(item => item.harga <= price)


    // FILTER DATA BERDASARKAN BRAND
    const dataLenovo = dataFirebase.filter(item => item.brand === 'lenovo').filter(item => item.harga <= price)

    const dataHp = dataFirebase.filter(item => item.brand === 'hp').filter(item => item.harga <= price)

    const dataSamsung = dataFirebase.filter(item => item.brand === 'samsung').filter(item => item.harga <= price)

    const dataOppo = dataFirebase.filter(item => item.brand === 'oppo').filter(item => item.harga <= price)

    const dataTechno = dataFirebase.filter(item => item.brand === 'techno').filter(item => item.harga <= price)

    return (
        <StateContext.Provider value={{ price, setPrice, minPrice, setMinPrice, maxPrice, setMaxPrice, dataPrice, dataFirebase, dataLaptop, dataElectronics, dataFashion, dataPhone, dataLenovo, dataHp, dataSamsung, dataOppo, dataTechno }}>
            {children}
        </StateContext.Provider>
    );
}