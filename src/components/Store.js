import { React, useEffect, useState } from 'react'
import db from '../firebase'
import { addDoc, onSnapshot, collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import SpinnerLoading from './SpinnerLoading'

export default function Store(){
    const user = localStorage.getItem('user')
    const [foundUser, setFoundUser] = useState({avatar:'1'})
    const [loading, setLoading] = useState(0)
    const [products, setProducts] = useState(0)
    if (user === null) {
        window.location.href = '/'
    }

    useEffect(() => {
        getDocs(collection(db, "account"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                const foundUser2 = (newData.find(x => x.email ==  user ))
                setFoundUser(foundUser2)
                console.log(foundUser2)
                setLoading(1)
                
            })
    }, [])

    const changeProducts = () => {
        console.log(products)
        getDocs(collection(db, "account"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                const foundUser2 = (newData.find(x => x.email ==  user ))
                console.log(foundUser2.id)
                updateDoc(doc(db, 'account', foundUser2.id) , {
                    'products' : products
                })
            })
    }

    return(
        <div className='App-header'>
            {!loading ? <SpinnerLoading/> : <div>
                {/* {foundUser.products} */}
                <div style={{display: 'grid'}}>
                {products}
                <button onClick={()=>{setProducts(products + 1)}}>Tang</button>
                <button onClick={()=>{setProducts(products - 1)}}  disabled={products == 0}>Giam</button>
                <button onClick={changeProducts} >Xac nhan</button>
                </div>
            </div>}
        </div>
    )
}