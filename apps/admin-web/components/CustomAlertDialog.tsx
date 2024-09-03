import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@repo/ui/components/ui/alert-dialog';
import { CheckCircle2, AlertCircle } from '@repo/ui/components/ui/lucide-react';

interface CustomAlertDialogProps {
  title: string;
  message: string;
  type: 'success' | 'error';
  isOpen: boolean;
  onClose: () => void;
}

const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
  title,
  message,
  type,
  isOpen,
  onClose,
}) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            {type === 'success' ? (
              <CheckCircle2 className="h-6 w-6 text-green-500 mr-2" />
            ) : (
              <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
            )}
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onClose}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlertDialog;
