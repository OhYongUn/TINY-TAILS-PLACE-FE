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
import { BookingStatusMap } from '@app/types/reservation/type';
import { formatPhoneNumber } from '@app/utils/utils';
import { format } from 'date-fns';
import { useAlert } from '@app/components/AlertDialogProvider';
import { useReservationStore } from '@app/store/reservation-store';

export default function ReservationListTable() {
  const { reservations, updateStatus } = useReservationStore();
  const { showAlert } = useAlert();

  const handleUpdateStatus = async (action: string, id: string) => {
    console.log(`${action} for reservation ${id}`);
    try {
      const result = await updateStatus(action, id);
      console.log('result', result);
      let msg = '';
      if (result.success) {
        switch (action) {
          case 'CHECKED_IN':
            msg = '체크 인 되었습니다';
            break;
          case 'CHECKED_OUT':
            msg = '체크 아웃 되었습니다.';
            break;
          default:
            msg = '예약 상태가 업데이트되었습니다.';
        }
        showAlert('성공', msg, 'success');
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
  };

  const openDetailModal = (type: string, id: string) => {
    console.log(`open ${type} modal for reservation ${id}`);
    // 여기에 각 모달에 대한 로직을 구현합니다.
  };
  const renderStatusButtons = (status: string, id: string) => {
    switch (status) {
      case 'CONFIRMED':
        return (
          <>
            <DropdownMenuLabel>상태 변경</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => handleUpdateStatus('CHECKED_IN', id)}
            >
              체크인
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        );
      case 'CHECKED_IN':
        return (
          <>
            <DropdownMenuLabel>상태 변경</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => handleUpdateStatus('CHECKED_OUT', id)}
            >
              체크아웃
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        );
      default:
        return null;
    }
  };
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="text-center">
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox />
            </TableHead>
            <TableHead>예약 번호</TableHead>
            <TableHead>이름</TableHead>
            <TableHead>전화 번호</TableHead>
            <TableHead>객실 번호</TableHead>
            <TableHead>체크인</TableHead>
            <TableHead>체크아웃</TableHead>
            <TableHead>상태</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation: any) => (
            <TableRow key={reservation.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>{reservation.id}</TableCell>
              <TableCell>{reservation.user.name}</TableCell>
              <TableCell>{formatPhoneNumber(reservation.user.phone)}</TableCell>
              <TableCell>{reservation.roomDetail.roomNumber}</TableCell>
              <TableCell>
                {format(new Date(reservation.checkInDate), 'yyyy-MM-dd')}
              </TableCell>
              <TableCell>
                {format(new Date(reservation.checkOutDate), 'yyyy-MM-dd')}
              </TableCell>
              <TableCell>
                {BookingStatusMap[reservation.status] || reservation.status}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {renderStatusButtons(reservation.status, reservation.id)}
                    <DropdownMenuLabel>상세 정보</DropdownMenuLabel>

                    <DropdownMenuItem
                      onClick={() =>
                        openDetailModal('bookingDetails', reservation.id)
                      }
                    >
                      예약 정보
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        openDetailModal('payments', reservation.id)
                      }
                    >
                      결제 상세
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() =>
                        openDetailModal('histories', reservation.id)
                      }
                    >
                      히스토리
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
