'use client';
import React from 'react';
import Login from '@app/app/(beforeLogin)/login/_components/Login';

export default function LoginHome() {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-2">
      <Login />
    </div>
  );
}
