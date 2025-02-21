import react, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const notify = (message, type = "info") => {
    const id = Date.now();

    setNotifications((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        <AnimatePresence>
          {notifications.map(({ id, message, type }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className={`alert alert-${type === "success" ? "success" : type === "error" ? "danger" : "primary"
                } alert-dismissible fade show`}
              role="alert"
            >
              {message}
              <button type="button" className="btn-close" onClick={() => setNotifications((prev) => prev.filter((n) => n.id !== id))}></button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
