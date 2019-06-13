const ordersReducerDefaultState = [];

export default (state = ordersReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_NEW_ORDER':
      return [
        ...state,
        action.order
      ];
    case 'GET_MAIN_ORDERS':
      return action.orders;
    default:
      return state;
  }
};
