'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import ReservationListSearchFilters from './ReservationListSearchFilters';
import ReservationListTable from './ReservationListTable';
import ReservationListPagination from './ReservationListPagination';
import { LoadingOverlay } from './LoadingOverlay';
import { format } from 'date-fns';
import { useReservationStore } from '@app/store/reservation-store';
import { ReservationDetailDialog } from '@app/components/ReservationDetailDialog';

export default function ReservationList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    loading,
    dateRange,
    setDateRange,
    setSearchOption,
    setSearchQuery,
    setSortOption,
    setStatus,
    setPageSize,
    setCurrentPage,
    fetchReservationList,
    updateFilters,
  } = useReservationStore();

  useEffect(() => {
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    const searchOption = searchParams.get('searchOption');
    const searchQuery = searchParams.get('searchQuery');
    const sortOption = searchParams.get('sortOption');
    const page = searchParams.get('page');
    const pageSize = searchParams.get('pageSize');
    const status = searchParams.get('status');

    if (from && to) {
      setDateRange({ from: new Date(from), to: new Date(to) });
    }
    if (searchOption) setSearchOption(searchOption);
    if (searchQuery) setSearchQuery(searchQuery);
    if (sortOption) setSortOption(sortOption);
    if (status) setStatus(status);
    if (pageSize) setPageSize(pageSize);
    if (page) setCurrentPage(parseInt(page));

    fetchReservationList();
  }, [searchParams]);

  const handleUpdateFilters = () => {
    updateFilters();
    const params = new URLSearchParams();
    if (dateRange?.from)
      params.set('from', format(dateRange.from, 'yyyy-MM-dd'));
    if (dateRange?.to) params.set('to', format(dateRange.to, 'yyyy-MM-dd'));
    // Add other parameters as needed
    router.push(`/reservations/list?${params.toString()}`);
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="p-4 bg-white container mx-auto py-10">
        <ReservationListSearchFilters onUpdateFilters={handleUpdateFilters} />
        <ReservationListTable />
        <ReservationListPagination onUpdateFilters={handleUpdateFilters} />
        <ReservationDetailDialog />
      </div>
    </>
  );
}
