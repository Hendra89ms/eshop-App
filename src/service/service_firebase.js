import { collection, addDoc, getDocs, limit, orderBy, startAfter, query, setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase_config'

const collectionRef = collection(db, 'eshopApp')

// Fungsi untuk menambahkan properti baru ke dalam dokumen yang sudah ada
// const updateDataWithNewProp = async () => {
//     try {
//         const querySnapshot = await getDocs(collectionRef);
//         querySnapshot.forEach((item) => {
//             const docRef = doc(db, "eshopApp", item.id);
//             const newData = {
//                 ...item.data(), // Ambil data dari dokumen
//                 description: "Nilai baru untuk properti baruLorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus commodi minima, dolorem vel libero vero. Velit rerum debitis distinctio eligendi.", // Tambahkan properti baru
//             };

//             // console.log('newData : ', newData)
//             setDoc(docRef, newData); // Update dokumen dengan data yang sudah diupdate
//         });
//         console.log('Data berhasil diupdate');
//     } catch (error) {
//         console.error('Error saat mengupdate data:', error);
//     }
// };

// // Panggil fungsi untuk mengupdate data dengan properti baru
// updateDataWithNewProp();


export const createData = (newData) => {
    return addDoc(collectionRef, newData)
}

export const readData = () => {
    const queryRef = query(collectionRef, orderBy('name'))

    return getDocs(queryRef)
}