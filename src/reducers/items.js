const itemsReducerDefaultState = [];

export default (state = itemsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_MAIN_ITEM':
      return [
        ...state,
        action.item
      ];
    case 'EDIT_MAIN_ITEM':
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            ...action.updates
          };
        } else {
          return item;
        }
      });
    case 'REMOVE_MAIN_ITEM':
      return state.filter(({ id }) => id !== action.id);
    case 'GET_MAIN_ITEMS':
      return action.items;
    case 'GET_IMAGE_URL':
      return state.map((item) => {
        if (item.id === action.id) {
          return {
            ...item,
            imageUrl: action.url
          }
        }
        else {
          return item;
        }
      })
    default:
      return state;
  }
};
