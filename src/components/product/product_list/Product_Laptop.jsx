import React, { useEffect, useState } from 'react'
import { filterLaptop } from '../../../service/service_firebase'
import Card_Product from './Card_Product'

function Product_Laptop() {

    const [filterData, setFilterData] = useState([])

    useEffect(() => {
        getLaptop()
    }, [])

    const getLaptop = async () => {
        try {
            const response = await filterLaptop('laptop')
            const filter = response.docs.map(doc => {
                // BUAT JADI OBJECT DATA DARI FIREBASE
                let data = { ...doc.data(), id: doc.id }
                // return data nya
                return data;
            })

            console.log('filter : ', filter)

            setFilterData(filter)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            {
                filterData.map(item => {
                    console.log(item.name)
                    return (
                        <Card_Product
                            key={item.id}
                            name={item.name}
                            price={item.harga}
                            src={item.url}
                        />
                    )
                })
            }
        </div>
    )
}

export default Product_Laptop