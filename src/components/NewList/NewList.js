import React, { useState, useEffect, useRef } from 'react';
import Input from '../UI/Input/Input';
import styles from './NewList.module.css';

const NewList = props => {
       const [text, setText] = useState('');
       const inputRef = useRef();

       useEffect(() => {
              return () => {
                     setText('');
              };
       }, []);

       const handleChange = event => {
              // event.preventDefault();
              setText(event.target.value);
       };

       let topRow = (
              <div className={styles.topRow}>
                     <button className={styles.btn} onClick={props.addListCancelled}>
                            Cancel
                     </button>
                     <div>New List</div>
                     <button className={styles.btn} disabled={!text} onClick={() => props.addNewList(text)}>
                            Done
                     </button>
              </div>
       );

       return (
              <div>
                     {topRow}
                     <div className={styles.middleRow}>
                            <p>Icon</p>
                            <Input value={text} changed={event => handleChange(event)} ref={inputRef} center="true" />
                     </div>
              </div>
       );
};

export default NewList;
