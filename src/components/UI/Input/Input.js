import React from 'react';
import styles from './Input.module.css';

const input = props => {
       let inputElement = null;
       const inputClasses = [styles.InputElement];

       if (props.invalid && props.shouldValidate && props.touched) {
              inputClasses.push(styles.Invalid);
       }

       if (props.center) {
              inputClasses.push(styles.inputNewList);
       }

       if (props.className) {
              inputClasses.length = 0;
              inputClasses.push(props.className);
       }

       switch (props.elementType) {
              case 'input':
                     inputElement = (
                            <input
                                   className={inputClasses.join(' ')}
                                   {...props.elementConfig}
                                   value={props.value}
                                   onChange={props.changed}
                            />
                     );
                     break;
              case 'textarea':
                     inputElement = (
                            <textarea
                                   className={inputClasses.join(' ')}
                                   {...props.elementConfig}
                                   value={props.value}
                                   onChange={props.changed}
                            />
                     );
                     break;
              case 'select':
                     inputElement = (
                            <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
                                   {props.elementConfig.options.map(option => (
                                          <option key={option.value} value={option.value}>
                                                 {option.displayValue}
                                          </option>
                                   ))}
                            </select>
                     );
                     break;
              default:
                     inputElement = (
                            <input
                                   autoFocus
                                   className={inputClasses.join(' ')}
                                   {...props.elementConfig}
                                   value={props.value}
                                   onChange={props.changed}
                            />
                     );
       }

       return (
              <div className={styles.Input}>
                     <label className={styles.Label}>{props.label}</label>
                     {inputElement}
              </div>
       );
};

export default input;
