'use client';
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import CustomAlertDialog from '@app/components/CustomAlertDialog';

interface AlertContextType {
  showAlert: (
    title: string,
    message: string,
    type: 'success' | 'error',
  ) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertDialogProvider = ({ children }: AlertProviderProps) => {
  const [alert, setAlert] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const showAlert = useCallback(
    (title: string, message: string, type: 'success' | 'error') => {
      setAlert({ show: true, title, message, type });
    },
    [],
  );

  const hideAlert = useCallback(() => {
    setAlert(null);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {alert && (
        <CustomAlertDialog
          title={alert.title}
          message={alert.message}
          type={alert.type}
          isOpen={alert.show}
          onClose={hideAlert}
        />
      )}
      {children}
    </AlertContext.Provider>
  );
};
