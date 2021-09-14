import React, { useState, useEffect } from "react";
import Input from "../UI/Input/Input";
import styles from "./NewList.module.scss";

const NewList = props => {
       const [text, setText] = useState("");

       useEffect(() => {
              return () => {
                     setText("");
              };
       }, []);

       const handleChange = event => {
              // event.preventDefault();
              setText(event.target.value);
       };

       let header = (
              <div className={styles.newlist__header}>
                     <button className={styles.btn} onClick={props.addListCancelled}>
                            Cancel
                     </button>
                     <div>New List</div>
                     <button className={styles.btn} disabled={!text} onClick={() => props.addNewList(text)}>
                            Done
                     </button>
              </div>
       );

       let input = (
              <div className={styles.newlist__input}>
                     <p>Icon</p>
                     <Input value={text} changed={event => handleChange(event)} center="true" />
              </div>
       );

       return (
              <div>
                     {header}
                     {input}
              </div>
       );
};

export default NewList;
