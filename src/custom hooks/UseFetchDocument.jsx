// import React, { useEffect, useState } from 'react'
// import { doc, getDoc } from 'firebase/firestore'
// import { db } from '../firebase_config'

// function UseFetchDocument(collectionName, documentID) {
//     const [document, setDocument] = useState(null)

//     const getDocument = async () => {
//         const docRef = doc(db, collectionName, documentID);
//         const docSnap = await getDoc(docRef)

//         if (docSnap.exists()) {
//             console.log(docSnap.data());
//         }
//         else {
//             console.log('DATA TIDAK DITEMUKAN')
//         }

//     }

//     useEffect(() => {
//         console.log(db)
//     }, [])

//     return (
//         <div>
//             <h1>COntent</h1>
//         </div>
//     )
// }

// export default UseFetchDocument