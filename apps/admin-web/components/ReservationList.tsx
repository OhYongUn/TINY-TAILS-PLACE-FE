'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import ReservationListSearchFilters from './ReservationListSearchFilters';
import ReservationListTable from './ReservationListTable';
import ReservationListPagination from './ReservationListPagination';
import { fetchReservations } from '@app/actions/reservations/reservations-service';
import { format } from 'date-fns';
import { LoadingOverlay } from './LoadingOverlay';

export default function ReservationList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reservations, setReservations] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const searchOption = searchParams.get('searchOption');
  const searchQuery = searchParams.get('searchQuery');
  const sortOption = searchParams.get('sortOption');
  const page = searchParams.get('page');
  const pageSize = searchParams.get('pageSize');
  const status = searchParams.get('status');

  const [dateRange, setDateRange] = useState<DateRange | undefined>(() => {
    if (from && to) {
      return {
        from: new Date(from),
        to: new Date(to),
      };
    }
    const now = new Date();
    return {
      from: new Date(now.getFullYear(), now.getMonth(), 1),
      to: new Date(now.getFullYear(), now.getMonth() + 1, 0),
    };
  });

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        const data = await fetchReservations({
          fromDate: dateRange?.from
            ? format(dateRange.from, 'yyyy-MM-dd')
            : undefined,
          toDate: dateRange?.to
            ? format(dateRange.to, 'yyyy-MM-dd')
            : undefined,
          searchOption: searchOption || undefined,
          searchQuery: searchQuery || undefined,
          sortOption: sortOption || 'createdAt_desc',
          page: page ? parseInt(page) : 1,
          pageSize: pageSize ? parseInt(pageSize) : 10,
          status: status ? status : undefined,
        });
        setReservations(data.bookings);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [
    dateRange,
    searchOption,
    searchQuery,
    sortOption,
    status,
    page,
    pageSize,
  ]);

  const updateFilters = (newFilters: any) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === undefined) {
        params.delete(key);
      } else if (key === 'dateRange') {
        const range = value as DateRange;
        if (range.from) params.set('from', format(range.from, 'yyyy-MM-dd'));
        if (range.to) params.set('to', format(range.to, 'yyyy-MM-dd'));
        setDateRange(range);
      } else if (key === 'pageSize') {
        params.set(key, value as string);
      } else if (key === 'status') {
        params.set(key, value as string);
      } else {
        params.set(key, value as string);
      }
    });
    params.set('page', '1');
    router.push(`/reservations/list?${params.toString()}`);
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="p-4 bg-white container mx-auto py-10">
        <ReservationListSearchFilters
          dateRange={dateRange}
          searchOption={searchOption || ''}
          searchQuery={searchQuery || ''}
          sortOption={sortOption || ''}
          status={status}
          pageSize={pageSize}
          onUpdateFilters={updateFilters}
        />
        <ReservationListTable reservations={reservations} />
        <ReservationListPagination
          currentPage={page ? parseInt(page) : 1}
          totalPages={totalPages}
          onPageSizeChange={(newPageSize: any) =>
            updateFilters({ pageSize: newPageSize })
          }
        />
      </div>
    </>
  );
}
