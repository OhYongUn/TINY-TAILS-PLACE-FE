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

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface PasswordChangeProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const PasswordChange = ({ isOpen, onOpenChange }: PasswordChangeProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordChangeData>();

  const onSubmit = async (data: PasswordChangeData) => {
    try {
      // 여기에 실제 비밀번호 변경 API 호출 로직을 구현합니다.
      // 예: await api.changePassword(data);
      console.log('Password change request:', data);

      // 성공 시 처리
      alert('비밀번호가 성공적으로 변경되었습니다.');
      onOpenChange(false);
      reset();
    } catch (error) {
      // 오류 처리
      console.error('비밀번호 변경 중 오류 발생:', error);
      alert('비밀번호 변경에 실패했습니다. 다시 시도해 주세요.');
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
