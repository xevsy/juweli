const contactsReducerDefaultState = '';

export default (contacts = contactsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CONTACTS':
      return action.data;
    case 'GET_CONTACTS':
      return contacts;
    default:
      return contacts;
  }
};