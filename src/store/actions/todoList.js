import * as actionTypes from './actionTypes';

export const addReminder = (reminder, index) => {
       return {
              type: actionTypes.ADD_REMINDER,
              reminderContent: reminder,
              todoListIndex: index
       };
};

//1st approach: pass entire reminders list
// export const editReminder = (reminders, index) => {
//        return {
//               type: actionTypes.EDIT_REMINDER,
//               listIndex: index,
//               todoItems: reminders
//        };
// };

//2nd approach pass flag, edit or remove
export const editReminder = (id, flag, reminder, reminderListId) => {
       return {
              type: actionTypes.EDIT_REMINDER,
              reminderListId: reminderListId,
              reminderId: id,
              content: reminder,
              flag: flag
       };
};

export const removeReminder = index => {
       return {
              type: actionTypes.REMOVE_REMINDER,
              reminderIndex: index
       };
};

export const addList = title => {
       return {
              type: actionTypes.ADD_LIST,
              listTitle: title
       };
};

export const toggleCompleteReminder = (id, reminderListId) => {
       return {
              type: actionTypes.TOGGLE_COMPLETE_REMINDER,
              id: id,
              reminderListId: reminderListId
       };
};
