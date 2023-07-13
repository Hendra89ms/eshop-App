import { collection, addDoc, getDocs, limit, orderBy, startAfter, query, where } from 'firebase/firestore'
import { db } from '../firebase_config'

const collectionRef = collection(db, 'eshopApp')

export const createData = (newData) => {
    return addDoc(collectionRef, newData)
}

export const readData = () => {
    const queryRef = query(collectionRef, orderBy('name'))

    return getDocs(queryRef)
}

export const paginationData = (sizePage, lastDoc) => {
    // BATASI DATA YANG MUNCUL 
    let queryRef = query(collectionRef, orderBy('name'), limit(sizePage))

    if (lastDoc) {
        queryRef = startAfter(queryRef, lastDoc)
    }

    return getDocs(queryRef)
}

export const filterLaptop = () => {
    let queryRef = query(collectionRef, where('laptop', '==', true))
    return getDocs(queryRef)
}