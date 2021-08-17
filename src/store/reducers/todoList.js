import * as actionType from '../actions/actionTypes';
import { updatedObject } from '../utility';

const initialState = {
       todos: [
              {
                     title: 'day to day',
                     todoItems: ['exercise', 'bfast/ligo', 'check jobs']
              },
              {
                     title: 'app ideas',
                     todoItems: ['gps tracker']
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
                     arr.todoItems.push(action.reminderContent);
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
              console.log(updatedTodoItems);
       } else if (action.flag === 'edit') {
              updatedTodoItems.splice(action.reminderId, 1, action.content);
              console.log(updatedTodoItems);
       }
       updatedReminder.todoItems = updatedTodoItems;
       todosCopy[action.reminderListId] = updatedReminder;
       const updatedState = { todos: todosCopy };
       console.log(updatedState);
       return updatedObject(state, updatedState);
};

const addList = (state, action) => {
       const newList = { title: action.listTitle, todoItems: [] };
       const arrayCopy = [...state.todos];
       arrayCopy.push(newList);
       const updatedState = { todos: arrayCopy };
       console.log(updatedState);
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
              default:
                     return state;
       }
};

export default reducer;
