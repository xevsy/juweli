const categoriesReducerDefaultState = [];

export default (state = categoriesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [
        ...state,
        action.category
      ];
    case 'EDIT_CATEGORY':
      return state.map((category) => {
        if (category.id === action.id) {
          return {
            ...category,
            ...action.updates
          };
        } else {
          return category;
        }
      });
    case 'GET_MAIN_CATEGORIES':
      return action.categories;
    case 'REMOVE_MAIN_ITEM':
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};
