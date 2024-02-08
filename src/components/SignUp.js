import { React, useEffect, useState } from 'react'
import db from '../firebase'
import { addDoc, onSnapshot, collection, doc, getDocs } from 'firebase/firestore'

function SignUp() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rpassword, setRpassword] = useState('')
    const addUser = async (e) => {
        e.preventDefault();
        try {

            if (password !== rpassword) {
                window.alert(`Password don't match`)
            }
            else {
                await getDocs(collection(db, "account"))
                    .then((querySnapshot) => {
                        const newData = querySnapshot.docs
                            .map((doc) => ({ ...doc.data(), id: doc.id }));

                        const foundUser = (newData.find(x => x.email == email))
                        console.log(foundUser)
                        if (foundUser !== undefined) {
                            window.alert('Email have been taken')
                        }
                        else {
                            const docRef = addDoc(collection(db, "account"), {
                                name,
                                email,
                                password,
                                products : 0,
                                avatar : "https://i.pinimg.com/564x/88/68/d7/8868d7b09e6eff73db538eee5e077816.jpg"
                            });
                            console.log('Account created')
                            window.alert('Account created')
                        }
                        // deleteDoc(doc(db, 'account', newData.find(x => x.username === "vv3").id))
                    })
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    return (
        <div className='App App-header'>
            {(name == 'sss')}
            <input type='text' onChange={e => setName(e.target.value)} id="name" placeholder="Name" />
            <input type='email' onChange={e => setEmail(e.target.value)} id="email" placeholder="Email" />
            <input type='password' onChange={e => setPassword(e.target.value)} id='password' placeholder="Password" />
            <input type='password' onChange={e => setRpassword(e.target.value)} id='rpassword' placeholder="Repeat Password" />
            <button onClick={addUser}>Sign Up</button>
        </div>
    )
}

export default SignUp