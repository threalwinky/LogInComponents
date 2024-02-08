import { React, useEffect, useState } from 'react'
import db from '../firebase'
import { addDoc, onSnapshot, collection, doc, getDocs } from 'firebase/firestore'
import SpinnerLoading from './SpinnerLoading'

//Google authenticator
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();
const auth = getAuth();

var GoogleAuthentication = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user)
            // localStorage.setItem('user', '2')

            getDocs(collection(db, "account"))
                .then((querySnapshot) => {
                    const newData = querySnapshot.docs
                        .map((doc) => ({ ...doc.data(), id: doc.id }));
                    const userEmail = user.email + '2'
                    // console.log(typeof userEmail)
                    // console.log(user.email+'2');
                    // console.log(newData.find(x => x.email === userEmail));
                    // deleteDoc(doc(db, 'account', newData.find(x => x.username === "vv3").id))
                    if (newData.find(x => x.email === userEmail) == null) {
                        console.log(123456)
                        const docRef =

                                addDoc(collection(db, "account"), {
                                    name: user.displayName,
                                    email: String(userEmail),
                                    password: "123456",
                                    products: 0,
                                    avatar: user.photoURL
                                });
   
                            setTimeout(() => {
                                localStorage.setItem('user', userEmail)
                                window.location.href = '/dashboard'
                            }, 500)
                        
                        // console.log('Account created')
                        // localStorage.setItem('user', userEmail)
                    }
                    else {
                        console.log(12345)
                        localStorage.setItem('user', userEmail)
                        window.location.href = '/dashboard'
                    }

                })

            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}


var LogOut = () => {
    localStorage.removeItem('user')
    SignInRedirect()
}
var SignInRedirect = () => {
    window.location.href = '/signin'
}
var SignUpRedirect = () => {
    window.location.href = '/signup'
}
var UsersRedirect = () => {
    window.location.href = '/users'
}
var DashboardRedirect = () => {
    window.location.href = '/dashboard'
}
export default function Home() {
    const user = localStorage.getItem('user')
    const [loading, setLoading] = useState(0)
    // console.log(123)
    if (user !== null) {
        window.location.href = '/dashboard'
    }
    useEffect(() => {
        setLoading(1)
    }, [])
    return (
        <div>
            {!loading ? <SpinnerLoading /> : <div className='App-header'>
                <button className='button-18' onClick={SignInRedirect}>Sign In</button>
                <button className='button-18' onClick={SignUpRedirect}>Sign Up</button>
                <button className='button-18' onClick={UsersRedirect}>Users</button>
                <button className='button-18' onClick={GoogleAuthentication}>Sign In with google</button>
            </div>}



        </div>
    )
}