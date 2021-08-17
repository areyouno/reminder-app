import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { connect } from 'react-redux';
import Ox from '../../../hoc/Ox';
import * as actions from '../../../store/actions/index';
import NewList from '../../NewList/NewList';
import Reminder from '../../Reminder/Reminder';
import ReminderSearch from '../../Reminder/ReminderSearch';
// import { updatedObject } from '../../../store/utility';
import Modal from '../../UI/Modal/Modal';
import styles from './SideBar.module.css';

const SideBar = props => {
       const [itemId, setItemId] = useState(0);
       const [isAdding, setIsAdding] = useState(false);
       const [inputFieldValue, setInputFieldValue] = useState('');
       const [filteredReminders, setFilteredReminders] = useState([]);

       useEffect(() => {
              reminderListHandler();
       }, [inputFieldValue, itemId]);

       const onTodoClickHandler = id => {
              setItemId(id);
              reminderListHandler(id);
       };

       const reminderListHandler = id => {
              if (inputFieldValue) {
                     let arr = searchListHandler(props.todoList, inputFieldValue);
                     setFilteredReminders(arr);
              }
              // console.log(filteredReminders); //always delay to reflect current vlaue; would reflect on next batch update
       };

       const searchListHandler = (rows, filterKey) => {
              return rows.filter(row => JSON.stringify(row).toLowerCase().includes(filterKey));
       };

       const showAddListHandler = () => {
              setIsAdding(true);
       };

       const cancelAddListHandler = () => {
              setIsAdding(false);
       };

       const addListHandler = text => {
              props.onAddList(text);
              setIsAdding(false);
       };

       const tdList = props.todoList.map((item, index) => {
              return (
                     <div
                            key={index}
                            className={`${styles.sidebar__listItems} ${index === itemId ? styles.active : ''}`}
                            onClick={() => onTodoClickHandler(index)}>
                            <div>{item.title}</div>
                            <div>{item.todoItems.length}</div>
                     </div>
              );
       });

       const addListFooter = (
              <div className={styles.footer}>
                     <button className={styles.footer__btn} onClick={showAddListHandler}>
                            Add List
                     </button>
              </div>
       );

       let reminder = <Reminder reminderListIndex={itemId} />;
       if (inputFieldValue) {
              reminder = <ReminderSearch rList={filteredReminders} searchVal={inputFieldValue} />;
       }

       const modal = (
              <Modal show={isAdding} modalClosed={cancelAddListHandler}>
                     <NewList addListCancelled={cancelAddListHandler} addNewList={addListHandler} />
              </Modal>
       );

       return (
              <Ox>
                     <div className={styles.sidebar}>
                            <div className={styles.sidebar__search}>
                                   <FaSearch className={styles.sidebar__icon}></FaSearch>
                                   <input
                                          className={styles.sidebar__searchbox}
                                          placeholder="Search"
                                          value={inputFieldValue}
                                          onChange={e => setInputFieldValue(e.target.value)}
                                   />
                            </div>
                            <h3 className={styles.sidebar__label}>My Lists</h3>
                            {tdList}
                     </div>
                     {addListFooter}
                     {isAdding ? modal : null}
                     {/* <Reminder reminderListIndex={itemId} rList={filteredReminders} /> */}
                     {reminder}
              </Ox>
       );
};

const mapStateToProps = state => {
       return {
              todoList: state.todos
       };
};

const mapDispatchToProps = dispatch => {
       return {
              onAddList: title => dispatch(actions.addList(title))
       };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

// const addNewReminderHandler = reminder => {
//        if (reminder === '') {
//               return;
//        }

//        let updatedList = props.todoList.todos.map((arr, index) => {
//               console.log(reminder);
//               console.log(itemId);
//               if (index === itemId) {
//                      arr.todoItems.push(reminder);
//               }
//               return arr;
//        });

//        let newTodo = { todos: updatedList };
//        // setTdList(newTodo);
// };

// const inputChangedHandler = (event, item, index) => {
//        // console.log(event.target.value);
//        // setEditItemStr(event.target.value);
//        // setReminderItem(reminderItem[index]);
// };

// const editReminderHandler = index => {
//        //loop through array todoItems
//        // console.log(index);
//        // console.log(index.nativeEvent.data);
//        // console.log(index.target.defaultValue);
//        // console.log(index.target.id);
//        // console.log(index.key);
//        if (props.todoList.todos[itemId][index.target.id] === index.target.defaultValue) {
//               return '';
//        }

//        //look for reminder in todos[itemId]
//        if (index.nativeEvent.data == null) {
//               console.log(index);
//        }
//        let newVal = index.target.defaultValue.concat(index.nativeEvent.data);
//        let updatedReminderList = props.todoList.todos[itemId].todoItems.splice([index.target.id], 1, newVal);

//        let updatedList = props.todoList.todos.splice([itemId], 1, updatedReminderList);
//        console.log(updatedList);
//        let newTodo = { todos: updatedList };
//        console.log(newTodo);
//        // setTdList(newTodo);
// };

// const addListHandler = title => {
//        const newList = { title: title, todoItems: [] };
//        const arrayCopy = [...props.todoList.todos];
//        arrayCopy.push(newList);
//        let newTodo = { todos: arrayCopy };
//        setIsAdding(false);
//        // setTdList(prevList => [...prevList.todos, newList]);
// };
