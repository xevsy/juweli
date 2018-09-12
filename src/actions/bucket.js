
export const addItemToBucket = (item) => ({
  type: 'ADD_ITEM_TO_BUCKET',
  item
});

export const removeItemFromBucket = (id) => ({
  type: 'REMOVE_ITEM_FROM_BUCKET',
  id
});