const messageReducerDefaultState = {
    message: '',
    status: 'success',
    open: false
};

export default (state = messageReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        message: action.message,
        status: action.status,
        open: true
    };
    case 'REMOVE_MESSAGE':
      return {
        ...state,
        message: "",
        status: action.status,
        open: false
      };
    default:
      return state;
  }
};