const categoriesReducerDefaultState = {all: [], parent: [], nested: []};

export default (state = categoriesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      state.all.push(action.category);
      if (action.category.parentId === 0) {
        state.parent.push(action.category);
      }
      return state;
    case 'EDIT_CATEGORY':
        state.all = state.all.map((category) => {
          if (category.id === action.id) {
            return {
              ...category,
              ...action.updates
            };
          } else {
            return category;
          }
        });
      return state;
    case 'GET_MAIN_CATEGORIES':
      return {
        ...state,
        all: action.categories
      };
    case 'GET_MAIN_PARENT_CATEGORIES':
      return {
        ...state,
        parent: action.categories
      };
    case 'GET_MAIN_NESTED_CATEGORIES':
      let nestedObject = {};

      for (let index in action.categories) {
        let category = action.categories[index];
        if (category.parentId === 0) {
          nestedObject[category.id] = { ...nestedObject[category.id], ...category }
        } else if (nestedObject[category.parentId] !== undefined) {
          if (nestedObject[category.parentId]['subcategories'] !== undefined) {
            nestedObject[category.parentId]['subcategories'] = [];
          }
          //console.log(nestedObject[category.parentId])
          //nestedObject[category.parentId]['subcategories'].push(category);
        }
      }
      //console.log(nestedObject)
      return {
        ...state,
        nested: action.categories
      };
    case 'REMOVE_MAIN_CATEGORY':
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};
