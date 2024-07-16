// pages/bookings/index.tsx
import React from 'react';
import ReservationForm from "@/app/(home)/_compontents/reservationForm";
import BookingForm from "@/app/(home)/_compontents/bookingForm";
import RoomDetails from "@/app/(home)/_compontents/roomDetails";
import RoomList from "@/app/(home)/_compontents/roomList";

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
