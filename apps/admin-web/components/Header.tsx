'user client';
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
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const router = useRouter();
  const { clearAuth } = useAuthStore();
  const handleLogOut = async () => {
    console.log('logout');
    await logout();
    router.push('/login'); // 로그아�� 성공 후 리다이��트
    clearAuth();
  };
  return (
    <header className="fixed top-0 right-0 left-0 z-20 flex h-16 items-center justify-between border-b bg-white px-4 lg:left-64">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="h-6 w-6" />
        <span className="sr-only">사이드바 열기</span>
      </Button>
      <div className="flex-1" />
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
