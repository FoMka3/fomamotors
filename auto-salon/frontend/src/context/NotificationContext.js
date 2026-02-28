import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(null);
    const [open, setOpen] = useState(false);

    const showNotification = (message, type = 'info') => {
        setNotification({ message, type });
        setOpen(true);
    };

    const hideNotification = () => {
        setOpen(false);
    };

    return (
        <NotificationContext.Provider value={{
            notification,
            open,
            showNotification,
            hideNotification
        }}>
            {children}
        </NotificationContext.Provider>
    );
};