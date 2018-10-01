// ADD_MESSAGE
export const addMessage = (message, status) => ({
  type: 'ADD_MESSAGE',
  message,
  status
});

// REMOVE_MESSAGE
export const removeMessage = () => ({
  type: 'REMOVE_MESSAGE',
})
