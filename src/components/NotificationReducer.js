const NotificationReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_NOTIFICATION':
        return [...state, action.payload];
      case 'REMOVE_NOTIFICATION':
        return state.filter((notification) => notification.id !== action.payload.id);
      default:
        return state;
    }
  };
  
  export default NotificationReducer;
  