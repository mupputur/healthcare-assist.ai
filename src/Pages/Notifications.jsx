import React, { useContext, useEffect } from "react";
import { NotificationContext } from "../context/NotificationContext";

const Notifications = () => {
  const { notifications, markAllRead } = useContext(NotificationContext);

  // 👉 Run once when the page mounts
  useEffect(() => {
    markAllRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Notifications</h1>

      {notifications.length === 0 ? (
        <p>No notifications yet!</p>
      ) : (
        <ul>
          {notifications.map((n) => (
            <li key={n.id} style={{ fontWeight: n.read ? "normal" : "bold" }}>
              {n.message} - {new Date(n.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
