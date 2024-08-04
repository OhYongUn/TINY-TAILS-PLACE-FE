'use client';

import { usePathname } from 'next/navigation';
import Header from '@app/components/layout/Header';
import Footer from '@app/components/layout/Footer';
import StreamingHeader from '@app/components/streamingHeader';

const pagesWithoutHeaderFooter = ['/streaming'];

export default function ConditionalHeaderFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showHeaderFooter = !pagesWithoutHeaderFooter.includes(pathname);
  return (
    <>
      {pathname === '/streaming' && <StreamingHeader />}
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}
