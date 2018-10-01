
export const addItemToBucket = (item) => ({
  type: 'ADD_ITEM_TO_BUCKET',
  item
});

export const removeItemFromBucket = (id) => ({
  type: 'REMOVE_ITEM_FROM_BUCKET',
  id
});

export const removeItemsFromBucket = (items) => ({
  type: 'REMOVE_ITEMS_FROM_BUCKET',
  items
})