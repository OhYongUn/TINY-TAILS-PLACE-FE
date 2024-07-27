import React, { useState } from "react";
import { useForm, SubmitHandler, FieldPathValue } from "react-hook-form";
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@repo/ui";
import { Button } from "@repo/ui";
import { Label } from "@repo/ui";
import { Input } from "@repo/ui";
import axios from "axios";

type SignUpFormValues = {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    agreeToTerms: boolean;
};

const SignUp = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<SignUpFormValues>();
    const [phone, setPhone] = useState("");

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const cleaned = value.replace(/\D/g, ''); // 숫자만 추출
        const match = cleaned.match(/^(\d{3})(\d{3,4})?(\d{4})?$/);

        if (match) {
            const formatted = `${match[1]}${match[2] ? '-' + match[2] : ''}${match[3] ? '-' + match[3] : ''}`;
            setPhone(formatted); // 상태 업데이트
            setValue("phone", formatted as FieldPathValue<SignUpFormValues, "phone">); // React Hook Form의 값 업데이트
            event.target.maxLength = 13; // 최대 입력 가능한 길이 설정 (예: "010-1234-5678")
        } else {
            setPhone(value); // 상태 업데이트
            event.target.maxLength = 13; // 최대 입력 가능한 길이 설정
        }
    };

    const onSubmit: SubmitHandler<SignUpFormValues> = async data => {
        try {
            const response = await axios.post('http://localhost:3000/auth/signup', data);
        } catch (error) {
            console.error('회원가입 실패:', error.response?.data || error.message);
        }
    };

    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="text-center">회원가입</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">이름</Label>
                        <Input id="name" placeholder="홍길동" {...register("name", { required: "이름을 입력해주세요" })} />
                        {errors.name && <span>{errors.name.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">이메일</Label>
                        <Input id="email" type="email" placeholder="example@example.com" {...register("email", { required: "이메일 주소를 입력해주세요" })} />
                        {errors.email && <span>{errors.email.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">전화번호</Label>
                        <Input id="phone" type="tel" placeholder="010-1234-5678" maxLength={13} value={phone} onChange={handlePhoneChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">비밀번호</Label>
                        <Input id="password" type="password" {...register("password", { required: "비밀번호를 입력해주세요" })} />
                        {errors.password && <span>{errors.password.message}</span>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                        <Input id="confirmPassword" type="password" {...register("confirmPassword", { required: "비밀번호를 다시 입력해주세요" })} />
                        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                    </div>
                    <div className="flex items-center mt-4">
                        <input id="terms" type="checkbox" {...register("agreeToTerms", { required: "서비스 약관에 동의해주세요" })} />
                        <Label htmlFor="terms" className="ml-2">서비스 약관 및 개인정보 보호정책에 동의합니다.</Label>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="w-full">회원가입</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
};

export default SignUp;
