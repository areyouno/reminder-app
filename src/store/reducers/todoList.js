import * as actionType from "../actions/actionTypes";
import { updatedObject } from "../utility";

const initialState = {
       todos: [
              {
                     title: "monday",
                     todoItems: [
                            { id: 1, desc: "exercise", isCompleted: false },
                            { id: 2, desc: "go to bank", isCompleted: false },
                            { id: 3, desc: "prepare clothes for laundry", isCompleted: true }
                     ]
              },
              {
                     title: "app ideas",
                     todoItems: [{ id: 1, desc: "gps tracker", isCompleted: false }]
              },
              {
                     title: "groceries",
                     todoItems: [
                            { id: 1, desc: "apple", isCompleted: false },
                            { id: 2, desc: "bread", isCompleted: false },
                            { id: 3, desc: "yoghurt", isCompleted: false }
                     ]
              },
              {
                     title: "app ideas",
                     todoItems: [{ id: 1, desc: "gps tracker", isCompleted: false }]
              },
              {
                     title: "groceries",
                     todoItems: [
                            { id: 1, desc: "apple", isCompleted: false },
                            { id: 2, desc: "bread", isCompleted: false },
                            { id: 3, desc: "yoghurt", isCompleted: false }
                     ]
              },
              {
                     title: "app ideas",
                     todoItems: [{ id: 1, desc: "gps tracker", isCompleted: false }]
              },
              {
                     title: "groceries",
                     todoItems: [
                            { id: 1, desc: "apple", isCompleted: false },
                            { id: 2, desc: "bread", isCompleted: false },
                            { id: 3, desc: "yoghurt", isCompleted: false }
                     ]
              },
              {
                     title: "app ideas",
                     todoItems: [{ id: 1, desc: "gps tracker", isCompleted: false }]
              },
              {
                     title: "groceries",
                     todoItems: [
                            { id: 1, desc: "apple", isCompleted: false },
                            { id: 2, desc: "bread", isCompleted: false },
                            { id: 3, desc: "yoghurt", isCompleted: false }
                     ]
              },
              {
                     title: "app ideas",
                     todoItems: [{ id: 1, desc: "gps tracker", isCompleted: false }]
              },
              {
                     title: "groceries",
                     todoItems: [
                            { id: 1, desc: "apple", isCompleted: false },
                            { id: 2, desc: "bread", isCompleted: false },
                            { id: 3, desc: "yoghurt", isCompleted: false }
                     ]
              },
              {
                     title: "app ideas",
                     todoItems: [{ id: 1, desc: "gps tracker", isCompleted: false }]
              },
              {
                     title: "groceries",
                     todoItems: [
                            { id: 1, desc: "apple", isCompleted: false },
                            { id: 2, desc: "bread", isCompleted: false },
                            { id: 3, desc: "yoghurt", isCompleted: false }
                     ]
              },
              {
                     title: "app ideas",
                     todoItems: [{ id: 1, desc: "gps tracker", isCompleted: false }]
              },
              {
                     title: "groceries",
                     todoItems: [
                            { id: 1, desc: "apple", isCompleted: false },
                            { id: 2, desc: "bread", isCompleted: false },
                            { id: 3, desc: "yoghurt", isCompleted: false }
                     ]
              },
              {
                     title: "app ideas",
                     todoItems: [{ id: 1, desc: "gps tracker", isCompleted: false }]
              },
              {
                     title: "groceries",
                     todoItems: [
                            { id: 1, desc: "apple", isCompleted: false },
                            { id: 2, desc: "bread", isCompleted: false },
                            { id: 3, desc: "yoghurt", isCompleted: false }
                     ]
              }
       ]
};
const setToDoList = (state, action) => {
       return updatedObject(state, {
              todoList: {
                     title: action.todoList.title,
                     todos: action.todoList
              }
       });
};

const addReminder = (state, action) => {
       let updatedTodos = state.todos.map((arr, index) => {
              if (index === action.todoListIndex) {
                     let item = { desc: action.reminderContent, isCompleted: false };
                     arr.todoItems.push(item);
              }
              return arr;
       });

       const updatedState = {
              todos: updatedTodos
       };
       return updatedObject(state, updatedState);
};

const editReminder = (state, action) => {
       //1st approach
       // const todosCopy = [...state.todos];
       // let updatedReminder = { ...todosCopy[action.reminderListId] };
       // let updatedTodoItems = [...updatedReminder.todoItems];
       // updatedTodoItems = action.todoItems;
       // updatedReminder.todoItems = updatedTodoItems;
       // todosCopy[action.reminderListId] = updatedReminder;
       // const updatedState = { todos: todosCopy };

       //2nd approach
       const todosCopy = [...state.todos];
       let updatedReminder = { ...todosCopy[action.reminderListId] };
       let updatedTodoItems = [...updatedReminder.todoItems];
       if (action.flag === "remove") {
              let pos = updatedTodoItems.map(reminder => reminder.id).indexOf(action.reminderId);
              updatedTodoItems.splice(pos, 1);
       } else if (action.flag === "edit") {
              let updatedReminder = { ...updatedTodoItems[action.reminderId - 1] };
              updatedReminder.desc = action.content;
              updatedTodoItems.splice(action.reminderId - 1, 1, updatedReminder);
       }
       updatedReminder.todoItems = updatedTodoItems;
       todosCopy[action.reminderListId] = updatedReminder;
       const updatedState = { todos: todosCopy };
       return updatedObject(state, updatedState);
};

const addList = (state, action) => {
       const newList = { title: action.listTitle, todoItems: [] };
       const arrayCopy = [...state.todos];
       arrayCopy.push(newList);
       const updatedState = { todos: arrayCopy };
       return updatedObject(state, updatedState);
};

const toggleCompleteReminder = (state, action) => {
       let todosCopy = [...state.todos];
       let updatedReminder = { ...todosCopy[action.reminderListId] };
       let updatedTodoItems = [...updatedReminder.todoItems];
       updatedTodoItems[action.id - 1].isCompleted = !updatedTodoItems[action.id - 1].isCompleted;

       updatedReminder.todoItems = updatedTodoItems;
       todosCopy[action.reminderListId] = updatedReminder;
       const updatedState = { todos: todosCopy };
       return updatedObject(state, updatedState);
};

const reducer = (state = initialState, action) => {
       switch (action.type) {
              case actionType.ADD_REMINDER:
                     return addReminder(state, action);
              case actionType.EDIT_REMINDER:
                     return editReminder(state, action);
              case actionType.ADD_LIST:
                     return addList(state, action);
              case actionType.SET_TODO_LIST:
                     return setToDoList(state, action);
              case actionType.TOGGLE_COMPLETE_REMINDER:
                     return toggleCompleteReminder(state, action);
              default:
                     return state;
       }
};

export default reducer;
