import { React, useEffect, useState } from 'react'
import db from '../firebase'
import { addDoc, onSnapshot, collection, doc, getDocs } from 'firebase/firestore'

function SignIn() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const checkUser = async (e) => {
        e.preventDefault();
        try {
            await getDocs(collection(db, "account"))
                .then((querySnapshot) => {
                    const newData = querySnapshot.docs
                        .map((doc) => ({ ...doc.data(), id: doc.id }));

                    const foundUser = (newData.find(x => x.email == email))
                    console.log(foundUser)
                    if (foundUser !== undefined) {
                        if (password !== foundUser.password) {
                            window.alert('Wrong password')
                        }
                        else {
                            console.log('right')
                            localStorage.setItem('user', foundUser.email)
                            window.location.href = '/dashboard'
                        }
                    }
                    else {
                        window.alert('Account not found')
                    }
                })

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (

        <div className='App App-header'>
            <input type='text' onChange={e => setEmail(e.target.value)} id="email" placeholder="Email" />
            <input type='password' onChange={e => setPassword(e.target.value)} id='password' placeholder="Password" />
            <button onClick={checkUser}>Sign In</button>
        </div>
    )
}

export default SignIn