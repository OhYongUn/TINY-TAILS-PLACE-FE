"use client";
import {useForm, SubmitHandler} from 'react-hook-form';

import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@repo/ui/components/ui/dialog";
import {Button} from "@repo/ui/components/ui/button";
import {Label} from "@repo/ui/components/ui/label";
import React from "react";
import {Input} from "@repo/ui/components/ui/input";
import useUserStore from "@app/store/userStore";
import {ModalInterface} from "@app/common/interface/interface";

interface LoginFormValues {
  email: string;
  password: string;
}
const Login = ({setIsLoginOpen , setIsSignUpOpen} : ModalInterface ) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
  const setUser = useUserStore((state) => state.setUser);

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  data }),
        credentials: 'include',
      });
      const responseData = await response.json();

      if (responseData.success) {
        setUser(responseData.user);
      } else {
        console.error("Login failed:", responseData.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
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
