'use client';
import { useForm, SubmitHandler } from 'react-hook-form';

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/ui/dialog';
import { Button } from '@repo/ui/components/ui/button';
import { Label } from '@repo/ui/components/ui/label';
import React, { useState } from 'react';
import { Input } from '@repo/ui/components/ui/input';
import useUserStore from '@app/store/userStore';
import { ModalInterface } from '@app/interface/compontes/interface';
import { useLogin } from '@app/hook/auth/authService';
import { LoginResponse } from '@app/interface/auth/authTypes';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = ({ setIsLoginOpen, setIsSignUpOpen }: ModalInterface) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>();
  const setUser = useUserStore((state) => state.setUser);
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const response = await useLogin(data);
      console.log('response', response);

      if ('success' in response && response.success) {
        const { user, accessToken, refreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(user);
        reset();
        if (setIsLoginOpen) {
          setIsLoginOpen(false);
        }
      } else {
        if ('statusCode' in response && response.statusCode === 404) {
          setError('존재하지않는 사용자입니다.');
          return;
        }
        if ('message' in response) {
          setError(response.message || '로그인에 실패했습니다.');
        }
      }
    } catch (error: any) {
      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleSignup = () => {
    if (setIsLoginOpen && setIsSignUpOpen) {
      setIsLoginOpen(false);
      setIsSignUpOpen(true);
    }
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Login</DialogTitle>
        <DialogDescription>
          Sign in to your account using one of the following options.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              {...register('email', { required: '이메일을 입력해주세요' })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              {...register('password', { required: '비밀번호를 입력해주세요' })}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          {error && <p className="text-red-500">{error}</p>}

          <Button
            type="submit"
            variant="outline"
            className="bg-gray-800 text-white hover:bg-gray-900"
          >
            로그인
          </Button>
          <Button
            variant="outline"
            onClick={handleSignup}
            className="bg-gray-800 text-white hover:bg-gray-900"
          >
            회원가입
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};
export default Login;
