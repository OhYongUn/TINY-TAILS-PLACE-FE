'use client';

import { usePathname } from 'next/navigation';
import Header from "@app/components/layout/Header";
import Footer from "@app/components/layout/Footer";

const pagesWithoutHeaderFooter = ['/streaming'];

export default function ConditionalHeaderFooter({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showHeaderFooter = !pagesWithoutHeaderFooter.includes(pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      {children}
      {showHeaderFooter && <Footer />}
    </>
  );
}
