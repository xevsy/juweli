const categoriesReducerDefaultState = [];

export default (state = categoriesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [
        ...state,
        action.category
      ];
    case 'GET_MAIN_CATEGORIES':
      return action.categories;
    default:
      return state;
  }
};
