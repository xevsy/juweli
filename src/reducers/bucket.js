const bucketReducerDefaultState = [];

const eventExists = (state, item) => {
  return state.find((current) => {
    if (current.id === item.id) {
      current.bucket++;
      return true;
    }
    return false;
  });
}

export default (state = bucketReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_ITEM_TO_BUCKET':
      if (eventExists(state, action.item)) {
        return [...state];
      } else {
        action.item.bucket = 1;
        return [...state, action.item];
      }
    case 'REMOVE_ITEM_FROM_BUCKET':
      return state.filter(({ id }) => id !== action.id);
    case 'REMOVE_ITEMS_FROM_BUCKET':
      return state.filter(({id}) => action.items.indexOf(id) === -1)
    default:
      return state;
  }
};