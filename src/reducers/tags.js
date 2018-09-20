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
    default:
      return state;
  }
};
