// pages/bookings/index.tsx
import React from 'react';
import ReservationForm from "../../../components/reservationForm";
import BookingForm from "../../../components/bookingForm";
import RoomDetails from "../../../components/roomDetails";
import RoomList from "../../../components/roomList";

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
