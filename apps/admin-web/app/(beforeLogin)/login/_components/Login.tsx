'use client';

import { Button } from '@repo/ui/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { Label } from '@repo/ui/components/ui/label';
import { Checkbox } from '@repo/ui/components/ui/checkbox';
import { Input } from '@repo/ui/components/ui/input';
import { PawPrintIcon } from '@repo/ui/components/ui/icons';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@app/store/auth-store';
import { login } from '@app/actions/auth/auth';

export default function Login() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  async function handleSubmit(formData: FormData) {
    const result = await login(formData);
    if (result.success) {
      setAuth(result.user, result.roles);
      router.push('/'); // 로그인 성공 후 리다이렉트
    } else {
      // 에러 처리
      console.error(result.error);
    }
  }

  return (
    <>
      <div className="relative hidden lg:block">
        <img
          src="/jelly.jpeg"
          alt="Login Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
          style={{ aspectRatio: '1920/1080', objectFit: 'cover' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/50" />
      </div>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <div className="flex items-center justify-center">
              <PawPrintIcon />
            </div>
            <h6 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
              냐옹냐옹!? 멍멍!?
            </h6>
          </div>
          <form className="mt-8 space-y-8" action={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-t-md border border-gray-300 px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div>
                <Label htmlFor="password" className="sr-only">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-2 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-primary sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="remember-me"
                  name="remember-me"
                  className="h-4 w-4 rounded"
                />
                <Label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-muted-foreground"
                >
                  비밀번호 기억하기
                </Label>
              </div>
              <div className="text-sm">
                <Link
                  href="#"
                  className="font-medium text-primary hover:text-primary-foreground"
                  prefetch={false}
                >
                  비밀번호를 잊으셨나요?
                </Link>
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                로그인
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
