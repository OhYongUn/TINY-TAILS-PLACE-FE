// pages/bookings/index.tsx
import React from 'react';
import ReservationForm from "@user/components/reservationForm";
import BookingForm from "@user/components/bookingForm";
import RoomDetails from "@user/components/roomDetails";
import RoomList from "@user/components/roomList";

const BookingsPage = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <BookingForm/>
            <RoomList/>
            <RoomDetails/>
            <ReservationForm/>
        </div>
    );
};

export default BookingsPage;
