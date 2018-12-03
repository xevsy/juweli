const categoriesReducerDefaultState = [];

export default (state = categoriesReducerDefaultState, action) => {
  switch (action.type) {
    case 'GET_PARENT_CATEGORIES':
      return action.parentCategories;
    default:
      return state;
  }
};
