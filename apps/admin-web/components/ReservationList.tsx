'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { DateRange } from 'react-day-picker';
import ReservationListSearchFilters from './ReservationListSearchFilters';
import ReservationListTable from './ReservationListTable';
import ReservationListPagination from './ReservationListPagination';

// 가짜 데이터 생성 함수와 fetchReservations 함수는 그대로 유지

export default function ReservationList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const searchOption = searchParams.get('searchOption');
  const searchQuery = searchParams.get('searchQuery');
  const sortOption = searchParams.get('sortOption');
  const page = searchParams.get('page');

  const dateRange: DateRange | undefined =
    from && to ? { from: new Date(from), to: new Date(to) } : undefined;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchReservations({
          dateRange,
          searchOption: searchOption || undefined,
          searchQuery: searchQuery || undefined,
          sortOption: sortOption || undefined,
          page: page ? parseInt(page) : 1,
        });
        setReservations(data.reservations);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [from, to, searchOption, searchQuery, sortOption, page]);

  const updateFilters = (newFilters: any) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === undefined) {
        params.delete(key);
      } else if (key === 'dateRange') {
        params.set(
          'from',
          (value as DateRange).from?.toISOString().split('T')[0] || '',
        );
        params.set(
          'to',
          (value as DateRange).to?.toISOString().split('T')[0] || '',
        );
      } else {
        params.set(key, value as string);
      }
    });
    params.set('page', '1');
    router.push(`/reservations/list?${params.toString()}`);
  };

  return (
    <div className="p-4 bg-white container mx-auto py-10">
      <ReservationListSearchFilters
        dateRange={dateRange}
        searchOption={searchOption || ''}
        searchQuery={searchQuery || ''}
        sortOption={sortOption || ''}
        onUpdateFilters={updateFilters}
      />
      <ReservationListTable reservations={reservations} loading={loading} />
      <ReservationListPagination
        currentPage={page ? parseInt(page) : 1}
        totalPages={totalPages}
      />
    </div>
  );
}
