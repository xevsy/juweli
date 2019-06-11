const tagsReducerDefaultState = [];

export default (state = tagsReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_TAG':
      return [
        ...state,
        action.tag
      ];
    case 'GET_MAIN_TAGS':
      return action.tags;
    case 'REMOVE_TAG':
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};
