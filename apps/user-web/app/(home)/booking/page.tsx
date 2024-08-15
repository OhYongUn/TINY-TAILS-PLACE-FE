'use client';

import React from 'react';
import ReservationForm from '../../../components/reservationForm';
import BookingForm from '../../../components/bookingForm';
import RoomDetails from '../../../components/roomDetails';
import RoomList from '../../../components/roomList';

const BookingsPage = () => {
  return (
    <div className="flex flex-col">
      <BookingForm />
      <div className="min-h-[350px]">
        <RoomList />
      </div>
      <RoomDetails />
      <ReservationForm />
    </div>
  );
};

export default BookingsPage;
