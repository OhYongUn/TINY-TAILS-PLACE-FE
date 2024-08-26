// components/SidebarMenu.tsx
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

const menuItems = [
  {
    name: '예약 현황',
    icon: Calendar,
    submenu: [
      { name: '신규 예약', icon: Calendar },
      { name: '예약 변경', icon: Calendar },
      { name: '예약 취소', icon: Calendar },
    ],
  },
  {
    name: '사용자 관리',
    icon: Users,
    submenu: [
      { name: '고객 목록', icon: Users },
      { name: '고객 정보 수정', icon: UserCog },
    ],
  },
  {
    name: '관리자 관리',
    icon: UserCog,
    submenu: [
      { name: '관리자 목록', icon: Users },
      { name: '권한 설정', icon: UserCog },
    ],
  },
  {
    name: '상품 관리',
    icon: Building,
    submenu: [
      { name: '객실 목록', icon: Building },
      { name: '객실 타입 관리', icon: Building },
      { name: '요금 설정', icon: ShoppingCart },
    ],
  },
  {
    name: '주문 관리',
    icon: ShoppingCart,
    submenu: [
      { name: '결제 내역', icon: ShoppingCart },
      { name: '환불 처리', icon: ShoppingCart },
    ],
  },
];

export default function SidebarMenu({ collapsed }: { collapsed: boolean }) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (itemName: string) => {
    setOpenItems((prev) =>
      prev.includes(itemName)
        ? prev.filter((item) => item !== itemName)
        : [...prev, itemName],
    );
  };

  return (
    <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
      {menuItems.map((item) => (
        <Collapsible
          key={item.name}
          open={openItems.includes(item.name)}
          onOpenChange={() => !collapsed && toggleItem(item.name)}
        >
          <CollapsibleTrigger className="flex w-full items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-200">
            <item.icon className="h-6 w-6 mr-3" />
            {!collapsed && (
              <>
                {item.name}
                {item.submenu.length > 0 && (
                  <ChevronDown className="h-4 w-4 ml-auto" />
                )}
              </>
            )}
          </CollapsibleTrigger>
          {!collapsed && item.submenu.length > 0 && (
            <CollapsibleContent className="ml-6 mt-1 space-y-1">
              {item.submenu.map((subItem) => (
                <a
                  key={subItem.name}
                  href="#"
                  className="flex items-center rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                >
                  <subItem.icon className="h-4 w-4 mr-3" />
                  {subItem.name}
                </a>
              ))}
            </CollapsibleContent>
          )}
        </Collapsible>
      ))}
    </nav>
  );
}
