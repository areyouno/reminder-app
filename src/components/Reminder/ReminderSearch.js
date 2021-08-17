import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './Reminder.module.css';

import * as actions from '../../store/actions/index';

const ReminderSearch = props => {
       const [reminderListCopy, setReminderListCopy] = useState([]);

       useEffect(() => {
              //   console.log(props.rList);
              let rCopy = [...props.rList];
              //   if (props.rList === undefined) {
              //          console.log('UNDEFINED');
              //          rCopy = [...props.todoList];
              //   }
              console.log(props.todoList);
              console.log(props.rList);
              setReminderListCopy(rCopy);
       }, [props.todoList, props.rList]); //to remove props.todoList (or not)

       const onEditReminderHandler = (id, event, todoIndex) => {
              // event.preventDefault(); //not sure if needed (removed; for verification)
              let reminders = [...reminderListCopy];
              reminders[todoIndex].todoItems[id] = event.target.value;
              console.log(reminders);
              setReminderListCopy(reminders); //update state copy
       };

       const onSaveReminderHandler = (id, event, todoIndex) => {
              // console.log(event.target.value);
              //1st approach: send whole array
              // let updatedReminderList = [...reminderListCopy];
              // props.onEditReminder(updatedReminderList, props.reminderListIndex); //pass whole reminderlist and reminderListIndex

              //2nd approach: send todoItemIndex, flag, and depending on the flag(edit or remove) will pass the value;
              if (event.target.value === '') {
                     props.onEditReminder(id, 'remove', null, todoIndex);
                     return;
              }
              props.onEditReminder(id, 'edit', event.target.value, todoIndex);
       };

       let reminderList = <div></div>;
       if (reminderListCopy.length > 0) {
              let reminders = reminderListCopy;
              reminderList = reminders.map((todo, index) => {
                     return (
                            <div key={index}>
                                   <h2>{todo.title}</h2>
                                   {todo.todoItems.map((reminder, reminderIndex) => {
                                          return (
                                                 <div key={reminderIndex}>
                                                        <input className={styles.radioBtn} type="radio" />
                                                        <input
                                                               className={styles.reminderItem}
                                                               type="text"
                                                               id={reminderIndex}
                                                               // value={item === reminderListCopy[index] ? reminderListCopy[index] : ''}
                                                               value={reminder}
                                                               onChange={event =>
                                                                      onEditReminderHandler(reminderIndex, event, index)
                                                               }
                                                               onBlur={event =>
                                                                      onSaveReminderHandler(reminderIndex, event, index)
                                                               }
                                                        />
                                                 </div>
                                          );
                                   })}
                            </div>
                     );
              });
       }

       return (
              <div className={styles.reminderContainer}>
                     <h1>Results for "{props.searchVal}"</h1>
                     {reminderList}
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

export default connect(mapStateToProps, mapDispatchToProps)(ReminderSearch);

//    if (props.todoList[props.reminderListIndex].todoItems.length > 0) {
//           let reminders = reminderListCopy;
//           reminderList = reminders.map((item, index) => {
//                  return (
//                         <div className={styles.reminderRow} key={index}>
//                                <input className={styles.radioBtn} type="radio" />
//                                <input
//                                       className={styles.reminderItem}
//                                       type="text"
//                                       id={index}
//                                       // value={item === reminderListCopy[index] ? reminderListCopy[index] : ''}
//                                       value={item}
//                                       onChange={event => onEditReminderHandler(index, event)}
//                                       onBlur={event => onSaveReminderHandler(index, event)}
//                                />
//                         </div>
//                  );
//           });
//    }
