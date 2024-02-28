import React, { useState, useEffect } from 'react';
import { useParams, } from 'react-router-dom';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';

function TextView() {
    const { secretId } = useParams();
    const [message, setMessage] = useState('');
    const [viewed, setViewed] = useState(false);
   
    useEffect(() => {
       const fetchAndDeleteSecretMessage = async () => {
         const docRef = doc(db, 'secrets', secretId);
         const docSnap = await getDoc(docRef);
   
         if (docSnap.exists()) {
          await updateDoc(docRef, {viewed: true})
  
           setMessage(docSnap.data().content);
  
           setTimeout(() => {
            setViewed(true);
          }, 5000);
         } else {
           console.log('No such document!');
           
         }
       };
   
       fetchAndDeleteSecretMessage();
    }, [secretId]);
  
    useEffect(() => {
      if (viewed) {
        const deleteSecretMessage = async () => {
          const docRef = doc(db, 'secrets', secretId);
          await deleteDoc(docRef);
        };
  
        deleteSecretMessage();
      }
   }, [viewed, secretId]);
   
    return (
      <div>
      {viewed ? (
        <p className='seen'>The secret message has already been viewed and has been deleted.</p>
      ) : (
        <>
          <p className='msg-heading'>Your secret message:</p>
          <p className='msg'>{message}</p>
        </>
      )}
    </div>
  );
  
}

export default TextView;