import { React, useEffect, useState } from 'react'
import db from '../firebase'
import { addDoc, onSnapshot, collection, doc, getDocs, Query, orderBy, Timestamp, query, deleteDoc } from 'firebase/firestore'
import SpinnerLoading from './SpinnerLoading'

export default function Chat() {
    const user = localStorage.getItem('user')
    const [foundUser, setFoundUser] = useState([])
    const [loading, setLoading] = useState(0)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState('')
    if (user === null) {
        window.location.href = '/'
    }
    // const time = Timestamp.now()

    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, "message")), (doc) => {
            getDocs(collection(db, "message"))
                .then((querySnapshot) => {
                    const newData = querySnapshot.docs
                        .map((doc) => ({ ...doc.data(), id: doc.id }));
                    setMessages(newData.sort(function (a, b) { return b.createdAt - a.createdAt }))
                    console.log(newData.sort(function (b, a) { return b.createdAt - a.createdAt }))
                    setLoading(1)
                })
        });

        getDocs(collection(db, "account"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                const foundUser2 = (newData.find(x => x.email == user))
                setFoundUser(foundUser2)
                // setLoading(1)
            })

    }, [])

    const addMessage = () => {
        addDoc(collection(db, 'message'), {
            content: message,
            createdAt: Timestamp.now().seconds,
            createdUser : foundUser.name
        })
    }

    const deleteMessage = (id2) => {
        console.log(id2)
        deleteDoc(doc(db, 'message', id2))
    }

    return (
        <div>
            {!loading ? <SpinnerLoading /> :
                <div>
                    {messages?.map((msg, id, createdAt) => (
                        <div>
                            <p key={id}>
                              {msg.createdUser} : {msg.content} { }
                            </p>
                            <button key={createdAt}  onClick={() => {deleteMessage(msg.id)}}>Delete</button>
                        </div>

                    ))}

                    {/* {
                        foundUser.email
                    }<br></br> */}
                    {localStorage.getItem('user')}<br></br>
                    <input onChange={evt => { setMessage(evt.target.value); }}></input><br></br>
                    <button className='button-18' onClick={addMessage}>Send</button>
                    {/* {messages} */}
                </div>
            }
        </div>
    )
}
