/*import { createContext, useState, useEffect } from 'react';

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [otherViewNotification, setOtherViewNotification] = useState(null);

  useEffect(() => {
    // Load existing notifications from local storage on app initialization
    const storedNotifications = JSON.parse(localStorage.getItem('notifications'));
    if (storedNotifications) {
      setNotifications(storedNotifications);
    }
  }, []);

  useEffect(() => {
    // Save new notifications to local storage whenever the notifications state changes
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = (notification) => {
    setNotifications([...notifications, notification]);
    // Set the other view notification to the newly added notification
    setOtherViewNotification(notification);
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearNotifications, otherViewNotification, setOtherViewNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
*/



import { useReducer } from 'react';
import NotificationContext from './NotificationContext';
import NotificationReducer from './NotificationReducer';

const NotificationProvider = ({ children }) => {
  const [notifications, dispatch] = useReducer(NotificationReducer, []);

  return (
    <NotificationContext.Provider value={{ notifications, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
