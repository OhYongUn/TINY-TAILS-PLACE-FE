// app/(afterLogin)/layout.tsx
import MainLayout from '@app/components/MainLayout';
import { AuthProvider } from '@app/components/AuthProvider';

export default function AfterLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
