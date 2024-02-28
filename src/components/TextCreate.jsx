import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore/lite';
import { db } from '../firebase';



function TextCreate() {
  const [secret, setSecret] = useState('');
  const [link, setLink] = useState('');
  const [viewed, setViewed] = useState(false);

  const createSecret = async (event) => {
    event.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'secrets'), {
        content: secret,
        viewed: false,
      });
      setLink(process.env.REACT_APP_URL+docRef.id);
    } catch (error) {
      console.error('Error creating secret:', error);
    } finally {
      setSecret(''); 
    }
  };

  useEffect(() => {
    if (link && !viewed) {
      setViewed(false); 
    }
  }, [link, viewed]);

  useEffect(() => {
    if (viewed) {
      setTimeout(() => {
        setLink(''); 
      }, 3000);
    }
  }, [viewed]);

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
      console.log('Copying to clipboard was successful!');
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
 }

  return(
    <div className='input-container'>
      <form onSubmit={createSecret}>
        <label htmlFor="secret" className="secret-label">Enter your secret message:</label>
        <textarea
            id="secret"
            value={secret}
            onChange={(event) => setSecret(event.target.value)}
            required
            rows="7" 
            cols="50" 
/>
        <button type="submit" className='submit-button'>Create Secret</button>
      </form>
      {link && !viewed && (
        <div>
          <p>Your secret link:</p>
          <p>{link}</p>
          <button onClick={() => copyToClipboard(link)} className='copy-button'>Copy Secret Link</button>
          <p>This link can be viewed only once and will self-destruct.</p>
        </div>
      )}
      {viewed && (
        <p>Secret has been viewed and self-destructed.</p>
      )}
    </div>
  )
}



export default TextCreate;