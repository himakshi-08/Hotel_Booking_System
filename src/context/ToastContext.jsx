import { createContext, useContext, useState } from 'react';
import Toast from '../components/Toast';

// Step 1: Create a Context to share toast functionality across the app
const ToastContext = createContext();

// Step 2: Custom hook to use toast in any component
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

// Step 3: Provider component that wraps the app
export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]); // Array to hold multiple toasts

    // Function to show a new toast
    const showToast = (message, type = 'info') => {
        const id = Date.now(); // Unique ID for each toast
        const newToast = { id, message, type };

        // Add new toast to the array using spread operator
        setToasts(prevToasts => [...prevToasts, newToast]);
    };

    // Function to remove a toast by ID
    const removeToast = (id) => {
        // Use filter() to keep all toasts except the one with matching ID
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container - Fixed position at top-right */}
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
                {/* Use map() to render each toast */}
                {toasts.map(toast => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};
