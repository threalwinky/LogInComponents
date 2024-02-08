import { React, useEffect, useState } from 'react'
import db from '../firebase'
import { addDoc, onSnapshot, collection, doc, getDocs } from 'firebase/firestore'
import SpinnerLoading from './SpinnerLoading'
var LogOut = () => {
    localStorage.removeItem('user')
    window.location.href = '/'
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
        <div>
            {!loading ? <SpinnerLoading/> : <div>
            <div>
                <img src={foundUser.avatar}/>
                Hello {user} {foundUser.email}
            </div>
            <button className='button-18' onClick={LogOut}>Log out</button>
            </div>}
        </div>
    )
}