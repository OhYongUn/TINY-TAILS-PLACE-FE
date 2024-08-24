'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/ui/card';
import ReservationTable from './ReservationTable';
import { useReservationStore } from '@app/store/useReservationStore';
import userStore from '@app/store/userStore';
import { BookingStatus } from '@app/interface/bookings/reservation';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@repo/ui/components/ui/tabs';
import Pagination from '@app/components/Pagination';

const ReservationPage = () => {
  const { reservations, isLoading, error, fetchReservations, pagination } =
    useReservationStore();
  const { user } = userStore();
  const [activeTab, setActiveTab] = useState<BookingStatus>(
    BookingStatus.CONFIRMED,
  );
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (user?.id) {
      fetchReservations({ page: currentPage, pageSize: 10 }, user.id);
    }
  }, [user?.id, fetchReservations, activeTab, currentPage]);

  const handleTabChange = (status: BookingStatus) => {
    setActiveTab(status);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error.message}</div>;

  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>예약</CardTitle>
          <CardDescription>예정된 예약을 확인하고 관리하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue={BookingStatus.CONFIRMED}
            onValueChange={(value) => handleTabChange(value as BookingStatus)}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value={BookingStatus.CONFIRMED}>
                다가오는 예약
              </TabsTrigger>
              <TabsTrigger value={BookingStatus.COMPLETED}>
                완료된 예약
              </TabsTrigger>
              <TabsTrigger value={BookingStatus.CANCELLED}>
                취소된 예약
              </TabsTrigger>
            </TabsList>
            <TabsContent value={BookingStatus.CONFIRMED}>
              <ReservationTable reservations={reservations} />
            </TabsContent>
            <TabsContent value={BookingStatus.COMPLETED}>
              <ReservationTable reservations={reservations} />
            </TabsContent>
            <TabsContent value={BookingStatus.CANCELLED}>
              <ReservationTable reservations={reservations} />
            </TabsContent>
          </Tabs>

          {pagination && (
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
              hasNextPage={pagination.hasNextPage}
              hasPreviousPage={pagination.hasPreviousPage}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservationPage;
