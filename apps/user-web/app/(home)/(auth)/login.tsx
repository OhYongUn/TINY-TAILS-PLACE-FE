"use client";
import {useForm, SubmitHandler} from 'react-hook-form';

import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@repo/ui/components/ui/dialog";
import {Button} from "@repo/ui/components/ui/button";
import {Label} from "@repo/ui/components/ui/label";
import React, {useState} from "react";
import {Input} from "@repo/ui/components/ui/input";
import useUserStore from "@app/store/userStore";
import {ModalInterface} from "@app/interface/compontes/interface";
import {useLogin} from "@app/hook/auth/auth";
import {LoginResponse} from "@app/interface/auth/auth";

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = ({setIsLoginOpen, setIsSignUpOpen}: ModalInterface) => {
  const {register, handleSubmit, formState: {errors}, reset} = useForm<LoginFormValues>();
  const setUser = useUserStore((state) => state.setUser);
  const [error, setError] = useState('');

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const response: LoginResponse = await useLogin(data);

      if (response.success && response.data) {
        const {user, accessToken, refreshToken} = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        setUser(user);
        reset();
        if (setIsLoginOpen) {
          setIsLoginOpen(false);
        }
      } else {
        setError(response.error || "Login failed. Please try again.");
      }
    } catch (error: any) {
      // 네트워크 오류 등 예상치 못한 오류 처리
      console.error("Login request failed:", error);
      setError("Failed to connect to the server. Please try again later.");
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
        <DialogDescription>Sign in to your account using one of the following options.</DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              {...register("email", {required: "이메일을 입력해주세요"})}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              {...register("password", {required: "비밀번호를 입력해주세요"})}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <Button type="submit" variant="outline" className="bg-gray-800 text-white hover:bg-gray-900">
            Login
          </Button>
          <Button variant="outline" onClick={handleSignup}
                  className="bg-gray-800 text-white hover:bg-gray-900">
            Sign up
          </Button>
        </div>
      </form>
    </DialogContent>
  );


}
export default Login;
