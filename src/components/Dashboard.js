import { React, useEffect, useState } from 'react'
import db from '../firebase'
import { addDoc, onSnapshot, collection, doc, getDocs } from 'firebase/firestore'
import SpinnerLoading from './SpinnerLoading'
var LogOut = () => {
    localStorage.removeItem('user')
    window.location.href = '/'
}

var StoreRedirect = () => {
    window.location.href = '/store'
}

var ChatRedirect = () => {
    window.location.href = '/chat'
}

export default function Dashboard() {
    const user = localStorage.getItem('user')
    const [loading, setLoading] = useState(0)
    const [foundUser, setFoundUser] = useState({avatar:'1'})

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

    

    return (
        <div className='App-header'>
            {!loading ? <SpinnerLoading/> : <div>
            <div>

                <iframe src='https://main--magenta-stroopwafel-e74e4e.netlify.app/'></iframe>

                <img src={foundUser.avatar}/>
                Hello {user} {foundUser.email}
            </div>
            <div >
            <button className='button-18' onClick={StoreRedirect}>Store</button>
            <button className='button-18' onClick={ChatRedirect}>Chat</button>
            <button className='button-18' onClick={LogOut}>Log out</button>
            </div>
            
            </div>}
        </div>
    )
}