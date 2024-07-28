"use client";
import {useForm, SubmitHandler} from 'react-hook-form';

import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle} from "@repo/ui/components/ui/dialog";
import {Button} from "@repo/ui/components/ui/button";
import {Label} from "@repo/ui/components/ui/label";
import React from "react";
import {Input} from "@repo/ui/components/ui/input";

type LoginFormValues = {
    email: string;
    password: string;
};


const Login = ({setIsLoginOpen, setIsSignUpOpen}) => {
    console.log('loginmodea22222l')

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormValues>();


    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        console.log('Login data:', data);
        try {
            // 여기에 로그인 API 요청을 추가하세요
            // const response = await axios.post('API_ENDPOINT', data);
            // console.log('Login success:', response.data);
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    const handleSignup = () => {
        setIsLoginOpen(false);  // 로그인 모달 닫기
        setIsSignUpOpen(true);  // 회원가입 모달 열기
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
