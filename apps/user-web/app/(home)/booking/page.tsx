'use client';

import React, { useState } from 'react';
import ReservationForm from '../../../components/reservationForm';
import BookingForm from '../../../components/bookingForm';
import RoomDetails from '../../../components/roomDetails';
import RoomList from '../../../components/roomList';
import { useBookingStore } from '@app/store/bookingStore';

const BookingsPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <BookingForm />
      <RoomList />
      <RoomDetails />
      <ReservationForm />
    </div>
  );
};

export default BookingsPage;
