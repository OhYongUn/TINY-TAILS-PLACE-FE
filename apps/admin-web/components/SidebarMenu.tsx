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
  // ... (other menu items)
];

export default function SidebarMenu() {
  return (
    <nav className="flex-1 space-y-1 px-2 py-4 overflow-y-auto">
      {menuItems.map((item) => (
        <Collapsible key={item.name}>
          <CollapsibleTrigger className="flex w-full items-center rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-200">
            <item.icon className="h-6 w-6 mr-3" />
            {item.name}
            {item.submenu.length > 0 && (
              <ChevronDown className="h-4 w-4 ml-auto" />
            )}
          </CollapsibleTrigger>
          {item.submenu.length > 0 && (
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
