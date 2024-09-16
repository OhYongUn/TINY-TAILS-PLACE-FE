// components/SidebarMenu.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Calendar,
  Users,
  UserCog,
  Building,
  ShoppingCart,
  ChevronDown,
} from '@repo/ui/components/ui/lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/ui/components/ui/collapsible';
import { useState } from 'react';

export const menuItems = [
  {
    name: '예약 현황',
    icon: Calendar,
    link: '',
    submenu: [
      { name: '객실 현황 ', icon: Calendar, link: '/reservations' },
      { name: '예약 현황', icon: Calendar, link: '/reservations/list' },
      { name: '예약 취소', icon: Calendar, link: '/reservations/cancel' },
    ],
  },
  {
    name: '사용자 관리',
    icon: Users,
    link: '',
    submenu: [
      { name: '고객 목록', icon: Users, link: '/users' },
      { name: '고객 정보 수정', icon: UserCog, link: '/users/edit' },
    ],
  },
  {
    name: '관리자 관리',
    icon: UserCog,
    link: '',
    submenu: [
      { name: '관리자 목록', icon: Users, link: '/admins' },
      { name: '권한 관리', icon: UserCog, link: '/roles' },
    ],
  },
  {
    name: '상품 관리',
    icon: Building,
    link: '/products',
    submenu: [
      { name: '객실 목록', icon: Building, link: '/products/rooms' },
      { name: '객실 타입 관리', icon: Building, link: '/products/room-types' },
      { name: '요금 설정', icon: ShoppingCart, link: '/products/pricing' },
    ],
  },
  {
    name: '주문 관리',
    icon: ShoppingCart,
    link: '/orders',
    submenu: [
      { name: '결제 내역', icon: ShoppingCart, link: '/orders/payments' },
      { name: '환불 처리', icon: ShoppingCart, link: '/orders/refunds' },
    ],
  },
];

export default function SidebarMenu({ collapsed }: { collapsed: boolean }) {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleItem = (itemName: string) => {
    setOpenItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName],
    );
  };

  const isActive = (link: string) => pathname === link;

  return (
    <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
      {menuItems.map((item) => (
        <Collapsible
          key={item.name}
          open={openItems.includes(item.name)}
          onOpenChange={() => !collapsed && toggleItem(item.name)}
        >
          <CollapsibleTrigger asChild>
            <Link
              href={item.link}
              onClick={() => console.log(`Navigating to: ${item.link}`)}
              className={`flex w-full items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-200 ${
                isActive(item.link) ? 'bg-gray-200' : ''
              }`}
            >
              <item.icon className="h-6 w-6 mr-3" />
              {!collapsed && (
                <>
                  {item.name}
                  {item.submenu.length > 0 && (
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  )}
                </>
              )}
            </Link>
          </CollapsibleTrigger>
          {!collapsed && item.submenu.length > 0 && (
            <CollapsibleContent className="ml-6 mt-1 space-y-1">
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.name}
                  href={subItem.link}
                  onClick={() => console.log(`Navigating to: ${item.link}`)}
                  className={`flex items-center rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 ${
                    isActive(subItem.link) ? 'bg-gray-100' : ''
                  }`}
                >
                  <subItem.icon className="h-4 w-4 mr-3" />
                  {subItem.name}
                </Link>
              ))}
            </CollapsibleContent>
          )}
        </Collapsible>
      ))}
    </nav>
  );
}
