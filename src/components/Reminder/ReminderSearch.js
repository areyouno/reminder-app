import Checkbox from '@material-ui/core/Checkbox';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import styles from './Reminder.module.css';

const ReminderSearch = props => {
       const [reminderListCopy, setReminderListCopy] = useState([]);

       useEffect(() => {
              let rCopy = [...props.rList];
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
              //2nd approach: send todoItemIndex, flag, and depending on the flag(edit or remove) will pass the value;
              if (event.target.value === '') {
                     props.onEditReminder(id, 'remove', null, todoIndex);
                     return;
              }
              props.onEditReminder(id, 'edit', event.target.value, todoIndex);
       };

       const onToggleCheckboxHandler = (idx, listId) => {
              props.onToggleCompleteReminder(idx, listId);
       };

       let reminderList = <div></div>;
       if (reminderListCopy.length > 0) {
              let reminders = reminderListCopy;
              reminderList = reminders.map((todo, index) => {
                     return (
                            <div key={index} className={`${styles['reminder__container-search-item']}`}>
                                   <h2 className={styles['reminder__todo-title']}>{todo.title}</h2>
                                   {todo.todoItems.map((reminder, reminderIndex) => {
                                          return (
                                                 <div key={reminderIndex} className={styles['reminder__row-container']}>
                                                        <div className={styles['reminder__btn-radio-container']}>
                                                               <Checkbox
                                                                      icon={<CircleUnchecked />}
                                                                      checkedIcon={<RadioButtonChecked />}
                                                                      color="default"
                                                                      onClick={() =>
                                                                             onToggleCheckboxHandler(
                                                                                    index,
                                                                                    reminderIndex
                                                                             )
                                                                      }
                                                                      checked={reminder.completed}
                                                                      className={styles['reminder__btn-radio']}
                                                               />
                                                        </div>
                                                        <div className={styles['reminder__reminder-row']} key={index}>
                                                               <input
                                                                      className={styles['reminder__reminder-item']}
                                                                      type="text"
                                                                      id={reminderIndex}
                                                                      value={reminder.desc}
                                                                      onChange={event =>
                                                                             onEditReminderHandler(
                                                                                    reminderIndex,
                                                                                    event,
                                                                                    index
                                                                             )
                                                                      }
                                                                      onBlur={event =>
                                                                             onSaveReminderHandler(
                                                                                    reminderIndex,
                                                                                    event,
                                                                                    index
                                                                             )
                                                                      }
                                                               />
                                                        </div>
                                                 </div>
                                          );
                                   })}
                            </div>
                     );
              });
       }

       return (
              <div className={styles['reminder-container-search']}>
                     <h1 className={styles['container-header']}>Results for "{props.searchVal}"</h1>
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
              onEditReminder: (id, flag, reminder, reminderListId) =>
                     dispatch(actions.editReminder(id, flag, reminder, reminderListId)),
              onToggleCompleteReminder: (id, reminderListId) =>
                     dispatch(actions.toggleCompleteReminder(id, reminderListId))
       };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReminderSearch);
