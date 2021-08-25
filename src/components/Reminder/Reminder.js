import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import Ox from '../../hoc/Ox';
import * as actions from '../../store/actions/index';
import styles from './Reminder.module.css';

const Reminder = props => {
       const [isAdding, setIsAdding] = useState(false);
       const [newInputStr, setNewInputStr] = useState('');
       const [reminderListCopy, setReminderListCopy] = useState([]);

       let inputRef = useRef();

       useEffect(() => {
              let rCopy = null;
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
              if (event.target.value === '') {
                     props.onEditReminder(id, 'remove', null, props.reminderListIndex);
                     return;
              }
              props.onEditReminder(id, 'edit', event.target.value, props.reminderListIndex);
       };

       const onToggleCheckboxHandler = (idx, listId) => {
              props.onToggleCompleteReminder(idx, listId);
       };

       const onKeypressHandler = event => {
              if (event.keyCode === 13) {
                     onAddBlur(event);
              }
       };

       let reminderHeader = (
              <Ox>
                     <div className={styles['reminder-btn-return']}>
                            <Button onClick={props.returnHandler} style={{ padding: '6px 8px 6px 0px' }}>
                                   <NavigateBeforeIcon />
                                   Lists
                            </Button>
                     </div>
                     <h2 className={styles['reminder__todo-title']}>{props.todoList[props.reminderListIndex].title}</h2>
              </Ox>
       );

       let reminderList = <div className={styles['reminder__no-reminder']}>No Reminders</div>;
       if (props.todoList[props.reminderListIndex].todoItems.length > 0) {
              let reminders = reminderListCopy;
              reminderList = reminders.map((reminder, index) => {
                     return (
                            <div key={index} className={styles['reminder__row-container']}>
                                   <div className={styles['reminder__btn-radio-container']}>
                                          <Checkbox
                                                 icon={<CircleUnchecked />}
                                                 checkedIcon={<RadioButtonChecked />}
                                                 color="default"
                                                 onClick={() => onToggleCheckboxHandler(index, props.reminderListIndex)}
                                                 checked={reminder.completed}
                                                 className={styles['reminder__btn-radio']}
                                          />
                                   </div>
                                   <div className={styles['reminder__reminder-row']} key={index}>
                                          <input
                                                 className={styles['reminder__reminder-item']}
                                                 type="text"
                                                 id={index}
                                                 // value={item === reminderListCopy[index] ? reminderListCopy[index] : ''}
                                                 value={reminder.desc}
                                                 onChange={event => onEditReminderHandler(index, event)}
                                                 onBlur={event => onSaveReminderHandler(index, event)}
                                          />
                                   </div>
                            </div>
                     );
              });
       }

       let newInput = (
              <div className={styles['reminder__row-container']}>
                     <Checkbox
                            icon={<CircleUnchecked />}
                            checkedIcon={<RadioButtonChecked />}
                            color="default"
                            checked={false}
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
                                   onKeyDown={onKeypressHandler}
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
                     {reminderHeader}
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
              onEditReminder: (id, flag, reminder, reminderListId) =>
                     dispatch(actions.editReminder(id, flag, reminder, reminderListId)),
              onToggleCompleteReminder: (id, reminderListId) =>
                     dispatch(actions.toggleCompleteReminder(id, reminderListId))
       };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reminder);
