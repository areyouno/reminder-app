import Checkbox from "@material-ui/core/Checkbox";
import RadioButtonChecked from "@material-ui/icons/RadioButtonChecked";
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import styles from "./Reminder.module.scss";

const ReminderSearch = props => {
       const [reminderListCopy, setReminderListCopy] = useState([]);

       useEffect(() => {
              let rCopy = [...props.rList];
              setReminderListCopy(rCopy);
       }, [props.rList]); //to remove props.todoList (or not)

       const onEditReminderHandler = (reminderId, event, todoIndex) => {
              // console.log("reminderList", reminderListCopy);
              // console.log("id", reminderId, "todoIndex", todoIndex);
              let reminders = [...reminderListCopy];
              const selected = reminders[todoIndex].todoItems;
              let pos = selected.map(reminder => reminder.id).indexOf(reminderId);
              // console.log("pos", pos);
              reminders[todoIndex].todoItems[pos].desc = event.target.value;
              setReminderListCopy(reminders); //update state copy
       };

       const onSaveReminderHandler = (id, event, todoIndex) => {
              //2nd approach: send todoItemIndex, flag, and depending on the flag(edit or remove) will pass the value;
              if (event.target.value === "") {
                     props.onEditReminder(id, "remove", null, todoIndex);
                     return;
              }
              props.onEditReminder(id, "edit", event.target.value, todoIndex);
       };

       const onToggleCheckboxHandler = (id, listId) => {
              props.onToggleCompleteReminder(id, listId);
       };

       const sortByCompleted = reminderListCopy.sort((a, b) => {
              if (a.isCompleted && !b.isCompleted) {
                     return 1;
              } else if (!a.isCompleted && b.isCompleted) {
                     return -1;
              } else {
                     return 0;
              }
       });

       let reminderList = <div></div>;
       if (reminderListCopy.length > 0) {
              let reminders = sortByCompleted;
              // console.log(reminders);
              reminderList = reminders.map((todo, listIndex) => {
                     return (
                            <div key={listIndex} className={`${styles["reminder__container-search-item"]}`}>
                                   <h2 className={styles["reminder__todo-title"]}>{todo.title}</h2>
                                   {todo.todoItems.map((reminder, reminderIndex) => {
                                          return (
                                                 <div key={reminderIndex} className={styles["reminder__row-container"]}>
                                                        <div className={styles["reminder__btn-radio-container"]}>
                                                               <Checkbox
                                                                      icon={<CircleUnchecked />}
                                                                      checkedIcon={<RadioButtonChecked />}
                                                                      color="default"
                                                                      onClick={() =>
                                                                             onToggleCheckboxHandler(
                                                                                    reminder.id,
                                                                                    listIndex
                                                                             )
                                                                      }
                                                                      checked={reminder.isCompleted}
                                                                      className={styles["reminder__btn-radio"]}
                                                               />
                                                        </div>
                                                        <div
                                                               className={styles["reminder__reminder-row"]}
                                                               key={listIndex}>
                                                               <input
                                                                      className={`${
                                                                             styles["reminder__reminder-item"]
                                                                      } ${
                                                                             reminder.isCompleted === true
                                                                                    ? styles[
                                                                                             "reminder__reminder-item--completed"
                                                                                      ]
                                                                                    : ""
                                                                      }`}
                                                                      type="text"
                                                                      id={reminderIndex}
                                                                      value={reminder.desc}
                                                                      onChange={event =>
                                                                             onEditReminderHandler(
                                                                                    reminder.id,
                                                                                    event,
                                                                                    listIndex
                                                                             )
                                                                      }
                                                                      onBlur={event =>
                                                                             onSaveReminderHandler(
                                                                                    reminder.id,
                                                                                    event,
                                                                                    listIndex
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
              <div className={styles["reminder__container-search"]}>
                     <h1 className={styles["container-header"]}>Results for "{props.searchVal}"</h1>
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
