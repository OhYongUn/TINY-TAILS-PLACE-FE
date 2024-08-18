import React from 'react';
import { Alert } from '@repo/ui/components/ui/alert';
import { CheckCircle2, AlertCircle } from '@repo/ui/components/ui/lucide-react';
import { AlertDescription, AlertTitle } from '@repo/ui/components/ui/alert';

interface CustomAlertProps {
  title: string;
  message: string;
  type: 'success' | 'error';
}

const CustomAlert = ({ title, message, type }: CustomAlertProps) => {
  return (
    <Alert
      variant={type === 'success' ? 'default' : 'destructive'}
      className="mb-4"
    >
      {type === 'success' ? (
        <CheckCircle2 className="h-4 w-4" />
      ) : (
        <AlertCircle className="h-4 w-4" />
      )}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default CustomAlert;
