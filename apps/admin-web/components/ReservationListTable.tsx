// ReservationTable.tsx
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

export default function ReservationListTable({ reservations, loading }) {
  const handleAction = (action: string, id: number) => {
    console.log(`${action} for reservation ${id}`);
    // 여기에 각 액션에 대한 로직을 구현합니다.
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mb-4 space-x-2">
        <Button variant="outline">예약 확정</Button>
        <Button variant="outline">체크인</Button>
        <Button variant="outline">체크아웃</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox />
              </TableHead>
              <TableHead>예약자</TableHead>
              <TableHead>객실 번호</TableHead>
              <TableHead>체크인</TableHead>
              <TableHead>체크아웃</TableHead>
              <TableHead>상태</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{reservation.guest}</TableCell>
                <TableCell>{reservation.room}</TableCell>
                <TableCell>{reservation.checkIn}</TableCell>
                <TableCell>{reservation.checkOut}</TableCell>
                <TableCell>{reservation.status}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => handleAction('체크인', reservation.id)}
                      >
                        체크인
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction('체크아웃', reservation.id)}
                      >
                        체크아웃
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          handleAction('예약자 정보', reservation.id)
                        }
                      >
                        예약자 정보
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleAction('예약 정보', reservation.id)
                        }
                      >
                        예약 정보
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleAction('결제 상세', reservation.id)
                        }
                      >
                        결제 상세
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
