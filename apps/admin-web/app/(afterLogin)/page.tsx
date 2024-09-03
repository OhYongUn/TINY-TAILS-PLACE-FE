'use client';

import React from 'react';
import MainLayout from '@app/components/MainLayout';

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        호텔 예약 관리 대시보드
      </h1>
      <p className="text-gray-600">
        호텔 예약 관리 시스템에 오신 것을 환영합니다. 왼쪽 사이드바에서 원하는
        메뉴를 선택하여 시작하세요.
      </p>
      {/* 스크롤 테스트를 위한 추가 컨텐츠 */}
      {[...Array(20)].map((_, i) => (
        <p key={i} className="mt-4 text-gray-600">
          이것은 스크롤 테스트를 위한 더미 텍스트입니다. 스크롤해도 사이드바와
          헤더가 고정되어 있는지 확인해보세요.
        </p>
      ))}
    </>
  );
}
