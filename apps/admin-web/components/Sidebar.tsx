import { useState } from 'react';
import SidebarMenu from './SidebarMenu';
import { Button } from '@repo/ui/components/ui/button';
import { X } from '@repo/ui/components/ui/lucide-react';
export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  return (
    <aside
      className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:translate-x-0`}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center justify-between px-4">
          <span className="text-2xl font-semibold">호텔 관리자</span>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
            <span className="sr-only">사이드바 닫기</span>
          </Button>
        </div>
        <SidebarMenu />
      </div>
    </aside>
  );
}
