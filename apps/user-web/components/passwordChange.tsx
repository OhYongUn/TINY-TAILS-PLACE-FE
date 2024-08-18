import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@repo/ui/components/ui/dialog';
import { Label } from '@repo/ui/components/ui/label';
import { Input } from '@repo/ui/components/ui/input';
import { Button } from '@repo/ui/components/ui/button';
import { useChangePassword } from '@app/hook/user/userService';
import { useAlert } from '@app/components/provider/alertDialogProvider';

interface FormData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface PasswordChangeProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PasswordChange = ({ isOpen, onOpenChange }: PasswordChangeProps) => {
  const { changePassword, isLoading, error } = useChangePassword();
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const changePasswordData = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      };
      const result = await changePassword(changePasswordData);

      if (result.success) {
        showAlert('성공', `비밀번호가 변경 되었습니다`, 'success');
      } else {
        showAlert('실패', `${result.message}.`, 'error');
      }
      onOpenChange(false);
      reset();
    } catch (error) {
      showAlert(
        '실패',
        '알수없는이유로 비밀번호 변경이 실패하였습니다',
        'error',
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">비밀번호 변경</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>비밀번호 변경</DialogTitle>
          <DialogDescription>
            현재 비밀번호를 입력하고, 변경하려면 새 비밀번호를 입력하세요.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-1">
              <Label htmlFor="currentPassword">현재 비밀번호</Label>
              <Input
                id="currentPassword"
                type="password"
                {...register('currentPassword', {
                  required: '현재 비밀번호는 필수입니다',
                })}
              />
              {errors.currentPassword && (
                <span className="text-red-500">
                  {errors.currentPassword.message}
                </span>
              )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="newPassword">새 비밀번호</Label>
              <Input
                id="newPassword"
                type="password"
                {...register('newPassword', {
                  required: '새 비밀번호는 필수입니다',
                  minLength: {
                    value: 8,
                    message: '비밀번호는 최소 8자 이상이어야 합니다',
                  },
                })}
              />
              {errors.newPassword && (
                <span className="text-red-500">
                  {errors.newPassword.message}
                </span>
              )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="confirmNewPassword">새 비밀번호 확인</Label>
              <Input
                id="confirmNewPassword"
                type="password"
                {...register('confirmNewPassword', {
                  required: '새 비밀번호 확인은 필수입니다',
                  validate: (value, formValues) =>
                    value === formValues.newPassword ||
                    '새 비밀번호가 일치하지 않습니다',
                })}
              />
              {errors.confirmNewPassword && (
                <span className="text-red-500">
                  {errors.confirmNewPassword.message}
                </span>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">비밀번호 변경하기</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordChange;
