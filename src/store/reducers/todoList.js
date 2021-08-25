import * as actionType from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
       todos: [
              {
                     title: 'monday',
                     todoItems: [
                            { desc: 'exercise', completed: false },
                            { desc: 'go to bank', completed: false },
                            { desc: 'prepare clothes for laundry', completed: false }
                     ]
              },
              {
                     title: 'app ideas',
                     todoItems: [{ desc: 'gps tracker', completed: false }]
              },
              {
                     title: 'groceries',
                     todoItems: [
                            { desc: 'apple', completed: false },
                            { desc: 'bread', completed: false },
                            { desc: 'yoghurt', completed: false }
                     ]
              }
              // {
              //        title: 'monday',
              //        todoItems: ['exercise', 'go to bank', 'fix laundry']
              // }
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
                     let item = { desc: action.reminderContent, completed: false };
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
       if (action.flag === 'remove') {
              updatedTodoItems.splice(action.reminderId, 1);
       } else if (action.flag === 'edit') {
              let updatedReminder = { ...updatedTodoItems[action.reminderId] };
              updatedReminder.desc = action.content;
              console.log(updatedReminder);
              updatedTodoItems.splice(action.reminderId, 1, updatedReminder);
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
       updatedTodoItems[action.id].completed = !updatedTodoItems[action.id].completed;

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
