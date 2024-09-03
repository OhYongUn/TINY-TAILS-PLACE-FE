'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
import { menuItems } from './SidebarMenu'; // menuItems를 import

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const findSelectedMenu = (items: any) => {
      for (const item of items) {
        if (item.link === pathname) {
          return item.name;
        }
        if (item.submenu) {
          const subMenuItem = item.submenu.find(
            (sub: any) => sub.link === pathname,
          );
          if (subMenuItem) {
            return `${item.name} > ${subMenuItem.name}`;
          }
        }
      }
      return '';
    };

    setSelectedMenu(findSelectedMenu(menuItems));
  }, [pathname]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div
        className={`flex flex-1 flex-col transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-56'}`}
      >
        <Header
          setSidebarOpen={setSidebarOpen}
          sidebarCollapsed={sidebarCollapsed}
          selectedMenu={selectedMenu}
        />
        <main className="flex-1 overflow-auto bg-gray-100 p-4 lg:p-4 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
