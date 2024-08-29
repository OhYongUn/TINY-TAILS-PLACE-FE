'use client';
import {
  Menu,
  Bell,
  Mail,
  LogOut,
  Settings,
} from '@repo/ui/components/ui/lucide-react';
import { Button } from '@repo/ui/components/ui/button';
import { logout } from '@app/actions/auth/auth';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@app/store/auth-store';

export default function Header({
  setSidebarOpen,
  sidebarCollapsed,
  selectedMenu,
}: {
  setSidebarOpen: (open: boolean) => void;
  sidebarCollapsed: boolean;
  selectedMenu: string;
}) {
  const router = useRouter();
  const { clearAuth } = useAuthStore();
  const handleLogOut = async () => {
    console.log('logout');
    await logout();
    router.push('/login');
    clearAuth();
  };
  return (
    <header
      className={`fixed top-0 right-0 left-0 z-20 flex h-16 items-center justify-between border-b bg-white px-4 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:left-20' : 'lg:left-56'}`}
    >
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden mr-2"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">사이드바 열기</span>
        </Button>
        <span className="text-lg font-semibold">{selectedMenu}</span>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
          <span className="sr-only">알림</span>
        </Button>
        <Button variant="ghost" size="icon">
          <Mail className="h-5 w-5" />
          <span className="sr-only">메시지</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleLogOut}>
          <LogOut className="h-4 w-4 mr-2" />
          <span className="sr-only">로그아웃</span>
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">설정</span>
        </Button>
      </div>
    </header>
  );
}
