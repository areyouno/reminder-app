import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import styles from './Reminder.module.css';

import * as actions from '../../store/actions/index';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import Button from '@material-ui/core/Button';

const Reminder = props => {
       const [isAdding, setIsAdding] = useState(false);
       const [newInputStr, setNewInputStr] = useState('');
       const [reminderListCopy, setReminderListCopy] = useState([]);

       let inputRef = useRef();

       useEffect(() => {
              let rCopy = null;
              // if (props.rList === undefined || props.rList.length === 0) {
              //        rCopy = [...props.todoList[props.reminderListIndex].todoItems];
              // } else {
              //        rCopy = [...props.rList.todoItems];
              // }
              rCopy = [...props.todoList[props.reminderListIndex].todoItems];

              setReminderListCopy(rCopy);
       }, [props.todoList, props.reminderListIndex]); //to remove props.todoList (or not)

       useEffect(() => {
              if (inputRef && isAdding) {
                     inputRef.current.focus();
              }
       });

       const onAddBlur = event => {
              setIsAdding(false);
              setNewInputStr('');
              if (event.target.value === '') {
                     return;
              }
              props.onAddReminder(event.target.value, props.reminderListIndex);
       };

       const newInputHandler = () => {
              setIsAdding(true);
              //if newinputField exists, dont allow new reminder to be clicked
       };

       const onEditReminderHandler = (id, event) => {
              // event.preventDefault(); //not sure if needed (removed; for verification)
              let reminders = [...reminderListCopy];
              reminders[id] = event.target.value;
              setReminderListCopy(reminders); //update state copy
       };

       const onSaveReminderHandler = (id, event) => {
              // console.log(event.target.value);
              //1st approach: send whole array
              // let updatedReminderList = [...reminderListCopy];
              // props.onEditReminder(updatedReminderList, props.reminderListIndex); //pass whole reminderlist and reminderListIndex

              //2nd approach: send todoItemIndex, flag, and depending on the flag(edit or remove) will pass the value;
              console.log(props.reminderListIndex);
              if (event.target.value === '') {
                     props.onEditReminder(id, 'remove', null, props.reminderListIndex);
                     return;
              }
              props.onEditReminder(id, 'edit', event.target.value, props.reminderListIndex);
       };

       let reminderList = <div className={styles['reminder__no-reminder']}>No Reminders</div>;
       if (props.todoList[props.reminderListIndex].todoItems.length > 0) {
              let reminders = reminderListCopy;
              reminderList = reminders.map((item, index) => {
                     return (
                            <div>
                                   <div className={styles['reminder__btn-radio-container']}>
                                          <input className={styles['reminder__btn-radio']} type="radio" />
                                   </div>
                                   <div className={styles['reminder__reminder-row']} key={index}>
                                          <input
                                                 className={styles['reminder__reminder-item']}
                                                 type="text"
                                                 id={index}
                                                 // value={item === reminderListCopy[index] ? reminderListCopy[index] : ''}
                                                 value={item}
                                                 onChange={event => onEditReminderHandler(index, event)}
                                                 onBlur={event => onSaveReminderHandler(index, event)}
                                          />
                                   </div>
                            </div>
                     );
              });
       }

       let newInput = (
              <div>
                     <input
                            type="radio"
                            className={isAdding ? styles['reminder__btn-radio'] : styles['reminder__btn-radio--hide']}
                     />
                     <div
                            className={
                                   isAdding ? styles['reminder__reminder-row'] : styles['reminder__reminder-row--hide']
                            }>
                            <input
                                   className={styles['reminder__reminder-item']}
                                   value={newInputStr}
                                   onChange={event => setNewInputStr(event.target.value)}
                                   onBlur={event => onAddBlur(event)}
                                   ref={inputRef}
                            />
                     </div>
              </div>
       );

       const addReminderFooter = (
              <div className={styles['reminder__footer']}>
                     <button
                            className={styles['reminder__footer-btn-add']}
                            disabled={isAdding}
                            onClick={newInputHandler}>
                            New Reminder
                     </button>
              </div>
       );
       return (
              <div className={`${styles['reminder-container']} ${props.show ? styles['container--show'] : ''}`}>
                     <Button onClick={props.returnHandler} style={{ padding: '6px 8px 6px 0px' }}>
                            <NavigateBeforeIcon />
                            Lists
                     </Button>
                     <h2 className={styles['reminder__todo-title']}>{props.todoList[props.reminderListIndex].title}</h2>
                     {reminderList}
                     {newInput}
                     {addReminderFooter}
              </div>
       );
};

const mapStateToProps = state => {
       return {
              todoList: state.todos
       };
};

const mapDispatchToProps = dispatch => {
       return {
              onAddReminder: (reminder, index) => dispatch(actions.addReminder(reminder, index)),
              // onEditReminder: (reminders, index) => dispatch(actions.editReminder(reminders, index))
              onEditReminder: (id, flag, reminder, reminderListId) =>
                     dispatch(actions.editReminder(id, flag, reminder, reminderListId))
       };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);
