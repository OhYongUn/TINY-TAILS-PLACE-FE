'use client';

import React from 'react';
import { MoreHorizontal } from '@repo/ui/components/ui/lucide-react';
import { Button } from '@repo/ui/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/components/ui/table';
import { Checkbox } from '@repo/ui/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/ui/dropdown-menu';
import { formatPhoneNumber } from '@app/utils/utils';
import { format } from 'date-fns';
import { useAlert } from '@app/components/AlertDialogProvider';
import { User } from '@app/types/users/type';
import { Admin } from '@app/types/admins/type';
interface AdminsListTableProps {
  list: Admin[];
}

export default function AdminsListTable({ list }: AdminsListTableProps) {
  const { showAlert } = useAlert();

  /*const handleUpdateStatus = async (action: string, id: string) => {
    try {
      const result = await updateUserStatus(action, id);
      if (result.success) {
        showAlert('성공', '사용자 상태가 업데이트되었습니다.', 'success');
      } else {
        showAlert(
          '실패',
          result.message || '알 수 없는 오류가 발생했습니다.',
          'error',
        );
      }
    } catch (error: any) {
      showAlert(
        '오류',
        error.message || '알 수 없는 오류가 발생했습니다.',
        'error',
      );
    }
  };*/

  /*const openDetailModal = (type: string, id: string) => {
    openUserDialog(id, type);
  };*/

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="text-center">
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            <TableHead>이름</TableHead>
            <TableHead>이메일</TableHead>
            <TableHead>부서</TableHead>
            <TableHead>전화 번호</TableHead>
            <TableHead>가입일</TableHead>
            {/*<TableHead>상태</TableHead>*/}
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>{formatPhoneNumber(user.phone)}</TableCell>
              <TableCell>
                {format(new Date(user.createdAt), 'yyyy-MM-dd')}
              </TableCell>
              {/*<TableCell>{user.status}</TableCell>*/}
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>사용자 관리</DropdownMenuLabel>
                    <DropdownMenuItem
                    //  onClick={() => handleUpdateStatus('ACTIVATE', user.id)}
                    >
                      활성화
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    //   onClick={() => handleUpdateStatus('DEACTIVATE', user.id)}
                    >
                      비활성화
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>상세 정보</DropdownMenuLabel>
                    <DropdownMenuItem
                    //   onClick={() => openDetailModal('userDetails', user.id)}
                    >
                      사용자 정보
                    </DropdownMenuItem>
                    <DropdownMenuItem
                    //  onClick={() => openDetailModal('bookingHistory', user.id)}
                    >
                      예약 내역
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
