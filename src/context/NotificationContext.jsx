import React, { createContext, useContext, useState } from "react";

// ✅ Export Context
export const NotificationContext = createContext();

// ✅ Custom Hook
export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // ➕ Add notification
  const addNotification = (message) => {
    setNotifications((prev) => [
      ...prev,
      { id: Date.now(), message, read: false, createdAt: new Date() },
    ]);
  };

  // ✅ Mark all as read
  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, markAllRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
