import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col lg:pl-64">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-auto bg-gray-100 p-4 lg:p-6 mt-16">
          {children}
        </main>
      </div>
    </div>
  );
}
