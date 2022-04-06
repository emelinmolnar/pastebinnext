import Head from 'next/head'
import Link from 'next/link';
import React, { useState } from 'react';

import styles from '../styles/Home.module.css'

export default function Home(props) {
  const [text, setText] = useState('');
  const [pastesCreated, setPastesCreated] = useState(0);
  const [whichPaste, setWhichPaste] = useState(0);
  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleNrChange = e => {
    setWhichPaste(e.target.value);
  }

  const createPaste = async (theText) => {

    setPastesCreated(prevState => prevState + 1);
    const response = await fetch('http://localhost:3000/api/createpaste', {
      method: 'POST',
      body: JSON.stringify(theText)
    });
    if(!response.ok) {
      throw new Error(response.statusText);
    } 

    return await response.json();
  }
  
  return (
    <div className={styles.container, styles.card}>
      <div className = {styles.card}>
        <label htmlFor='paste'>Add text</label>
        <input id="paste" type="text" onChange={handleChange}/>
        <button onClick={()=> createPaste(text)}>Add paste</button>
      </div>
      <div className={styles.card}>
      <Link href={`http://localhost:3000/pastes/${whichPaste}`}>
        <a>Go to Paste no.</a>
      </Link>
        
        <input id = "pastenr" type="number" onChange = {handleNrChange} max={pastesCreated + 1} />
      </div>
    </div>
  )
}


