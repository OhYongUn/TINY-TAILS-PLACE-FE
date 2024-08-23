'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import { Button } from '@repo/ui/components/ui/button';
import { Label } from '@repo/ui/components/ui/label';
import { Input } from '@repo/ui/components/ui/input';
import useUserStore from '@app/store/userStore';
import { Controller, useForm } from 'react-hook-form';
import PasswordChange from '@app/components/passwordChange';
import {
  formatPhoneNumber,
  handlePhoneNumberChange,
  isValidPhoneNumber,
} from '@app/utills/phoneMask';
import { useAlert } from '@app/components/provider/alertDialogProvider';
import { useUpdateUser } from '@app/hook/user/userService';

interface UserFormData {
  name: string;
  email: string;
  phone: string;
}

const ProfilePage = () => {
  const { user } = useUserStore();
  const { updateUser, isLoading, error } = useUpdateUser();
  const [isPasswordChangeOpen, setIsPasswordChangeOpen] = useState(false);
  const { showAlert } = useAlert();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserFormData>({
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      const formattedData = {
        ...data,
        phone: data.phone ? data.phone.replace(/-/g, '') : data.phone,
      };

      const result = await updateUser(formattedData);
      if (result.success) {
        showAlert('성공', `회원정보가 수정되었습니다.`, 'success');
      } else {
        showAlert('실패', `${result.message}`, 'error');
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      // 예기치 못한 오류 처리 로직
    }
  };

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>나의 정보</CardTitle>
          <CardDescription>
            귀하의 개인 정보를 확인하고 저장 하세요.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="grid gap-4">
            <div className="grid gap-1">
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                {...register('name', { required: '이름은 필수입니다' })}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user?.email || ''}
                readOnly
                disabled
                className="bg-gray-100"
              />{' '}
            </div>
            <div className="grid gap-1">
              <Label htmlFor="phone">전화번호</Label>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: '전화번호는 필수입니다',
                  validate: (value) =>
                    isValidPhoneNumber(value) || '유효하지 않은 전화번호입니다',
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    id="phone"
                    value={formatPhoneNumber(value)}
                    onChange={(e) =>
                      handlePhoneNumberChange(e.target.value, onChange)
                    }
                    placeholder="010-0000-0000"
                  />
                )}
              />
              {errors.phone && (
                <span className="text-red-500">{errors.phone.message}</span>
              )}
            </div>
          </CardContent>
          <CardFooter className="float-end">
            <Button type="submit">회원정보 수정</Button>
          </CardFooter>
        </form>
        <div className="ml-5">
          <PasswordChange
            isOpen={isPasswordChangeOpen}
            onOpenChange={setIsPasswordChangeOpen}
          />
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
