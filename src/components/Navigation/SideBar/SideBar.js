import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React, { Fragment, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import NewList from "../../NewList/NewList";
import Reminder from "../../Reminder/Reminder";
import ReminderSearch from "../../Reminder/ReminderSearch";
import Modal from "../../UI/Modal/Modal";
import styles from "./SideBar.module.scss";

const SideBar = props => {
       const [itemId, setItemId] = useState(0);
       const [isAdding, setIsAdding] = useState(false);
       const [inputFieldValue, setInputFieldValue] = useState("");
       const [filteredReminders, setFilteredReminders] = useState([]);
       const [isOpen, setIsOpen] = useState(false);
       const [isSearching, setIsSearching] = useState(false);

       let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

       useEffect(() => {
              reminderListHandler();
       }, [inputFieldValue, itemId]);

       const onTodoClickHandler = id => {
              setItemId(id);
              reminderListHandler(id);
              setIsOpen(true);
       };

       const reminderListHandler = id => {
              if (inputFieldValue) {
                     let arr = searchListHandler(props.todoList, inputFieldValue.toLowerCase());
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

       const onReturnToListsHandler = () => {
              setIsOpen(false);
       };

       const clearInput = () => {
              setIsSearching(!isSearching);
              setInputFieldValue("");
       };

       const inputBlurHandler = () => {
              if (inputFieldValue === "") {
                     setIsSearching(!isSearching);
              }
       };

       const modal = (
              <Modal show={isAdding} modalClosed={cancelAddListHandler}>
                     <NewList addListCancelled={cancelAddListHandler} addNewList={addListHandler} />
              </Modal>
       );

       const searchBar = (
              <div className={styles.sidebar__search}>
                     <FaSearch className={styles.sidebar__icon}></FaSearch>
                     <input
                            className={`${styles.sidebar__searchbox} ${isSearching ? styles["searchbox--active"] : ""}`}
                            placeholder="Search"
                            value={inputFieldValue}
                            onChange={e => setInputFieldValue(e.target.value)}
                            onFocus={() => setIsSearching(!isSearching)}
                            onBlur={() => inputBlurHandler()}
                     />
                     <button
                            className={`${styles["sidebar__cancel-button"]} ${
                                   isSearching ? styles["sidebar__cancel-button--show"] : ""
                            }`}
                            onClick={() => clearInput()}>
                            Cancel
                     </button>
              </div>
       );

       const tdList = props.todoList.map((item, index) => {
              return (
                     <div
                            key={index}
                            className={`${styles["sidebar__list-item"]} ${index === itemId ? styles.active : ""}`}
                            onClick={() => onTodoClickHandler(index)}>
                            <div>{item.title}</div>
                            <div className={styles["sidebar__list-item-count"]}>{item.todoItems.length}</div>
                            <NavigateNextIcon />
                     </div>
              );
       });

       let reminders = <Reminder reminderListIndex={itemId} show={isOpen} returnHandler={onReturnToListsHandler} />;
       if (inputFieldValue) {
              reminders = (
                     <ReminderSearch
                            rList={filteredReminders}
                            searchVal={inputFieldValue}
                            show={isOpen}
                            returnHandler={onReturnToListsHandler}
                     />
              );
       }

       let main = (
              <div className={styles["sidebar__list"]}>
                     <h3 className={styles.sidebar__label}>My Lists</h3>
                     {tdList}
              </div>
       );
       if (inputFieldValue && vw < 500) {
              main = <div>{reminders}</div>;
       }

       const addListFooter = (
              <div className={styles.sidebar__footer}>
                     <button className={styles.sidebar__footer__btn} onClick={showAddListHandler}>
                            Add List
                     </button>
              </div>
       );

       return (
              <Fragment>
                     {isAdding ? modal : null}
                     <div className={styles.sidebar}>
                            {searchBar}
                            {main}
                     </div>
                     {addListFooter}
                     {inputFieldValue && vw < 500 ? null : reminders}
              </Fragment>
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
