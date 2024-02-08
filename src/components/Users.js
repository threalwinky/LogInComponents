import { React, useEffect, useState } from 'react'
import db from '../firebase'
import { onSnapshot, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import SpinnerLoading from './SpinnerLoading';
function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(0)
    const fetchPost = async () => {

        await getDocs(collection(db, "account"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setUsers(newData);
                setLoading(1)
                console.log(newData == '');
                // console.log(newData.find(x => x.email === "22").id);
                // deleteDoc(doc(db, 'account', newData.find(x => x.username === "vv3").id))
            })

    }
    
    useEffect(() => {
        fetchPost();
        
    }, [])
    return (
        <div className='App App-header'>
            {!loading ? <SpinnerLoading /> : <div>
                {
                    users?.map((user, id) => (
                        <p key={id}>
                            {user.name} { }
                            {user.email} { }
                            {user.password}
                        </p>
                    ))
                }
            </div>}

        </div>
    )

}

export default Users